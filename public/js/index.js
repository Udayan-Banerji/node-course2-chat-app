var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createMessage',  {
  //   from: 'jen@example.com',
  //   text: 'Hey. This is Andrew'
  // });


});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// socket.on('newEmail', function (email) {
//   console.log('New Email', email);
// });

socket.on('newMessage', function (message) {
  console.log('New Message from Server', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit',function (evnt) {
  evnt.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  },function (data_from_server) {

  });
});
