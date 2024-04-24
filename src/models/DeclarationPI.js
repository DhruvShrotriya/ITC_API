const mongoose = require("mongoose");
const { type } = require("os");
const { pipeline } = require("stream");

const DeclarationPISchema = mongoose.Schema({
  loginid: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  pin: { type: String, required: true },
  restype: { type: String, required: true },
  countryOfResidence: { type: String, required: true },
  PAN: { type: String, required: true },
  company: { type: String, required: true },
  employeeID: { type: String, required: true },
  DOJ: { type: Date, required: true },
  DOBI: { type: Date, required: true },
  officeLocation: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  nameOfInstitute: { type: String, required: true },
});

module.exports = mongoose.model("DeclarationPI", DeclarationPISchema);
