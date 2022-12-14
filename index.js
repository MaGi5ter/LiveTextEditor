const express = require('express')
const session = require('express-session')

const config = require('./config.json')
const PORT = 1337

//APP SETUP
const app = express()

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'))

const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

//MYSQL
const db = require('./mysql')

//SOCKET.IO
const socket_cod = require('./socket.js')
socket_cod(server)

//SESSION
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: config.express_session_secret,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

//ROUTES
const loginRoute = require("./routes/login")
app.use('/',loginRoute)

const textRoute = require("./routes/text")
app.use('/main',textRoute)