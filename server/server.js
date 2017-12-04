const path = require('path');
const http = require('http');
const express = require('express');
const fs = require('fs'); //file system
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

// console.log(__dirname+'/../public');
// console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {          //io.on lets you register an event listener
    console.log('new user connected');      //socket is the individual user from index.html, not all users on server



    socket.on('join', (params, callback) => {
      if (!isRealString(params.name) || !isRealString(params.room)) {
        return callback('Name and room name are required');

      };

      socket.join(params.room);
        //here are some room specific broadcasting
        //socket.leave(params.room)
        //io.emit -> io.to(params.room).emit (reaches all including same socket)
        //socket.broadcast(except to yourseld) socket.broaccast.to(params.room).emit
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

      io.to(params.room).emit('updateUserList',users.getUserList(params.room));
      socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
      socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
      callback();
    });

    socket.on('createMessage', (newMessage, callback) => {
      console.log('create Message',{from: newMessage.from, text: newMessage.text, createdAt: Date.now()});
      io.emit('newMessage',             //Important: socket.emit for single connection, io.emit for all connections
        generateMessage(newMessage.from, newMessage.text));
        callback();

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
      var user = users.removeUser(socket.id);

      if(user) {
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
      }
    });
});

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
})


module.exports = {app};
