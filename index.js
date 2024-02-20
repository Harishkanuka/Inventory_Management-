const express = require("express");

const server = express();
server
    .get("/", (req, res) => {
        res.send("Hello, From inventory!");
    })
    .listen(3400, () => {
        console.log("The server is listening to the port 3400");
    });
