const Agent = require("../models/Agent");
const List = require("../models/List");
const { upload } = require("../utils/upload");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const xlsx = require("xlsx");
const Activity = require("../models/Activity");

exports.uploadMiddleware = upload.single("file");

exports.uploadAndDistribute = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Parse file based on extension
    const filePath = req.file.path;
    const fileExt = path.extname(filePath).toLowerCase();
    let items = [];

    if (fileExt === ".csv") {
      items = await parseCSV(filePath);
    } else if (fileExt === ".xlsx" || fileExt === ".xls") {
      items = await parseExcel(filePath);
    }

    if (items.length === 0) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: "No valid data found in file" });
    }

    // Distribute to agents
    const agents = await Agent.find().limit(5);
    if (agents.length === 0) {
      return res
        .status(400)
        .json({ message: "No agents available for distribution" });
    }

    const distributedLists = distributeItems(items, agents);
    await List.deleteMany({ agent: { $in: agents.map((a) => a._id) } });

    const savedLists = await List.insertMany(distributedLists);
    fs.unlinkSync(filePath);

    res.json({
      message: "File uploaded and distributed successfully",
      lists: savedLists,
    });

    await Activity.create({
      type: "list_uploaded",
      data: {
        itemCount: items.length,
        fileName: req.file.originalname,
        distributedTo: agents.map((a) => a.email),
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error processing file", error: err.message });
  }
};

exports.getLists = async (req, res) => {
  try {
    const lists = await List.find().populate(
      "agent",
      "name email mobileNumber"
    );
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const [agentsCount, listsCount, itemsResult] = await Promise.all([
      Agent.countDocuments(),
      List.countDocuments(),
      List.aggregate([
        { $project: { count: { $size: "$items" } } },
        { $group: { _id: null, total: { $sum: "$count" } } },
      ]),
    ]);

    res.json({
      agents: agentsCount,
      lists: listsCount,
      items: itemsResult[0]?.total || 0,
      updatedAt: new Date(),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Helper functions
async function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        if (data.FirstName && data.Phone) {
          results.push({
            firstName: data.FirstName,
            phone: data.Phone,
            notes: data.Notes || "",
          });
        }
      })
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

async function parseExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);

  return data
    .map((item) => ({
      firstName: item.FirstName || item["First Name"] || "",
      phone: item.Phone || "",
      notes: item.Notes || "",
    }))
    .filter((item) => item.firstName && item.phone);
}

function distributeItems(items, agents) {
  const agentCount = agents.length;
  const lists = agents.map((agent) => ({
    agent: agent._id,
    items: [],
  }));

  items.forEach((item, index) => {
    const agentIndex = index % agentCount;
    lists[agentIndex].items.push(item);
  });

  return lists;
}
