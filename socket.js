//SOCKET.IO
module.exports = function (server) {
    const socket = require("socket.io");
    const io = socket(server);

    console.log('d')

    var text_content = ""

    io.on("connection", function (socket) {
        socket.emit('new',text_content)

        socket.on("text", (data) => {
            text_content = data

            socket.broadcast.emit('new',text_content)
        })
    });
}