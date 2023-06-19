const mongoose = require("mongoose");
const { isEmail } = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    // required: true,
    unique: true,
  },
  about: {
    type: String,
  },
  contact: {
    type: Number,
    // required: true,
    minlength: [10],
  },
  email: {
    type: String,
    // required: true,
    validate: [isEmail],
    lowercase: true,
  },
  link: {
    type: String,
    // required: true,
  },
  items: [
    { type: Schema.Types.ObjectId, ref: "forRentHsA" },
    { type: Schema.Types.ObjectId, ref: "cars" },
    { type: Schema.Types.ObjectId, ref: "forRentSsO" },
    { type: Schema.Types.ObjectId, ref: "forSaleHsA" },
    { type: Schema.Types.ObjectId, ref: "landsAndPlots" },
    { type: Schema.Types.ObjectId, ref: "accessories" },
    { type: Schema.Types.ObjectId, ref: "mobile-phones" },
    { type: Schema.Types.ObjectId, ref: "tablets" },
    { type: Schema.Types.ObjectId, ref: "mens" },
    { type: Schema.Types.ObjectId, ref: "kids" },
    { type: Schema.Types.ObjectId, ref: "women" },  
  ],
});

module.exports = mongoose.model("users", userSchema);
