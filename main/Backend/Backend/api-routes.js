
let router = require('express').Router();
const bcrypt = require('bcrypt')

const Customer = require('./customerModel')
const rounds = 10

// router.get('/', function (req, res) {
//     res.json({
//         status: 'API Working',
//         message: 'Welcome to RESTHub crafted with love!',
//     });
// });

var customerController = require('./customerController');

router.route('/customers')
    .get(customerController.index)
    .post(customerController.new);
router.route('/customers/:customer_id')
    .get(customerController.view)
    .patch(customerController.update)
    .put(customerController.update)
    .delete(customerController.delete);

router.route('/customers/login')
    .post(customerController.login);

const Transaction = require('./transactionModels')

var transactionController = require('./transactionController');

router.route('/transactions/:username')
    .get(transactionController.lastfive);



module.exports = router;