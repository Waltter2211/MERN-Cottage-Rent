const express = require('express')
const housesModel = require('../models/housesModel')
const rentsModel = require("../models/rentsModel")
const usersModel = require('../models/usersModel')

const housesRouter = express.Router()

housesRouter.get("/", async (req, res) => {
    
    try {
        let houses = await housesModel.find({})
        console.log(houses)
    } catch (error) {
        console.log(error)
    }
})

//add home to the rented homes list
housesRouter.post("/add", async (req, res) => {
    let house = req.body
    try {
        let data = await housesModel.create(house)
        res.send({message:"House successfully created", data})
    } catch (error) {
        if (error.code === 11000) {
            res.status(500).send("House already found in database")
        }
        else {
            res.status(500).send("Server error")
        }
    }
})

//rent a home
housesRouter.post("/rent/:userId/:houseId", async (req, res) => {
    let houseId = req.params.houseId
    let userId = req.params.userId
    try {
        let foundUser = await usersModel.find({_id: userId})
        if (foundUser.length < 1) {
            res.send("No user found")
        }
        else {
            let foundHouse = await housesModel.find({_id: houseId})
            if (foundHouse.length < 1) {
                res.send("no houses found")
            }
            else {
                let foundHouseObj = foundHouse[0]
                let decrement = foundHouseObj.houseStock -1
                foundHouseObj.houseStock = decrement
                let updatedHouseObj = foundHouseObj
                if (updatedHouseObj.houseStock < 0) {
                    res.send("This house is out of stock")
                }
                else {
                    let updatedHouse = await housesModel.updateOne({_id: houseId}, updatedHouseObj)
                    let rent = {
                        userId,
                        houseId,
                        rentDate: new Date().toLocaleString()
                    }
                    rentsModel.create(rent)
                    res.send("House rented successfully")
                }
            }
        }
        /* console.log(foundHouse)
        res.send("test") */
    } catch (error) {
        console.log(error)
        res.status(500).send("Some error happened")
    }
})

//return rented home
housesRouter.delete("/return/:userId/:rentId", async (req, res) => {
    let userId = req.params.userId
    let rentId = req.params.rentId

    try {
        let foundUser = await usersModel.find({_id: userId})
        if (foundUser.length < 1) {
            res.send("No user found")
        }
        else {
            let foundRent = await rentsModel.findOne({_id: rentId})
            if (foundRent.userId != userId) {
                res.send("No rent found for user")
            }
            else {
                let deletedRent = await rentsModel.deleteOne({_id: rentId})
                let houseId = foundRent.houseId
                let houseCurrent = await housesModel.findOne({_id: houseId})
                let increment = houseCurrent.houseStock += 1
                houseCurrent.houseStock = increment
                let updatedHouse = houseCurrent
                let returnerdHouse = await housesModel.updateOne({_id: houseId}, updatedHouse)
                res.send({message:"Successfully deleted rent", deletedRent})
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
})

//what homes user has rented
housesRouter.get("/rents/:userId", async (req, res) => {
    userId = req.params.userId
    let foundRents = await rentsModel.find({userId: userId}).populate("userId").populate("houseId")
    try {
        if (foundRents.length < 1) {
            res.send("No rents found")
        }
        else {
            res.send({message: "found rents", foundRents})
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = housesRouter