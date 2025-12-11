const adminService = require("../services/adminService");
const adminController = {
  async getDashboardStats(req, res) {
    try {
      const stats = await adminService.getDashboardStats();
      res.status(200).json({
        message: "Dashboard stats fetched successfully",
        stats: stats,
      });
    } catch (error) {
      console.error("Error in adminController.getDashboardStats:", error);
      res.status(500).json({
        error: "Failed to fetch dashboard Stats",
      });
    }
  },
};
module.exports = adminController;

