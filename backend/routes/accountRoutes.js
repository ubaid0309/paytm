const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { getBalance, transferMoney } = require('../controllers/account.controller');

const router = express.Router();

router.route('/balance').get(authMiddleware, getBalance);
router.route('/transfer').post(authMiddleware, transferMoney);

module.exports = router;