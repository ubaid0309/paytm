const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const accountRoutes = require('./accountRoutes');

router.use("/user", userRoutes)
router.use("/account", accountRoutes);

module.exports = router;