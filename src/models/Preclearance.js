const mongoose = require("mongoose");
const { type } = require("os");
const { pipeline } = require("stream");

const PreclearanceSchema = mongoose.Schema({
  loginid: { type: String, required: true },
  for: { type: String, required: true },
  demat: { type: String },
  relation: { type: String },
  quantity: { type: String },
  typeofSecurity: { type: String },
  transactionType: { type: String },
  reqested: { type: Date, default: Date.now },
  status: { type: String },
  reviewdOn: { type: String },
  remarks: { type: String },
});

module.exports = mongoose.model("Preclarance", PreclearanceSchema);
