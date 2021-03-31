const favicon = require('serve-favicon');
const express = require("express");
const app = express();

app.use(favicon(__dirname + "/favicon.png"));
app.use(express.static(__dirname + "/dist/"));

app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
})

app.listen(process.env.PORT || 3000, process.env.IP, () => console.log("Server started"));