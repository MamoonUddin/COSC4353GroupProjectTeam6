const express = require("express");
const router = express.Router();

/** Routes */
const usersRouter = require("./users");
router.use("/users", usersRouter);

router.get("/", (req, res) => {
    console.log("APIIIIII");
});

module.exports = router;