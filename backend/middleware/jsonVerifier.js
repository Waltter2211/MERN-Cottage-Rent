const express = require('express')
const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    let token = req.headers.authorization.split(" ")[1]
    if (token != null) {
        jwt.verify(token, 'jsontoken', (err, decoded) => {
            if (decoded != null) {
                next()
                /* res.send({message: "logged in", decoded}) */
            } else {
                console.log(err)
                res.send("wrong token")
            }
        })
    }
    
}

module.exports = verifyToken