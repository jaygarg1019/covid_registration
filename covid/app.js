const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({ path: './.env'});

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, //ip address of the server
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
//parse URL-endoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false}));
//parse json bodies (as sent by APU clients)
app.use(express.json());

app.set('view engine', 'hbs');

db.connect( (error) =>{
    if (error){
        console.log(error)
    }
    else{
        console.log("MySQL connected...")
    }


});

//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));



app.listen(5000, () =>{
    console.log("Serverstarted on Port 5000");
});