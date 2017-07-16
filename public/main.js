var socket = io();

socket.on('connect', function() {
  console.log('Socket Connected');
});
socket.emit('connecton');
socket.on('event', function(data) {});
socket.on('disconnect', function() {});
socket.on('message', function(data) {
  console.log(JSON.parse(data));
});
