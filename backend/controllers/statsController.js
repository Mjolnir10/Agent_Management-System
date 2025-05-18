const Agent = require("../models/Agent");
const List = require("../models/List");

exports.getStats = async (req, res) => {
  try {
    const [agents, lists, items] = await Promise.all([
      Agent.countDocuments(),
      List.countDocuments(),
      List.aggregate([{ $unwind: "$items" }, { $count: "totalItems" }]),
    ]);

    res.json({
      agents,
      lists,
      items: items[0]?.totalItems || 0,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
