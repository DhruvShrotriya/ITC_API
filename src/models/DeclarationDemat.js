const mongoose = require("mongoose");
const { type } = require("os");
const { pipeline } = require("stream");

const DeclarationDematSchema = mongoose.Schema({
  loginid: { type: String, required: true },
  name: { type: String, required: true },
  demat: { type: String },
  holdings: { type: String },
});

module.exports = mongoose.model("DeclarationDemat", DeclarationDematSchema);
