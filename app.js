const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Unleash The Bankai")
})

app.listen(process.env.PORT || 5000, (req, res) => {
    console.log("server is connected")
})