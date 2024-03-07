const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersModel = require('../models/usersModel')
const usersRouter = express.Router()

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
            res.status(403).send({message:"Account with that name already exists"})
        }
        else {
            console.log(error)
            res.status(500).send({message:"Server error while registering account"})
        }
    }
})

usersRouter.post("/login", async (req, res) => {
    let userCred = req.body
    
    try {
        let foundUser = await usersModel.findOne({email: userCred.email})
        if (foundUser != null) {
            let verifiedUser = await bcrypt.compare(userCred.password, foundUser.password)
            if (verifiedUser == true) {
                let token = jwt.sign(userCred.email, "jsontoken")
                res.send({token:token})
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

usersRouter.put("/edituser/:id", (req, res) => {
    let userId = req.params.id
    let updatedData = req.body

    if (req.body != null) {
        usersModel.updateOne({_id: userId}, updatedData)
        .then((data) => {
            res.send({message: "successfully updated", user: data})
        })
        .catch((err) => {
            console.log(err)
        })
    } else {
        res.status(500).send("please add information")
    }
})

usersRouter.delete("/deleteuser/:id", (req, res) => {
    let userId = req.params.id
    usersModel.deleteOne({_id: userId})
    .then((data) => {
        res.send({message: "successfully deleted", user: data})
    })
    .catch((err) => {
        console.log(err)
    })
})

module.exports = usersRouter