const express = require('express')
const session = require('express-session')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

//SOCKET.IO SETUP

const PORT = 2137

const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

const socket = require("socket.io");
const io = socket(server);

//SOCKET.IO

io.on("connection", function (socket) {
    console.log("Made socket connection");
    socket.on("text", (data) => {
    })
});









app.use(session({                                
    secret: 'secret',                            
    resave: true,                                 
    saveUninitialized: true                      
}));                                             
app.use(express.urlencoded({ extended: true }))  

app.get('/', (req, res) => {
    res.render('index')
})