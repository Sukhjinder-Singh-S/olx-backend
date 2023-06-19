const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mensSchema = new Schema({
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


module.exports = mongoose.model("mensFashion", mensSchema);
