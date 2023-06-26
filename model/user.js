const mongoose = require("mongoose");
const { isEmail } = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String,unique: true},
  about: { type: String,},
  contact: {type: Number, minlength: [10], },
  email: {type: String,validate: [isEmail],lowercase: true, },
  link: { type: String,},
});

module.exports = mongoose.model("users", userSchema);
