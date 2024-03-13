const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersModel = require('../models/usersModel')
const usersRouter = express.Router()
require('dotenv').config()

const webtoken = process.env.JSONTOKEN

usersRouter.get("/", (req, res) => {
    usersModel.find({})
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.log(err)
    })
})

usersRouter.post("/register", async (req, res) => {
    let user = req.body
    
    try {
        let hpass = await bcrypt.hash(user.password, 10)
        user.password = hpass
        let data = await usersModel.create(user)
        res.send({message: "successfully created", user: data})
    } catch (error) {
        if (error.code === 11000) {
            res.status(403).send({message:"Account with that email already exists"})
        }
        else {
            console.log(error)
            res.status(500).send({message:"Server error while registering account"})
        }
    }
})

usersRouter.post("/login", async (req, res) => {
    let userCred = req.body
    let {email} = userCred
    
    try {
        let foundUser = await usersModel.findOne({email: userCred.email})
        if (foundUser != null) {
            let verifiedUser = await bcrypt.compare(userCred.password, foundUser.password)
            if (verifiedUser == true) {
                let token = jwt.sign(userCred.email, webtoken)
                let {_id} = foundUser
                res.send({message: "logged in", token, email, _id})
            } else {
                res.status(401).send({message:"wrong password"})
            }
        } else {
            res.status(404).send({message:"no user found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"server error"})
    }
})

usersRouter.put("/edituser/:id", async (req, res) => {
    let userId = req.params.id
    let updatedData = req.body
    let newPass = req.body.password

    try {
        if (updatedData.name.length < 4 || updatedData.email.length < 4 || updatedData.password.length < 4) {
            res.status(422).send({message:"Please fill all the fields"})
        }
        else {
            let hpass = await bcrypt.hash(newPass, 10)
            updatedData.password = hpass
            let updatedUser = await usersModel.updateOne({_id: userId}, updatedData)
            res.send({message:"Successfully updated user", updatedUser})
        }
    } catch (error) {
        if (error.code === 11000) {
            res.status(403).send({message:"Account with that email already exists"})
        }
        else {
            console.log(error)
            res.status(500).send({message:"Server error while updating account"})
        }
    }
})

usersRouter.delete("/deleteuser/:id", async (req, res) => {
    let userId = req.params.id
    
    try {
        let deletedUser = await usersModel.deleteOne({_id: userId})
        res.send({message: "successfully deleted", user: deletedUser})
    } catch (error) {
        console.log(error)
    }
})

module.exports = usersRouter