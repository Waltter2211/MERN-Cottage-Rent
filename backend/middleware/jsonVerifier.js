const express = require('express')
const jwt = require('jsonwebtoken')
const webtoken = process.env.JSONTOKEN || 'jsontoken'

function verifyToken(req, res, next) {
    let token = req.headers.authorization.split(" ")[1]
    if (token != null) {
        jwt.verify(token, webtoken, (err, decoded) => {
            if (decoded != null) {
                next()
                /* res.send({message: "logged in", decoded}) */
            } else {
                console.log(err)
                res.send({message:"Wrong token"})
            }
        })
    }
    
}

module.exports = verifyToken