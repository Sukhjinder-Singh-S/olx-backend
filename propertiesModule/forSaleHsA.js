const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forSaleHouseApartmt = new Schema({
  type: {
    type: String,
    default: "nothing",
  },
  bedroom: {
    type: String,
    default: "nothing",
  },
  bathrooms: {
    type: String,
    default: "nothing",
  },
  furnishing: {
    type: String,
    default: "nothing",
  },
  constructionStatus: {
    type: String,
    default: "nothing",
  },
  listedBy: {
    type: String,
    default: "nothing",
  },
  superBuiltupArea: {
    type: String,
    default: "nothing",
  },
  carpetArea: {
    type: String,
    default: "nothing",
  },
  maintenance: {
    type: String,
    default: "nothing",
  },
  totalfloors: {
    type: String,
    default: "nothing",
  },
  floorNo: {
    type: String,
    default: "nothing",
  },
  carParking: {
    type: String,
    default: "nothing",
  },
  facing: {
    type: String,
    default: "nothing",
  },
  projectName: {
    type: String,
    default: "nothing",
  },
  adTitle: {
    type: String,
    default: "nothing",
  },
  description: {
    type: String,
    default: "nothing",
  },
  price: {
    type: String,
    default: "nothing",
  },
  imageUrl: {
    type: Array,
  },

  state: {
    type: String,
    default: "Chandigarh",
  },
  city: {
    type: String,
    default: "Chandigarh",
  },
  neighbour: {
    type: String,
    default: "Sector 33",
  },
  day: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("forSaleHsA", forSaleHouseApartmt);
