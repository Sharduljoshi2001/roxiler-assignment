require('dotenv').config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const { sequelize } = require("./models");
const app = express();
const PORT = 3001;

//middleware to pass the json data kyunki express can't read jso data itself
app.use(express.json());
app.use('/api/users', userRoutes);
//test routes
app.get('/',(req, res) => {
  res.send("Server is running");
});
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
});