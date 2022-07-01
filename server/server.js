const express = require("express");
const api = require("./routes/api");
require("dotenv").config()

/**Constants and Env Variables */
const PORT = process.env.PORT || 3000;
const app = express();

/**Middleware */
const logger = (req, res, next) => {
    console.log(`${req.method}: ${req.originalUrl}`)
    next()
}
app.use(logger);


/**Routing */
app.use("/api", api);

app.get("/", (req, res) => {
    console.log("home");
});

app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`);
});