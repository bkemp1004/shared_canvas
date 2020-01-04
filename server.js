var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log('running');

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){ 
    console.log('new connection: ' + socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(mouse){
        console.log('mouse: x:' + mouse.x + ' y: ' + mouse.y);
        socket.broadcast.emit('mouse', mouse);
    }
}