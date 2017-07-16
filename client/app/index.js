import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import App from './containers/App';

const socket = io();
socket.on('connect', () => {
  console.log('Socket Connected');
  socket.emit('connection');
});

ReactDOM.render(<App />, document.getElementById('app'));
