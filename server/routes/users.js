const express = require("express");
const usersRouter = express.Router();

/**For testing */
const users = require("../tst/users.json").users
/**End For Testing */

usersRouter.get("/", (req, res) => {
    res.json(
        {
            users: users
        }
    );
});

usersRouter.get("/:userId", (req, res) => {
    const user = users.find((obj)=>{
        return obj.userId.toLowerCase() == req.params.userId.toLowerCase();
    });
    res.json(user)
});

/**For dealing with user transactions */
const transactionsRouter = require("./transactions");
usersRouter.use("/:userId/transactions", (req, res, next) => {
    req.userId = req.params.userId;
    next();
}, transactionsRouter);

module.exports = usersRouter;