const mongoose = require("mongoose");

const ListItemSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
});

const ListSchema = new mongoose.Schema(
  {
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    items: [ListItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
