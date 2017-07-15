const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

const button = require('./read_button.js');

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
  button();
});

app.use(express.static(`${__dirname}/public`));
