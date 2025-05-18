const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["AGENT_ADDED", "LIST_UPLOADED"],
  },
  data: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Activity", ActivitySchema);
