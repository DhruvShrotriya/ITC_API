const mongoose = require("mongoose");
const { type } = require("os");
const { pipeline } = require("stream");

const CPSchema = mongoose.Schema({
  CP: { type: String, required: true },
  firm: { type: String, required: true },
});

module.exports = mongoose.model("CP", CPSchema);
