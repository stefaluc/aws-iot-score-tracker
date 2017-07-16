import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';

const socket = io();

console.log(socket);
socket.on('connect', () => {
  console.log('Socket Connected');
});
socket.emit('connection');
socket.on('disconnect', () => {});
socket.on('message', (data) => {
  console.log(JSON.parse(data));
});

class App extends React.Component {
  render() {
    return (
      <p>React</p>
    )
  }
}

render(<App/>, document.getElementById('app'));
