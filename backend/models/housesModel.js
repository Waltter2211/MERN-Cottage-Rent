const mongoose = require("mongoose")

const housesSchema = mongoose.Schema({
    houseName:{
        type:String,
        required:true,
        unique:true
    },
    houseCost:{
        type:Number,
        required:true,
        min:0
    },
    houseStock:{
        type:Number,
        required:true,
        min:0
    },
    houseImage:{
        type:String,
        required:true,
    },
    houseTags:{
        type:String,
        required:true,
        enum:["Cottages","Tower Blocks","Vans","Others"]
    }
},{timestamps:true})

const housesModel = mongoose.model("houses", housesSchema)

module.exports = housesModel