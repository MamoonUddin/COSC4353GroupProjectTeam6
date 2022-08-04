const mysql = require('mysql');
const dotenv = require('dotenv');
const e = require('express');
var fs = require('fs');
var readline = require('readline');
let instance = null;
dotenv.config();
var bcrypt = require('bcrypt');
const { resolve } = require('path');
const { rejects } = require('assert');

const connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password: '' 
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});
 


let DBService = {};

DBService.createDataBase = () => {
    let sql = "DROP DATABASE gas_sale_app;" ;
    connection.query(sql, (err ) => { 
        if(err) console.log("NO DB ExISTED");
    });

    var rl = readline.createInterface({
        input: fs.createReadStream('./initialMySQL.sql'),
        terminal: false
    });
    rl.on('line', function(chunk){
        connection.query(chunk.toString('ascii'), function(err, sets, fields){
        if(err) console.log(err);
        });
    });
    rl.on('close', function(){
        console.log("finished");
        // connection.end();
        });
};

DBService.getUserByEmail = (email) =>{
    return new Promise((resolve,reject) => {
        const query = "SELECT * FROM `gas_sale_app`.`clients` WHERE email = ?";
            connection.query(query, [email], (err, results) => {
                if (err) reject(new Error(err.message));
                return resolve(results);
            });
    });
        
};

DBService.insertUserByRegister = (email,password) =>{
    return new Promise((resolve,reject) => {
        bcrypt.hash(password,10,function(err,hash){
            let sql = "INSERT INTO `gas_sale_app`.`clients` (email,password) VALUES (?,?);"   ;
            connection.query(sql, [email,hash] , (err, result) => {
                if (err) throw err;
            });
        });
    });
} 

DBService.getHashPassByEmail = (email) => {
    return new Promise((resolve,reject) => {
        const query = "SELECT password FROM `gas_sale_app`.`clients` WHERE email = ?";
        connection.query(query, [email], (err, results) => {
            if (err) reject(new Error(err.message));
            return resolve(results[0]);
        });
    });

}

DBService.comparePassForLogIn = (pass,hashPas) =>{
    return new Promise((resolve,reject) => {
        bcrypt.compare(pass, hashPas, function(err, isMatch) {
            if (err) {
                reject(new Error(err.message));
            } else if (!isMatch) {
              return resolve(false);
            } else {
              return resolve(true);
            }
          });
    });    
}

DBService.updateClient = (email,fn,ln,add,city,state,zip) =>{
    return new Promise((resolve,reject) => {
        const query = "UPDATE `gas_sale_app`.`clients` SET `firstName` = ?, `lastName` = ?, `address` = ?, `state` = ?, `city` = ?, `zip` = ? WHERE `clients`.`email` = ?;";
        const values = [fn,ln,add,city,state,zip,email];
        
         connection.query(query, values, (error, result) => {  
            if (error) reject(new Error(error.message));
            return resolve(true); 
        });
    });
}

DBService.getStates = () =>{
    return new Promise((resolve,reject) => {
        const query = "SELECT state FROM `gas_sale_app`.`prices`";
        connection.query(query, (err, results) => {
            if (err) reject(new Error(err.message));
            return resolve(results);
        });
    });
}

DBService.getAmount = (state) => {
    return new Promise((resolve,reject) => {
        const query = "SELECT pricePerGallon FROM `gas_sale_app`.`prices` WHERE state = ?";
        connection.query(query, [state], (err,results) => {
            if (err) reject(new Error(err,message));
            return resolve(results);
        }); 
    });
}

DBService.insertTransaction = (email, gallons, price,sentTo) =>{
    return new Promise((resolve,reject) => {
        let sql = "INSERT INTO `gas_sale_app`.`transaction` (userID,gallons,price,sentTo) VALUES (?,?,?,?);"   ;
            connection.query(sql, [email,gallons,price,sentTo] , (err, result) => {
                if (err) reject(new Error(err,message));
            });
        
    });
} 

DBService.getHistory = (email) => {
    return new Promise((resolve,reject) =>{
        let sql = "SELECT * FROM `gas_sale_app`.`transaction` WHERE userID = ?"
        connection.query(sql,[email], (err,result) => {
            if (err) reject(new Error(err,message));
            return resolve(result);
        });
    });
}

DBService.updateUserByRegister = (email,password) =>{
    return new Promise((resolve,reject) => {
        bcrypt.hash(password,10,function(err,hash){
            let sql = "UPDATE `gas_sale_app`.`clients` SET  `password` = ? WHERE `clients`.`email` = ?;";
            connection.query(sql, [hash,email] , (err, result) => {
                if (err) throw err;
            });
        });
    });
} 



module.exports = DBService;