const ratingRepository = require("../repositories/ratingRepository");
const storeRepository = require("../repositories/storeRepository");
const userRepository = require("../repositories/userRepository");
const adminService = {
  async getDashboardStats() {
    // try {
    //   const storesCount = await storeRepository.countAll();
    //   const ratingsCount = await ratingRepository.countAll();
    //   const usersCount = await userRepository.countAll();
    //   const allCounts = {
    //     storesCount,
    //     ratingsCount,
    //     usersCount,
    //   };

    //   return {
    //     allCounts,
    //   };
    // } catch (error) {
    //   throw error;
    // }
    //promise way(more efficient)
    try{
        const[storesCount,ratingsCount,usersCount]=await Promise.all([
            storeRepository.countAll(),
            ratingRepository.countAll(),
            userRepository.countAll()
        ])
        return{
            storesCount,
            ratingsCount,
            usersCount
        }
    }catch(error){
        console.error("Error in adminService.getDashboardStats:", error);
        throw error;
    }
  },
};
module.exports = adminService;