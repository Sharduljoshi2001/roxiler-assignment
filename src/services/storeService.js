const storeRepository = require("../repositories/storeRepository");
const userRepository = require("../repositories/userRepository");
const storeService ={
    async createStore(storeData) {
        try{
            const existingStore = await storeRepository.findStoreByEmail(storeData.email);
            if(existingStore){
                throw new Error("Email already exists");
            }
            const ownerCheck = await userRepository.findOwnerById(storeData.ownerId);
            if(!ownerCheck){
                throw new Error("Owner not found(doesnt exist in user table)");
            }
            const newStore = await storeRepository.createStore(storeData);
            return newStore;
            
        }catch(error){
            console.error("Error in storeService.createStore:", error);
            throw error;
        }
    },
    async getAllStores() {
    try {
      // repository ko call krke result return kr dege
      const stores = await storeRepository.findAllStores();
      return stores;
    } catch (error) {
      console.error("Error in storeService.getAllStores:", error);
      throw error;
    }
  }
};
module.exports = storeService;