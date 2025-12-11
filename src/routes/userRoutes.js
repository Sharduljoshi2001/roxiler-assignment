const express = require("express");
const{verifyToken} = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");
const router = express.Router();
router.post('/signup', userController.register); 
router.post('/login', userController.login);
router.put("/change-password", verifyToken, userController.changePassword);
//proctored route for token verification
router.get('/profile', verifyToken, (req, res) => {
    res.json({
        message:"Proctored route",
        user:req.user
    });
});
module.exports = router;