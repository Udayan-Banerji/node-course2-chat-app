const path = require('path');
const http = require('http');
const express = require('express');
const fs = require('fs'); //file system
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

// console.log(__dirname+'/../public');
// console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {          //io.on lets you register an event listener
    console.log('new user connected');      //socket is the individual user from index.html, not all users on server

    socket.emit('newMessage', {
      from: 'Jacksoen',
      text: 'Hey whats up',
      createdAt: 123
    });

    socket.on('createMessage', (newMessage) => {
      console.log('create Message',{from: newMessage.from, text: newMessage.text, createdAt: Date.now()});
      socket.emit('newMessage',  {from: newMessage.from, text: newMessage.text, createdAt: Date.now()});
    });



    socket.on('disconnect', ()=> {
      console.log('Disconnected from server');
    });
});

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
})
