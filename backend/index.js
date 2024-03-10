const express = require("express");
require('dotenv').config()

const app = express();

app.listen(process.env.PORT, (req, res) => {
    console.log("Listening on port " + process.env.PORT);
})



