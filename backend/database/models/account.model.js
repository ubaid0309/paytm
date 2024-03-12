const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    balance: { type: Number, required: true }
})

const AccountModel = mongoose.model("Account", AccountSchema);

module.exports = { AccountModel };