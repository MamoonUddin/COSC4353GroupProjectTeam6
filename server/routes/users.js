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

module.exports = usersRouter;