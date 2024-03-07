const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const verifyToken = require('./middleware/jsonVerifier')
const usersRouter = require('./routes/usersRouter')
const housesRouter = require('./routes/housesRouter')

const app = express()

app.use(express.json())

app.use(cors())

app.use("/users", usersRouter)
app.use("/houses", verifyToken, housesRouter)

mongoose.connect("mongodb://localhost:27017/rent-website")
.then(() => {
    console.log("Connected to database")
})
.catch((err) => {
    console.log(err)
})

app.listen(8000, () => {
    console.log("Connected to server")
})