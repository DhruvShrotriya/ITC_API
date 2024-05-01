const mongoose = require("mongoose");
const { type } = require("os");
const { pipeline } = require("stream");

const AnnouncementSchmea = mongoose.Schema({
  loginid: { type: String, required: true },
  announcemet: { type: String, required: true },
  validityfrom: { type: Date, default: Date.now },
  validityto: { type: Date },
});

module.exports = mongoose.model("Announcement", AnnouncementSchmea);
