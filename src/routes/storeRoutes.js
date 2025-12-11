const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole");
const storeController = require("../controllers/storeController");

router.post(
  "/",
  verifyToken,
  authorizeRole(["system_admin"]),
  storeController.createStore
);

// public route to get all the stores
router.get("/", storeController.getAllStores);

module.exports = router;