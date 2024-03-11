const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        minLength: 4,
        maxLength: 40,
        required: true
    },
    firsName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
