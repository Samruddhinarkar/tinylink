const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  original_url: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  last_clicked: { type: Date }
});

module.exports = mongoose.model("Link", LinkSchema);
