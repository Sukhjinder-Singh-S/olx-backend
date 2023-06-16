const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const landAndPlots = new Schema({
  type: {
    type: String,
    enum: ["For Rent", "For Sale"],
    // required: true,
    default: "For Rent",
  },
  listedBy: {
    type: String,
    enum: ["Builder", "Owner", "Dealer"],
    // required: true,
    default: "Owner",
  },
  plotArea: {
    type: Number,
    // required: true,
    default: 700,
  },
  length: {
    type: Number,
    // required: true,
    default: 700,
  },
  breadth: {
    type: Number,
    // required: true,
    default: 700,
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
  adTitle: {
    type: String,
    // required:true
    default: "Testing",
  },
  description: {
    type: String,
    // required:true
    default: "Testing",
  },
  price: {
    type: String,
    // required:true
    default: "Testing",
  },
  images: {
    type: Array,
    // required:true
  },
  state: {
    type: String,
    // required:true
    default: "Testing",
  },
  city: {
    type: String,
    // required:true
    default: "Testing",
  },
  neighbourhood: {
    type: String,
    // required:true
    default: "Testing",
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:"user"
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("landAndPlots", landAndPlots);
