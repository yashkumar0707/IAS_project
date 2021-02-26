
var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    balance: {
        type: Number,
        required: true
    },
    associated_bank: {
        type: String,
        required: true
    }
});

var Customer = module.exports = mongoose.model('customer', customerSchema);
module.exports.get = function (callback, limit) {
    Customer.find(callback).limit(limit);
}