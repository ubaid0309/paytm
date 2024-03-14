const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = asyncHandler((req, res, next) => {
    if (!req.headers.authorization.startsWith('Bearer')) {
        res.status(403).json({})
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);



        req.userId = decoded._id;

        next();

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

module.exports = { authMiddleware }