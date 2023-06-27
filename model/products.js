const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  catRef: { type: Schema.Types.ObjectId, ref: "categories" },
  brand: { type: String },
  model: { type: String },
  variant: { type: String },
  year: { type: Number },
  fuel: { type: String },
  transmission: { type: String },
  kmDriven: { type: Number },
  owners: { type: String },
  type: { type: String },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  furnishing: { type: String },
  constructionStatus: { type: String },
  listedBy: { type: String },
  plotArea: { type: Number },
  length: { type: Number },
  breadth: { type: Number },
  superBuiltupArea: { type: Number },
  carpetArea: { type: Number },
  bachelorsAllowed: { type: String },
  maintenance: { type: Number },
  totalFloors: { type: Number },
  floorNo: { type: Number },
  carParking: { type: Number },
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
