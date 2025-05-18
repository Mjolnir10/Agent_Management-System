const Agent = require("../models/Agent");
const Activity = require("../models/Activity");

exports.createAgent = async (req, res) => {
  const { name, email, mobileNumber, password } = req.body;

  if (!name || !email || !mobileNumber || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const exists = await Agent.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Agent with this email already exists" });
    }

    const agent = new Agent({ name, email, mobileNumber, password });
    await agent.save();

    await Activity.create({
      type: "AGENT_ADDED",
      data: {
        name: agent.name,
        email: agent.email,
        mobileNumber: agent.mobileNumber,
      },
      createdAt: new Date(),
    });
    res.status(201).json({ message: "Agent created successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error creating agent",
      error: err.message,
    });
  }
};

exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select("-password");
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.json({ message: "Agent removed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
