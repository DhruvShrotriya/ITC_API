const mongoose = require("mongoose");
const { type } = require("os");
const { pipeline } = require("stream");

const UPSISchema = mongoose.Schema({
  upsiID: { type: String, unique: true, required: true },
  eventType: { type: String, required: true },
  nameUPSI: { type: String, required: true },
  description: { type: String, required: true },
  validityFrom: { type: Date, default: Date.now },
  validityTo: { type: Date, default: Date.now },
  status: { type: String, required: true },
  remarks: { type: String },
});

module.exports = mongoose.model("UPSI", UPSISchema);
