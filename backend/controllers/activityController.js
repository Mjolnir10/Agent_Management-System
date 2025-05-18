const Activity = require("../models/Activity");

exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 }).limit(5);
    res.json(activities || []);
  } catch (err) {
    console.error("Error fetching activities:", err);
    res.status(500).json([]); // Return empty array on error
  }
};