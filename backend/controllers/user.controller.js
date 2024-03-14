const zod = require('zod');
const UserModel = require('../database/models/user.model');
const jwt = require("jsonwebtoken");
require('dotenv').config()
const asyncHandler = require('express-async-handler');
const { AccountModel } = require('../database/models/account.model');

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
    const signUpBody = zod.object({
        username: zod.string().email(),
        firstName: zod.string(),
        lastName: zod.string(),
        password: zod.string(),
    })

    try {
        const { success } = signUpBody.safeParse(req.body);

        if (!success) {
            res.status(411).json({ message: "Incorrect inputs" })
        }

        const userExists = await UserModel.findOne({ username: req.body.username });

        if (userExists) {
            res.status(411).json({ message: "Email already exists" })
        }

        const user = await UserModel.create({
            username: req.body.username,
            firsName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        })


        const { _id } = user;

        await AccountModel.create({
            user: _id,
            balance: parseInt(Math.random() * 10000)
        })

        const token = jwt.sign({ _id }, JWT_SECRET);

        res.json({
            message: "User created successfully",
            token: token
        })


    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

const authenticateUser = async (req, res) => {

    const signInBody = zod.object({
        username: zod.string().email(),
        password: zod.string(),
    })

    const { success } = signInBody.safeParse(req.body);

    try {
        if (!success) {
            res.status(411).json({
                message: "Incorrect inputs"
            })
        }

        const user = await UserModel.findOne({
            username: req.body.username,
            password: req.body.password,

        })

        if (user) {
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET);

            res.status(200).json({
                token: token
            })
        }



    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const updateUser = asyncHandler(async (req, res) => {
    const updateUserBody = zod.object({
        password: zod.string().optional(),
        firsName: zod.string().optional(),
        lastName: zod.string().optional(),
    })

    const { success } = updateUserBody.safeParse(req.body);

    try {
        if (!success) {
            res.status(411).json({ message: "Invalid inputs" })
        }

        const updateUser = await UserModel.findOneAndUpdate({
            _id: req.userId,
        }, req.body, { new: true })

        res.status(200).json({
            message: "Updated successfully"
        })

    } catch (error) {
        throw new Error(error.message);
    }
})

module.exports = { registerUser, authenticateUser, updateUser }