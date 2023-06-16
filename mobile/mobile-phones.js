const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monbileSchema = new Schema({
  brand: {
    type: String,
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
  day: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("mobiles", monbileSchema);
