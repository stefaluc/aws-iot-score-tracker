const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

const button = require('./read_button.js');

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
  button().on('message', (topic, payload) => {
    console.log(payload.toString());
    console.log(topic);
    io.emit('message', payload.toString());
  });
});

app.use(express.static(`${__dirname}/public`));
// client needs this served to use socket.io
app.use(express.static(`${__dirname}/node_modules/socket.io-client/dist`));

io.on('connection', function(socket) {
  console.log('connected');
});
