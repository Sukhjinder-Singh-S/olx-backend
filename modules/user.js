const mongoose = require("mongoose");
const { isEmail } = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    // required: true,
    unique: true,
  },
  about: {
    type: String,
  },
  contact: {
    type: Number,
    // required: true,
    minlength: [10],
  },
  email: {
    type: String,
    // required: true,
    validate: [isEmail],
    lowercase: true,
  },
  link: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("users", userSchema);
