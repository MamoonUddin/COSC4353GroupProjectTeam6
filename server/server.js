// these are the dependecies
// so you would first redirect to the server file for me it was "cd server"
// next you will do "npm install"
// and finally "npm start"

// everything is hooked up by these ejs files which are basically derieved from the orignal HTML files.
// most changes are done just have to apply some buisness logic maybe make pricing a new page doo the calculations
// that could be done with render and urlencodedParser in the server.js file doing some math in between request and doing a approve 
// option which we dont wory until DB phase.
// onkly 1 account works   
// username : john
// password : 123 
// idk how the testing is gonna work. 


// i put this in server.js in the top. i also branched of server change branch cause it wasnt merged to main.


const express = require("express");
const api = require("./routes/api");
const path = require('path');
var bodyParser = require('body-parser')
require("dotenv").config()

// DB logic
const mysql = require('mysql');
var connected = false ;
const dbService = require('./dbService');
const { connect } = require("http2");
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '' 
});

/**Constants and Env Variables */
const PORT = process.env.PORT || 3000;
const app = express();

var jsonParser = bodyParser.json()
app.set('view engine', 'ejs');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

/**Middleware */
const logger = (req, res, next) => {
    console.log(`${req.method}: ${req.originalUrl}`)
    next()
}
app.use(logger);

app.use(express.static("public"));

/**Routing */
app.use("/api", api);

app.get("/", (req, res) => {
    console.log("home");
    if (connected == false ){
        let sql = "CREATE DATABASE gas_sale_app";
        connection.query(sql, (err) => {
           if(err){
            console.log("DB exists");
           }else{
            dbService.createDataBase();
            console.log("DB didnt exist");
           } 
        });
        connected = true;
    }
    res.render('index');
});
app.get("/api", (req, res) => {
    console.log("home");
    res.render('index');
});

app.get("/login", (req,res)=>{
    console.log("login page");

    res.render('login');
});

app.get("/register", (req,res)=>{
    console.log("register page");
    // adding DB logic to add to databse 
    res.render('register');
});

app.get("/profile", urlencodedParser, (req,res)=>{
    console.log("register page");
    console.log(req.body);
    res.render('profile');
});

app.post("/registerAttempt", urlencodedParser , (req,res)=> {
    console.log('attempting to signup');
    // adding DB logic to add to databse 
    console.log(req.body);
    res.render('login');
});

app.post("/loginAttempt", urlencodedParser , (req,res)=> {
    console.log('attempting to log in');
    // add DB logic to compare later but for now it should be 
    // username : john
    // password : 123
    console.log(req.body);
    if (req.body.uname == "john" && req.body.psw == "123") {
        res.render('profile');
      } else {
        res.render('loginFail');
      }

    
});

app.get("/request", (req,res)=>{
    console.log("requesting");
    res.render('request');
});

app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`);
});
