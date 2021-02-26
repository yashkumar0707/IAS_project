
let express = require('express');

let bodyParser = require('body-parser');

let mongoose = require('mongoose');

let app = express();


let apiRoutes = require("./api-routes");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});
mongoose.connect('mongodb+srv://iasproject:181it231@cluster0.hvfez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;


if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


var port = process.env.PORT || 8080;


app.get('/', (req, res) => res.send('Page 1'));


app.use('/', apiRoutes);

app.listen(port, function () {
    console.log("Running on port " + port);
});



const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;


const http = require('http');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
    httpServer: server
});


const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
    var userID = getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
    // You can rewrite this part of the code to accept only the requests from allowed origin
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
});