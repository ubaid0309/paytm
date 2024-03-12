const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./database/connectToDatabase");
require('dotenv').config()

const app = express();
app.use(cors())
app.use(express.json());

const rootRouter = require('./routes/rootRouter')
connectToDatabase();

app.use("/api/v1", rootRouter);

app.listen(process.env.PORT, (req, res) => {
    console.log("Listening on port " + process.env.PORT);
})



