const mongoose = require("mongoose");
const { type } = require("os");
const { pipeline } = require("stream");

const UPSIPersonSchema = mongoose.Schema({
  upsiID: { type: String, unique: true, required: true },
  DP: { type: "String" },
  CP: { type: "String" },
  owner: { type: "String" },
});

module.exports = mongoose.model("UPSIPerson", UPSIPersonSchema);
