const { verifyToken } = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole");
const adminController = require("../controllers/adminController");
const express = require("express");
const router = express.Router();
router.get(
  "/dashboard-stats",
  verifyToken,
  authorizeRole(["system_admin"]),
  adminController.getDashboardStats
);
router.post(
  "/users",
  verifyToken,
  authorizeRole(["system_admin"]),
  adminController.createUser
);
router.get(
  "/users",
  verifyToken,
  authorizeRole(["system_admin"]),
  adminController.getAllUsers
);
module.exports = router;
