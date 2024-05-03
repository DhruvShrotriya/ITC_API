const mongoose = require("mongoose");
const { type } = require("os");
const { pipeline } = require("stream");

const DeclarationDeleteSchema = mongoose.Schema({
  loginid: { type: String, required: true },
  reason: { type: String },
});

module.exports = mongoose.model("DeclarationDelete", DeclarationDeleteSchema);
