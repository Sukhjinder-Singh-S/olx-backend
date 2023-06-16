const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forRentSO = new Schema({
  furnishing: {
    type: String,
    enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
    default: "Furnished",
  },
  listedBy: {
    type: String,
    enum: ["Builder", "Dealer", "Owner"],
    default: "Owner",
  },
  superBuiltupArea: {
    type: Number,
    default: 7000,
    // required:true
  },
  carpetArea: {
    type: Number,
    // required:true,
    default: 500,
  },
  maintenance: {
    type: Number,
    // required:true,
    default: 88,
  },
  carParking: {
    type: Number,
    enum: [0, 1, 2, 3, "3+"],
    default: 1,
  },
  washrooms: {
    type: Number,
    default: 1,
  },
  projectName: {
    type: String,
    default: "Testing",
  },
  adTitle: {
    type: String,
    // required: true,
    default: "testing",
  },
  description: {
    type: String,
    // required:true,
    default: "Testing",
  },
  price: {
    type: Number,
    // required:true,
    default: 700000,
  },
  images: {
    type: Array,
  },
  state: {
    type: String,
    // required:true,
    default: "Testing",
  },
  city: {
    type: String,
    // requird:true,
    default: "Testing",
  },
  neighbourhood: {
    type: String,
    // required:true,
    default: "testing",
  },
  day: {
    type: Date,
    default: Date.now(),
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:"user"
  }
});

module.exports = mongoose.model("forRentSO", forRentSO);
