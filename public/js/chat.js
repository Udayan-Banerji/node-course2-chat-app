var socket = io();

function scrollToBottom () {
  // Selector
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')

  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join',params,function(err) {
    if(err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });

  // socket.emit('createMessage',  {
  //   from: 'jen@example.com',
  //   text: 'Hey. This is Andrew'
  // });


});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user));

  });

  jQuery('#users').html(ol);

});

// socket.on('newEmail', function (email) {
//   console.log('New Email', email);
// });

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();

  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // console.log('New Message from Server', message);
  // var li = jQuery('<li></li>');
  // li.text(`${message.from}: ${formattedTime} ${message.text}`);
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime

  });

  jQuery('#messages').append(html);
  scrollToBottom();


  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank"> My current location </a>');
  //
  // li.text(`${message.from} ${formattedTime}:`);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);

})

var messageTextBox = jQuery('[name=message]');

jQuery('#message-form').on('submit',function (event) {
  event.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  },function (data_from_server) {
    messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled',true).text('Sending location ...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');;
    alert('Unable to fetch location');
  })
});
