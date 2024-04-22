const mongoose = require("mongoose");
const { type } = require("os");
const { pipeline } = require("stream");

const UPSIPersonSchema = mongoose.Schema({
  upsiID: { type: String, unique: true, required: true },
  DP: { type: "array", items: { type: "string" } },
  CP: { type: "array", items: { type: "string" } },
});

module.exports = mongoose.model("UPSIPerson", UPSIPersonSchema);
