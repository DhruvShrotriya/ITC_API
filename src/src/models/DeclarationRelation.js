const mongoose = require("mongoose");
const { type } = require("os");
const { pipeline } = require("stream");

const DeclarationRealationSchema = mongoose.Schema({
  loginid: { type: String, required: true },
  name: { type: String, required: true },
  relation: { type: String, required: true },
  pan: { type: String },
  demat: { type: String },
  holdings: { type: String },
});

module.exports = mongoose.model(
  "DeclarationRealation",
  DeclarationRealationSchema
);
