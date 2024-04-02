const express = require("express");
const { registerUser, authenticateUser, getAllUsers, updateUser } = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.route('/signup').post(registerUser);
router.route('/signin').post(authenticateUser);
router.route('/bulk').get(authMiddleware, getAllUsers);
router.route('/').put(authMiddleware, updateUser);

module.exports = router;