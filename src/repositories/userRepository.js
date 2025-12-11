const { User } = require("../models");
const userRepository = {
  async createUser(userData) {
    try {
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      console.log("Error in userRepository.createUser:", error);
      throw error;
    }
  },

  async findUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      console.log("Error in userRepository.findUserByEmail:", error);
      throw error;
    }
  },
  async findOwnerById(ownerId) {
    try{
      const owner = await User.findOne(
        {
          where:{
            id:ownerId,
          }
        }
      );
      return owner;
    }catch(error){
      console.log("Error in userRepository.findOwnerById:", error);
      throw error;
    }
  },
  async countAll(){
    try{
      const countUsers = await User.count();
      return countUsers;
    }catch(error){
      console.log("Error in userRepository.countAll:", error);
      throw error;
    }
  },
};
module.exports = userRepository;
