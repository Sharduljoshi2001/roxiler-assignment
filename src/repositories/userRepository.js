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
};
module.exports = userRepository;
