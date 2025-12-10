const jwt = require("jsonwebtoken");
async function verifyToken(req, res, next) {
  try {
    const authHeader = req.header("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "token not valid" });
    }
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedUser;
    next();
  } catch (error) {
    res.status(403).json({ error: "token not valid" });
  }
}
module.exports = {
  verifyToken,
};
