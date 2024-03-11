const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        if (!process.env.MONGO_DB_URL) {
            throw new Error("MongoDB url not specified")
        }
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to database")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { connectToDatabase };