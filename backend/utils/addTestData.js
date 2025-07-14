const housesData = require("./testHouses.json");
const housesModel = require("../models/housesModel");
const mongoose = require("mongoose");
require("dotenv").config();

const createHouses = async () => {
  try {
    await mongoose.connect(process.env.DATABASE || "mongodb://localhost:27017");
    housesData.forEach(async (house) => {
      await housesModel.create(house);
    });
    const housesArr = await housesModel.find({});
    console.log(
      `added ${housesArr.length} houses, you can now exit with ctrl+c`,
    );
  } catch (error) {
    console.log(error);
  }
};

createHouses();
