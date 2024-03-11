const express = require("express");
const { registerUser, authenticateUser, updateUser } = require("../controllers/user.controller");

const router = express.Router();

router.route('/').post(authenticateUser);
router.route('/signup').post(registerUser);
router.route('/updateuser').put(updateUser);

module.exports = router;