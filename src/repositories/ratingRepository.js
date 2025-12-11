const { Rating, sequelize, User } = require("../models");
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
  //method to count ratings
  async countAll() {
    try {
      const countRatings = await Rating.count();
      return countRatings;
    } catch (error) {
      console.log("Error in ratingRepository.countAll:", error);
      throw error;
    }
  },
  async getRatingsByStoreId(storeId) {
    try {
      const ratings = await Rating.findAll({
        where: { storeId: storeId },
        include: {
          model: User, // Join with User table
          attributes: ['id', 'name', 'email'] // Sirf ye fields chahiye, password nahi
        },
        order: [['createdAt', 'DESC']] // Latest rating upar
      });
      return ratings;
    } catch (error) {
      console.error("Error in ratingRepository.getRatingsByStoreId:", error);
      throw error;
    }
  },
};
module.exports = ratingRepository;
