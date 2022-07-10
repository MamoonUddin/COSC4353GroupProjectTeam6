const express = require("express");
const transactionsRouter = express.Router();

/**For Testing Vars*/
// Array of test transactions
const transactions = require("../tst/transaction.json").transactions;

/**End Testing Vars*/

transactionsRouter.get("/", (req, res) => {

    // TODO: In the DB phase, this should be a query of sorts
    const transactionsForUser = transactions.filter((obj)=>{
        if(obj.clientId){
            return obj.clientId == req.userId;
        }
        return false;
    }, {});

    res.json({
        "transactions":transactionsForUser
    });
    
});

transactionsRouter.post("/", (req, res) => {
    
    // TODO: on successful post
        // I think the majority of this should be done on the DB phase -Phillip

    // TODO: on failed post
        // I think the majority of this should be done on the DB phase -Phillip

});

module.exports = transactionsRouter;