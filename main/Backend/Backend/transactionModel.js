var mongoose = require('mongoose');

var transactionSchema = mongoose.Schema({
    // username: {
    //     type: String,
    //     required: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    transaction_amount:{
        type: Number,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    customer_balance: {
        type: Number,
        required: true
    },
    merchant_balance: {
        type: Number,
        required: true
    },
    customer_associated_bank: {
        type: String,
        required: true
    },
    merchant_associated_bank: {
        type: String,
        required: true
    },
    customer_phone_number: {
        type: Number,
        required: true
    },
    merchant_phone_number: {
        type: Number,
        required: true
    },
});

var Transaction = module.exports = mongoose.model('transaction', transactionSchema);
module.exports.get = function (callback, limit) {
    Transaction.find(callback).limit(limit);
}