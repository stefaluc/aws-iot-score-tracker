import React from 'react';
import io from 'socket.io-client';
const socket = io();

import { SERIAL_LEFT, SERIAL_RIGHT } from '../consts.js';

import Score from '../components/Score';
import '../styles/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scoreLeft: 0,
      scoreRight: 0,
    };
  }

  componentDidMount() {
    socket.on('message', (data) => {
      console.log('REACHED');
      const { serialNumber, batteryVoltage, clickType } = JSON.parse(data);
      console.log(serialNumber);
      if (clickType === 'SINGLE') {
        if (serialNumber === SERIAL_LEFT) {
          this.setState({scoreLeft: this.state.scoreLeft + 1});
        } else if (serialNumber === SERIAL_RIGHT) {
          this.setState({scoreRight: this.state.scoreRight + 1});
        }
      } else {
        this.setState({
          scoreLeft: 0,
          scoreRight: 0,
        });
      }
    });
  }

  render() {
    return (
      <div>
        <p className="test">Beer Die</p>
        Left Side: <Score score={this.state.scoreLeft} />
        Right Side: <Score score={this.state.scoreRight} />
      </div>
    );
  }
}

export default App;
