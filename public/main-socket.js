const socket = io()
var selected_room
var text_area_content = ""

function create(){
    let roomname = prompt('Give room name u wanna create')
    socket.emit('create',roomname)
    console.log(socket.id)
}

function join(){
    let roomname = prompt('Give room name u wanna join to')
    socket.emit('join',roomname)
    console.log(socket.id)
}

socket.on(`alert`, function (data) {
    alert(data)
})

function change_displayed(data){
    selected_room = data //cahnges selected room
    socket.emit('get',data) // and send request to server to get data of that room

}

socket.on(`add`, function (data) {    
    console.log(data) 
    document.getElementById('list').innerHTML += `<div class="rooms-1" id="${data}" onclick="change_displayed('${data}')">${data}</div>`

})

socket.on('send', function (data){
    document.getElementById("tecttarea").value = data
})

setInterval(function(){
    if(document.getElementById("tecttarea").value != text_area_content)
    {   
        if(selected_room)
        {
            text_area_content = document.getElementById("tecttarea").value

            var data =[selected_room,text_area_content]

            socket.emit('text',data)
        }
    }
},50)    

socket.on("new", function (data) {

    if(selected_room == data[0])
    {
        console.log('data_changed')

        text_area_content = data[1]
        document.getElementById("tecttarea").value = data[1];
    }
})