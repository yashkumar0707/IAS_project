const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

io.on("connection", socket => {
    console.log("a user connected :D ", socket.id);
    socket.on("chat message", msg => {
        console.log(msg, socket.id);
        // io.emit("chat message", msg);
    });
});

http.listen(port, () => console.log("server running on port:" + port));