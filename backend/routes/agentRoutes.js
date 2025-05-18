const express = require("express");
const router = express.Router();
const {
  createAgent,
  getAgents,
  deleteAgent,
} = require("../controllers/agentController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createAgent);
router.get("/", protect, getAgents);
router.delete("/:id", protect, deleteAgent);

module.exports = router;
