//SOCKET.IO
module.exports = async function (server) {
    const socket = require("socket.io");
    const io = socket(server);

    var rooms = []
    var users = []

    io.on("connection", async function (socket) {

        users.push([socket.id])

        socket.on("create", (data) => {
            const found = rooms.find(ele => ele[0] == data)

            if(found){
                console.log('room exist')
                socket.emit(`alert`,'room already exist')
            }
            else{
                console.log('new room created by : ',socket.id)
                rooms.push([data,'',[socket.id]])
                socket.emit(`alert`,'room created')

                socket.emit(`add`,data)

                console.log(rooms)
            }
        })

        socket.on("join", (data) => {
            let i = 0

            for(let test of rooms)
            {
                if(test[0] == data)
                {
                    const found = rooms[i][2].find(ele => ele == socket.id)
                    if(found)
                    {
                        socket.emit(`alert`,'you already in that room')
                    }
                    else
                    {
                        rooms[i][2].push(socket.id)
                        console.log(rooms)
                        socket.emit(`add`,data)
                    }

                    break
                }

                i=i+1
            }
        })

        socket.on('text', (data) => {
            let room = data[0]
            let content = data[1]

            console.log(rooms)

            if(room == null) return

            if(data[1].length > 5000){
                socket.emit(`alert`,'YOUR FILE IS TOO BIG');
            
                let i = 0
                for(let test of rooms)
                {
                    if(test[0] == room)
                    {
                        let undo = [room,test[1]]
                        socket.emit('new',undo)
                         //send old content to user 
                        break
                    }

                    i=i+1

                    return
                }
            }

            let i = 0

            for(let test of rooms)
            {
                if(test[0] == room)
                {
                    rooms[i][1] = content
                    //update content

                    for (const user of rooms[i][2]) {
                        if(user == socket.id){}
                        else io.to(user).emit('new',data)
                    } //send new content to users    in room except sender

                    break
                }

                i=i+1
            }
        })

        socket.on('get', (data) => {

            let i = 0

            for(let test of rooms)
            {
                if(test[0] == data)
                {

                    socket.emit('send',test[1])
                    break
                }

                i=i+1
            }
        })
    });

    io.on('disconnect',(socket) => {

        const index = array.indexOf([socket.id]);
        console.log("__",index)
        if (index > -1) { // only splice array when item is found
        array.splice(index, 1); // 2nd parameter means remove one item only
        }

    })
}