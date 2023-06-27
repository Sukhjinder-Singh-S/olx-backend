const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favModel = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  postId: { type: Schema.Types.ObjectId, ref: "products" },
  like: { type: Boolean, default: false },
});

module.exports = mongoose.model("favourite", favModel);
