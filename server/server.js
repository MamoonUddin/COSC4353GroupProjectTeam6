// these are the dependecies
// so you would first redirect to the server file for me it was "cd server"
// next you will do "npm install"
// and finally "npm start"

const express = require("express");
const mysql = require('mysql');
const api = require("./routes/api");
const path = require('path');
var bodyParser = require('body-parser')
require("dotenv").config()

var connected = false;
var logedIn = {
    status : false,
    userID  : ""  
};

/**Constants and Env Variables */

const PORT = process.env.PORT || 3000;
const app = express();
const dbService = require('./DBService');
const { connect } = require("http2");
const { render } = require("ejs");
const DBService = require("./DBService");

// idk what this doing
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

app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`);
});

app.get("/", (req, res) => {
    console.log("home");
    if (connected == false) {
        dbService.createDataBase();
        connected = true;
    };
    console.log(connected);
    res.render('index');
});

app.get("/api", (req, res) => {
    console.log("home");
    res.render('index');
});

app.post("/login", (req,res)=>{
    if (logedIn.status == true){
        res.redirect("/profile");
    }else {
        res.render("login");
    }
});

app.get("/register", (req,res)=>{
    res.render('register');
});

app.get("/profile", urlencodedParser, async  (req,res)=>{
    console.log("register page");
    try {
        let result = await dbService.getUserByEmail(logedIn.userID);
        res.render('profile', result[0]);
        
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

app.post("/profileUpdate", urlencodedParser, async  (req,res)=>{
    console.log("updating profile page");
    try {
        console.log(req.body)
        dbService.updateClient(logedIn.userID, req.body.firstname, req.body.lastname,req.body.address1,req.body.city,req.body.state,req.body.zip)
        res.redirect("/profile");
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    
});

app.post("/registerAttempt", urlencodedParser , async (req,res)=> {
    try {
        let result = await dbService.getUserByEmail(req.body.username);
        if (req.body.psw === req.body.pswRepeat && req.body.username.includes('@') && result.length == 0 ){
            dbService.insertUserByRegister(req.body.username,req.body.psw);
            res.render("login");
        }
        res.render('register');
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    console.log('attempting to signup');
    // adding DB logic to add to databse 
    
});

app.post("/loginAttempt", urlencodedParser ,async (req,res)=> {
    try {
        if (logedIn.status == false){
            console.log(req.body);
            let hashpass = await dbService.getHashPassByEmail(req.body.uname);
            console.log(hashpass);
            let result = await dbService.comparePassForLogIn(req.body.psw,hashpass.password);
            console.log(result);
            if (result){
                logedIn.status = true;
                logedIn.userID = req.body.uname;
                res.redirect('/profile');
            }else{
                res.render('loginFail')
            }
           
        }else{
            res.redirect('profile');
        }
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    console.log(logedIn);
});

app.get("/request", (req,res)=>{
    console.log("requesting");
    res.render('request');
});


app.get("/logout", (req,res) => {
    logedIn.status =false;
    logedIn.userID = '' ;
    res.redirect("/");
});

app.post("/pricing", urlencodedParser , async (req,res) => {
    try{
        console.log(req.body);
        let result = await dbService.getAmount(req.body.stateTo);
        let mergedResult = {...result[0], ...req.body};
        console.log(mergedResult);
        res.render("confrimReq", mergedResult);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

app.post("/confirm", urlencodedParser , async (req,res) => {
    try{
        let email = logedIn.userID;
        let gal = parseFloat(req.body.gallons);
        let cost = parseFloat(req.body.price);
        let sendLocation = req.body.state;
        dbService.insertTransaction(email, gal,cost,sendLocation);
        res.redirect("/profile");
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

app.get("/history", urlencodedParser, async (req,res) => {
    try{
        // let result = await dbService.getHistory(logedIn.userID);
        // let tableHtml = "";

        // result.forEach(function({transactionID,userID,gallons,price,sentTo}){
        //     tableHtml += "<tr>";
        //     tableHtml += `<td>${transactionID}</td>`;
        //     tableHtml += `<td>${userID}</td>`;
        //     tableHtml += `<td>${gallons}</td>`;
        //     tableHtml += `<td>${price}</td>`;
        //     tableHtml += `<td>${sentTo}</td>`;
        //     tableHtml += "</tr>";
        // });

        // console.log(tableHtml);
        // let final = {innerhtml : tableHtml};
        // res.render("transactionHistory",final)
        res.render("transactionHistory");
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/getAll', (request, response) => {

    const result = dbService.getHistory(logedIn.userID);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.post("/forgetAttempt", urlencodedParser , async (req,res)=> {
    try {
        let result = await dbService.getUserByEmail(req.body.username);
        if (req.body.psw === req.body.pswRepeat && req.body.username.includes('@') && result.length != 0 ){
            dbService.updateUserByRegister(req.body.username,req.body.psw);
            res.render("login");
        }
        res.render('forgPass');
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    console.log('attempting to signup');
    // adding DB logic to add to databse 
    
});

app.get("/forget", (req,res) => {
    res.render("forgPass");
});