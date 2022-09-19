const express = require('express')
const session = require('express-session')

const app = express()
const mysql = require('mysql')
const config = require('./config.json')

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

/*const db = mysql.createPool({
    host : config.mysql[0],
    user : config.mysql[1],
    password : config.mysql[2],
    database : config.mysql[3],
    connectionLimit : 5,
    acquireTimeout  : 8000,
    timeout : 60000
})*/

/*DONE*/ app.use(session({                                /*DONE*/ 
/*DONE*/    secret: 'secret',                             /*DONE*/ 
/*DONE*/    resave: true,                                 /*DONE*/ 
/*DONE*/    saveUninitialized: true                       /*DONE*/ 
/*DONE*/ }));                                             /*DONE*/ 
/*DONE*/ app.use(express.urlencoded({ extended: true }))  /*DONE*/ 



app.get('/', (req, res) => {
    res.render('index')
})

app.get('*', function(req, res){
    res.send('what???');
    console.log('awd')
});

app.listen(2137)
console.log('port: 2137')