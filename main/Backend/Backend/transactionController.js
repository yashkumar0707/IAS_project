Transaction = require('./transactionModels');
exports.lastfive = function (req, res) {
    Transaction.get(function (err, transactions) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        // console.log(req.params.username);
        user = req.params.username;
        Transaction.find(
            { username: user },
            null,
            { sort: { 'create_date': 'desc' }, limit: 5 },
            function (error, last_five_transactions) {
                if (error) return `${error}`;
                // console.log(posts)
                res.json({
                    status: "success",
                    message: "Transactions retrieved successfully",
                    data: last_five_transactions
                });
            });
    }
    );
    // console.log(posts)  

};