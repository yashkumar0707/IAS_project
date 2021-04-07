Customer = require('./customerModel');
const bcrypt = require('bcrypt')
const { uuid } = require('uuidv4');
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

//signup 
exports.new = function (req, res) {
    var customer = new Customer();
    customer.username = req.body.username ? req.body.username : customer.username;
    customer.password = req.body.password;
    customer.id=uuid();
customer.save(function (err) {
res.json({
            message: 'New customer created!',
            data: customer
        });
    });
};

exports.login = function(req,res){
    console.log(req.body)

    
}
exports.view = function (req, res) {
    Customer.findById(req.params.customer_id, function (err, customer) {
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