const path = require('path');
const http = require('http');
const express = require('express');
const fs = require('fs'); //file system
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
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


    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

    socket.on('createMessage', (newMessage, callback) => {
      console.log('create Message',{from: newMessage.from, text: newMessage.text, createdAt: Date.now()});
      io.emit('newMessage',             //Important: socket.emit for single connection, io.emit for all connections
        generateMessage(newMessage.from, newMessage.text));
        callback({
          textBack: 'This is from the server',
          who: 'UB'
        });

      // socket.broadcast.emit('newMessage', {
      //   from: newMessage.from,
      //   text: newMessage.text,
      //   createdAt: new Date().getTime()
      // })

    });

    socket.on('createLocationMessage', (coords) => {

            io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude));
          });




    socket.on('disconnect', ()=> {
      console.log('Disconnected from server');
    });
});

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
})
