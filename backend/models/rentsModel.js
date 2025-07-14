const mongoose = require("mongoose");

const rentsSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    houseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "houses",
    },
    rentDate: {
      type: String,
    },
  },
  { timestamps: true },
);

const rentsModel = mongoose.model("rents", rentsSchema);

module.exports = rentsModel;
