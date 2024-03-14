const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const { AccountModel } = require('../database/models/account.model');

const getBalance = asyncHandler(async (req, res) => {

    const userBalance = await AccountModel.findOne({
        user: req.userId
    })

    res.status(200).json({
        balance: userBalance.balance
    })
})

const transferMoney = asyncHandler(async (req, res) => {
    const { to, amount } = req.body;

    try {
        const session = await mongoose.startSession();

        session.startTransaction();

        const account = await AccountModel.findOne({
            user: req.userId
        }).session(session);

        if (!account || account.balance < amount) {
            res.status(404).json({ message: "Insufficient balance" })
        }

        const toAccount = await AccountModel.findOne({
            user: to
        }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        await AccountModel.findOneAndUpdate({
            user: req.userId
        }, { $inc: { balance: - amount } }).session(session);

        await AccountModel.findOneAndUpdate({
            user: to
        }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();

        res.status(200).json({ message: "Transfer successful" })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

})

module.exports = { getBalance, transferMoney }