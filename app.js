const favicon = require('serve-favicon');
const express = require("express");
const app = express();

app.use(favicon(__dirname + "/favicon.png"));
app.use(express.static(__dirname + "/dist/"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.listen(3000, () => console.log("Server started"));