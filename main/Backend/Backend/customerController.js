
Customer = require('./customerModel');

const bcrypt = require('bcrypt')

const rounds = 10


exports.index = function (req, res) {
    Customer.get(function (err, customers) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Customers retrieved successfully",
            data: customers
        });
    });
};

exports.new = async function (req, res) {
    let cust
    cust = await Customer.findOne({ username: req.body.username });
    console.log(cust);

    if (cust) {
        res.json({
            message: 'Username already exists'
        })
    }

    else {
        var hashedPassword = await bcrypt.hash(req.body.password, 12)
        var customer = new Customer();
        customer.username = req.body.username ? req.body.username : customer.username;
        customer.balance = req.body.balance
        customer.associated_bank = req.body.associated_bank
        customer.password = hashedPassword;

        customer.save(function (err) {
            res.json({
                message: 'New customer created!',
                data: customer
            });
        });

    }
};

exports.login = async function (req, res) {
    try {
        let cust = await Customer.findOne({ username: req.body.username })
        console.log(cust.password, req.body.password)
        if (cust) {
            let isValidPassword = false
            try {
                isValidPassword = await bcrypt.compare(req.body.password, cust.password)
            }
            catch (err) {
                console.log(err);
            }
            if (isValidPassword) {
                res.json({
                    message: 'Customer Found',
                    data: cust.username
                })
            }
            else {
                res.json({
                    message: 'Invalid Credentials'
                })
            }
        }
    }
    catch (err) {
        console.log(err)
    }


};


exports.view = function (req, res) {
    // console.log('yash')
    console.log(req.params.customer_id)
    Customer.findOne({ username: req.params.customer_id }, function (err, customer) {
        if (err)
            res.send(err);
        res.json({
            message: 'Customer details loading..',
            data: customer
        });
    });
};
exports.update = function (req, res) {
    Customer.findById(req.params.customer_id, function (err, customer) {
        if (err)
            res.send(err);
        customer.username = req.body.username ? req.body.username : customer.username;
        customer.password = req.body.password;

        customer.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Customer Info updated',
                data: customer
            });
        });
    });
};

exports.delete = function (req, res) {
    Customer.remove({
        _id: req.params.customer_id
    }, function (err, customer) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Customer deleted'
        });
    });
};