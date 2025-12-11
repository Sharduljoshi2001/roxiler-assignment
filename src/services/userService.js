const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = {
  async registerUser(userData) {
    try {
      // email check for first time users
      const existingUser = await userRepository.findUserByEmail(userData.email);
      if (existingUser) {
        throw new Error("Email already exists");
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const safeUserData = {
        ...userData,
        password: hashedPassword,
        // client se jo bhi role aaye, use overwrite karke normal_user set kar dege
        role: "normal_user",
      };

      const newUser = await userRepository.createUser(safeUserData);
      delete newUser.dataValues.password;
      return newUser;
    } catch (error) {
      console.error("Error in userService.registerUser:", error);
      throw error;
    }
  },
  async userLogin(email, password) {
    try {
      const user = await userRepository.findUserByEmail(email);
      if (!user) {
        throw new Error("Invalid Credentials");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid Credentials");
      }
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      delete user.dataValues.password;
      return { token, user };
    } catch (error) {
      console.error("Error in userService.userLogin:", error);
      throw error;
    }
  },
};
module.exports = userService;
