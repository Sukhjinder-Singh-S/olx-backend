const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forRentHsA = new Schema({
  type: {
    type: String,
    // required: true,
    default: "Testing",
  },

  bedrooms: {
    type: String,
    default: "Testing",
  },

  bathrooms: {
    type: String,
    // required: true,
    default: "Testing",
  },

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
    // required: true,
    default: 100,
  },

  carpetArea: {
    type: Number,
    // required: true,
    default: 100,
  },

  bachelorsAllowed: {
    type: String,
    enum: ["No", "Yes"],
    default: "No",
  },

  maintenance: {
    type: Number,
    // required: true,
    default: 100,
  },

  totalFloors: {
    type: Number,
    // required: true,
    default: 100,
  },

  floorNo: {
    type: Number,
    // required: true,
    default: 100,
  },

  carParking: {
    type: Number,
    // required: true,
    default: 100,
  },

  facing: {
    type: String,
    // required: true,
    default: "Testing",
  },

  projectName: {
    type: String,
    // required: true,
    default: "Testing",
  },

  adtitle: {
    type: String,
    // required: true,
    default: "Testing",
  },

  description: {
    type: String,
    // required: true,
    default: "Testing",
  },

  price: {
    type: Number,
    // required: true,
    default: 100,
  },

  images: {
    type: Array,
  },

  state: {
    type: String,
    // required: true,
    default: "Testing",
  },

  city: {
    type: String,
    // required: true,
    default: "Testing",
  },

  neighbourhood: {
    type: String,
    // required: true,
    default: "Testing",
  },
  day:{
    type:Date,
    default: Date.now()
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:"user"
  }
});

module.exports = mongoose.model("forRentHA", forRentHsA);
