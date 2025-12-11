const {verifyToken} = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole");
const adminController = require("../controllers/adminController");
const express = require("express");
const router = express.Router();    
router.get(
    '/dashboard-stats',
    verifyToken,
    authorizeRole(["system_admin"]),
    adminController.getDashboardStats
)
module.exports = router;