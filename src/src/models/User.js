const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = mongoose.Schema({
  loginid: { type: String, unique: true, required: true },
  salutation: { type: String },
  username: { type: String, required: true },
  useremail: { type: String, required: true },
  pan: { type: String, unique: true, required: true },
  role: { type: String },
  designation: { type: String },
  department: { type: String },
  nationlity: { type: String },
  company: { type: String },
  userstatus: { type: String, defaul: "Active" },
});

module.exports = mongoose.model("User", userSchema);
