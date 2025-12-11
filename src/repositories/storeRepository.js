const { Store, User } = require("../models");
const storeRepository = {
  async createStore(storeData) {
    try {
      const newStore = await Store.create(storeData);
      return newStore;
    } catch (error) {
      console.log("Error in storeRepository.createStore:", error);
      throw error;
    }
  },
  async findStoreByEmail(email) {
    try {
      const store = await Store.findOne({ where: { email } });
      return store;
    } catch (error) {
      console.log("Error in storeRepository.findStoreByEmail:", error);
      throw error;
    }
  },
  async findAllStores(){
    try{
      const stores = await Store.findAll({
        include: {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      });
      return stores;
    }catch(error){
      console.log("Error in storeRepository.findAllStores:", error);
      throw error;
    }
  },
  async updateStoreRating(storeId, newAverage, transaction){
    try{
      const result = await Store.update(
        {
          rating:newAverage
        },
        {
          where:{id:storeId},
          transaction:transaction
        }
      )
      return result;
    }catch(error){
      console.log("Error in storeRepository.updateStoreRating:", error);
      throw error;
    }
  },

};

module.exports = storeRepository;
