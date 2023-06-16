const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tabletsModel = new Schema({
  types: {
    type: String,
    enum: ["Ipads", "Samsung", "Other Tablets"],
    required: true,
  },
  adTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: Array,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  neighbourhood: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  day: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("tablets", tabletsModel);
