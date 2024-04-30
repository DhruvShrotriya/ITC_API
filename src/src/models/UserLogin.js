const mongoose = require("mongoose");
const { type } = require("os");

const userLoginSchema = mongoose.Schema({
  loginid: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  useremail: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("UserLogin", userLoginSchema);
