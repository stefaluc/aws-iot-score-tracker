const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

const button = require('./setup-button.js');

server.listen(port, () => {
  console.log(`Listening on port ${port}`);

  // forward button signal to client
  button().on('message', (topic, payload) => {
    console.log('Received button signal:');
    console.log(payload.toString());
    io.emit('message', payload.toString());
  });
});

app.use(express.static(`${__dirname}/client/public`));

io.on('connection', () => { console.log("Connected to client socket") });
