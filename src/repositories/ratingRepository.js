const { Rating, sequelize } = require("../models");
const ratingRepository = {
  async createRating(ratingData, transaction) {
    try {
      const newRating = await Rating.create(ratingData, {
        transaction: transaction,
      });
      return newRating;
    } catch (error) {
      console.log("Error in ratingRepository.createRating:", error);
      throw error;
    }
  },
  async getAverageRatings(storeId, transaction) {
    try {
      const result = await Rating.findAll({
        where: {
          storeId: storeId,
        },
        attributes: [
          [sequelize.fn("AVG", sequelize.col("rating")), "averageRating"],
        ],
        transaction: transaction,
        raw: true,
      });
      return parseFloat(result[0].averageRating) || 0;
    } catch (error) {
      console.log("Error in ratingRepository.getAverageRating:", error);
      throw error;
    }
  },
};
module.exports = ratingRepository;
