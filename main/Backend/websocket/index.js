const express = require("express");
const app = express();
let mongoose = require('mongoose');
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});
const port = 3001;



io.on("connection", socket => {
    console.log("a user connected :D ", socket.id);
    socket.on("chat message", msg => {
        console.log(msg, socket.id);
        check(socket.id, msg)
        // io.emit("chat message", msg);
    });
});

http.listen(port, () => console.log("server running on port:" + port));

Customer = require('./customerModels');
mongoose.connect('mongodb+srv://iasproject:181it231@cluster0.hvfez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
mongoose.set('useFindAndModify', false);
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

const check = async (socket, values) => {
    console.log('from ' + socket)

    console.log(values)
    let value = values.amount
    Customer.findOneAndUpdate({ username: values.username, lock_id: 0 },
        { $set: { "lock_id": 1 } }, function (err, customer1) {
            if (err)
                console.log(err);
            console.log(customer1)
            console.log('lock 1')

            Customer.findOneAndUpdate({ phone_number: values.number, lock_id: 0 },
                { $set: { "lock_id": 1 } }, function (err, customer2) {
                    if (err)
                        console.log(err);
                    console.log(customer2)
                    console.log('lock 2')
                    let balance1 = 0
                    Customer.findOne({ username: values.username }, async function (err, customer3) {
                        if (err)
                            console.log(err);
                        console.log(customer3)
                        balance1 = customer3.balance
                        if (balance1 > value) {
                            balance1 = balance1 - value
                            console.log(balance1)
                            Customer.findOneAndUpdate({ username: values.username },
                                { $set: { balance: balance1 } }, function (err, customer4) {
                                    if (err)
                                        console.log(err);
                                    console.log(customer4)
                                    console.log('money removed')
                                })
                            Customer.findOneAndUpdate({ phone_number: values.number },
                                { $inc: { "balance": value } }, function (err, customer5) {
                                    if (err)
                                        console.log(err);
                                    console.log(customer5)
                                    console.log('money gain')

                                    Customer.findOneAndUpdate({ phone_number: values.number, lock_id: 1 },
                                        { $set: { "lock_id": 0 } }, function (err, customer6) {
                                            if (err)
                                                console.log(err);
                                            console.log(customer6)
                                            console.log('unlock 2')
                                        })
                                    Customer.findOneAndUpdate({ username: values.username, lock_id: 1 },
                                        { $set: { "lock_id": 0 } }, function (err, customer7) {
                                            if (err)
                                                console.log(err);
                                            console.log(customer7)
                                            console.log('unlock 1')
                                        })
                                })

                        }
                    })
                })
            io.emit('message', 'successful')
        })

    // Customer.findOneAndUpdate({ username: 'Yash', lock_id: 0 },
    //     { $inc: { "balance": 1000 } }, function (err, customer) {
    //         if (err)
    //             console.log(err);
    //         console.log(customer)
    //         console.log('hi ia ma gay')
    //     })
}


// check('yash', 100)
// check('yash', 100)
// check('yash', 100)
// check('yash', 100)
// check('yash', 100)








   // Customer.findOneAndUpdate({ username: 'Olan' },
    //     { $inc: { "balance": 1000 } }, function (err, customer) {
    //         if (err)
    //             console.log(err);
    //         // console.log(customer)
    //         console.log('hi ia ma gay')
    //     })
    // { $set: { myLock: { balance: '900' } } }).then(console.log('yash'))
    // { $set: { balance: 900 } }, function (err, customer) {
    // Customer.findOneAndUpdate({ username: 'Olan' }, [
    //     {
    //         $inc: {
    //             phone_number: {
    //                 $switch: {
    //                     branches: [
    //                         { case: { $gte: ["$balance", 200] }, then: 1000 },
    //                         { case: { $gte: ["$balance", 100] }, then: 0 },
    //                     ],
    //                 }
    //             }
    //         }
    //     }], function (err, customer) {
    //         if (err)
    //             console.log(err);
    //         console.log(customer)
    //     }
    // )
    // Customer.findOne({ username: 'Olan' }, function (err, customer) {
    //     if (err)
    //         console.log(err);
    //     console.log(customer)
    // })
    // }