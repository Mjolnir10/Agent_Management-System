const express = require("express");
const router = express.Router();
const {
  uploadMiddleware,
  uploadAndDistribute,
  getLists,
  getDashboardStats,
} = require("../controllers/listController");
const protect = require("../middleware/authMiddleware");

router.post("/upload", protect, uploadMiddleware, uploadAndDistribute);
router.get("/", protect, getLists);
router.get("/stats", protect, getDashboardStats);

module.exports = router;
