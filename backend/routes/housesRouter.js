const express = require('express')
const housesModel = require('../models/housesModel')
const rentsModel = require("../models/rentsModel")
const usersModel = require('../models/usersModel')
const verifyToken = require('../middleware/jsonVerifier')
const housesRouter = express.Router()

housesRouter.get("/", async (req, res) => {
    
    try {
        let houses = await housesModel.find({})
        res.send(houses)
    } catch (error) {
        console.log(error)
    }
})

//search for house
housesRouter.get("/:houseName", async (req, res) => {
    let search = req.params.houseName
    let foundHouses = await housesModel.find({houseName: {$regex:search, $options:'i'}})
    try {
        if (foundHouses.length === 0) {
            res.send({message:"Couldn't find any houses with search"})
        }
        else {
            res.send({message:`Found ${foundHouses.length} houses with search result`, foundHouses})
        }
    } catch (error) {
        console.log(error)
        res.send({message:"Server error"})
    }
})

//add home to the rented homes list
housesRouter.post("/add", verifyToken, async (req, res) => {
    let house = req.body
    try {
        let data = await housesModel.create(house)
        res.send({message:"House successfully created", data})
    } catch (error) {
        if (error.code === 11000) {
            res.status(500).send({message:"House already in database"})
        }
        else {
            console.log(error)
            res.status(500).send({message:"Server error"})
        }
    }
})

//rent a home
housesRouter.post("/rent/:userId/:houseId", verifyToken, async (req, res) => {
    let houseId = req.params.houseId
    let userId = req.params.userId
    try {
        let foundUser = await usersModel.find({_id: userId})
        if (foundUser.length < 1) {
            res.send({message: "No user found"})
        }
        else {
            let foundHouse = await housesModel.find({_id: houseId})
            if (foundHouse.length < 1) {
                res.send({message: "No houses found"})
            }
            else {
                let foundHouseObj = foundHouse[0]
                let decrement = foundHouseObj.houseStock -1
                foundHouseObj.houseStock = decrement
                let updatedHouseObj = foundHouseObj
                if (updatedHouseObj.houseStock < 0) {
                    res.status(404).send({message: "This house is out of stock"})
                }
                else {
                    await housesModel.updateOne({_id: houseId}, updatedHouseObj)
                    let rent = {
                        userId,
                        houseId,
                        rentDate: new Date().toLocaleString()
                    }
                    rentsModel.create(rent)
                    res.send({message: "House rented successfully"})
                }
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Some error happened")
    }
})

//return rented home
housesRouter.delete("/return/:userId/:rentId", verifyToken, async (req, res) => {
    let userId = req.params.userId
    let rentId = req.params.rentId

    try {
        let foundUser = await usersModel.find({_id: userId})
        if (foundUser.length < 1) {
            res.send({message:"No user found"})
        }
        else {
            let foundRent = await rentsModel.findOne({_id: rentId})
            if (foundRent.userId != userId) {
                res.send({message:"No rent found for user"})
            }
            else {
                let deletedRent = await rentsModel.deleteOne({_id: rentId})
                let houseId = foundRent.houseId
                let houseCurrent = await housesModel.findOne({_id: houseId})
                let increment = houseCurrent.houseStock += 1
                houseCurrent.houseStock = increment
                let updatedHouse = houseCurrent
                await housesModel.updateOne({_id: houseId}, updatedHouse)
                res.send({message:"Successfully deleted rent", deletedRent})
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Server error"})
    }
})

//what homes user has rented
housesRouter.get("/rents/:userId", verifyToken, async (req, res) => {
    let userId = req.params.userId
    let foundRents = await rentsModel.find({userId: userId}).populate("userId").populate("houseId")
    try {
        if (foundRents.length < 1) {
            res.send({message:"No rents found"})
        }
        else {
            res.send({message: "found rents", foundRents})
        }
    } catch (error) {
        console.log(error)
        res.send({message:"Server error"})
    }
})

module.exports = housesRouter