const express = require("express");
const usersRouter = express.Router();

/**For testing */
const users = require("../tst/users")
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
        return obj.userId == req.params.userId;
    });
    res.json(user)
});

module.exports = usersRouter;