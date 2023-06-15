const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  brand: {
    type: String,
    default: "Toyota",
  },
  model: {
    type: String,
    default: "Indico",
    // required: true,
  },
  year: {
    type: Number,
    // required: true,
    default: "2018",
  },
  fuel: {
    type: String,
    // enum: ["CNG & Hybrids", "Diesel", "Electric", "LPG", "Petrol"],
    default: "Petrol",
  },
  transmission: {
    type: String,
    // enum: ["Automatic", "Manuel"],
    default: "Manuel",
  },
  kmDriven: {
    type: Number,
    // required: true,
    default: 2000,
  },
  owners: {
    type: String,
    // enum: ["1st", "2nd", "3rd", "4th", "4+"],
    default: "1st",
  },
  adTitle: {
    type: String,
    // required: true,
    default: "Toyota Indico",
  },
  description: {
    type: String,
    // required: true,
    default: "This is another model",
  },
  price: {
    type: Number,
    default: 200000,
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
    default: Date.now,
  },

  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Item", productSchema);
