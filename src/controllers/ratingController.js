const ratingService = require("../services/ratingService");

const ratingController = {
  async addRating(req, res) {
    try {
      const userId = req.user.id;
      const { storeId, rating } = req.body;
      const ratingData = { userId, storeId, rating };
      const newRating = await ratingService.addRating(ratingData);
      res.status(201).json({
        message: "Rating submitted successfully",
        rating: newRating,
      });
    } catch (error) {
      console.error("Error in ratingController.addRating:", error);
      res
        .status(500)
        .json({ error: error.message || "Failed to submit rating" });
    }
  },
};

module.exports = ratingController;
