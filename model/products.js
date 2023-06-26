const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  catRef: { type: Schema.Types.ObjectId, ref: "categories" },
  brand: { type: String },
  model: { type: String },
  year: { type: Number },
  fuel: { type: String },
  transmission: { type: String },
  kmDriven: { type: Number },
  owners: { type: String },
  type: {
    type: String,
    enum: ["Apartments", "Builder Floors", "Farm Houses", "Houses & Villas"],
  },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  furnishing: {
    type: String,
    enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
  },
  constructionStatus: {
    type: String,
    enum: ["New Launch", "Ready to Move", "Under Construction"],
  },
  listedBy: { type: String, enum: ["Builder", "Dealer", "Owner"] },
  plotArea: { type: Number },
  length: { type: Number },
  breadth: { type: Number },
  superBuiltupArea: { type: Number },
  carpetArea: { type: Number },
  bachelorsAllowed: { type: String, enum: ["No", "Yes"] },
  maintenance: { type: Number },
  totalFloors: { type: Number },
  floorNo: { type: Number },
  carParking: { type: Number, enum: [0, 1, 2, 3, "3+"] },
  washrooms: { type: String },
  facing: { type: String },
  projectName: { type: String },
  adTitle: { type: String },
  description: { type: String },
  price: { type: Number },
  images: { type: Array },
  state: { type: String },
  city: { type: String },
  neighbour: { type: String },
  day: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("Product", productSchema);
