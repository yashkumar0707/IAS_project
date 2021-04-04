var mongoose = require('mongoose');

var transactionSchema = mongoose.Schema({
    create_date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    merchant_phone: {
        type: Number,
        required: true
    }
    // lock_id: {
    //     type: Number,
    //     default: 0,
    //     required: true
    // }
});

var Transation = module.exports = mongoose.model('transaction', transactionSchema);
module.exports.get = function (callback, limit) {
    Transation.find(callback).limit(limit);
}
