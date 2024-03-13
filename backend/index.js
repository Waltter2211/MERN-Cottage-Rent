const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const usersRouter = require('./routes/usersRouter')
const housesRouter = require('./routes/housesRouter')
require('dotenv').config()

const port = process.env.PORT
const database = process.env.DATABASE

const app = express()

app.use(express.json())

app.use(cors())

app.use("/users", usersRouter)
app.use("/houses", housesRouter)

mongoose.connect(database)
.then(() => {
    console.log("Connected to database")
})
.catch((err) => {
    console.log(err)
})

app.listen(port, () => {
    console.log("Connected to server")
})