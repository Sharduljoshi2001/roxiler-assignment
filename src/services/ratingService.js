const ratingRepository = require("../repositories/ratingRepository");
const storeRepository = require("../repositories/storeRepository");
const db = require("../models/index.js");
const ratingService = {
  async addRating(ratingData) {
    const transaction = await db.sequelize.transaction();
    try {
      const newRating = await ratingRepository.createRating(
        ratingData,
        transaction
      );
      const averageRating = await ratingRepository.getAverageRatings(
        ratingData.storeId,
        transaction
      );
      await storeRepository.updateStoreRating(
        ratingData.storeId,
        averageRating,
        transaction
      );
      await transaction.commit();
      return newRating;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
module.exports = ratingService;
