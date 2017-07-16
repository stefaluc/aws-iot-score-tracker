import React from 'react';
import io from 'socket.io-client';
const socket = io();

import { SERIAL_LEFT, SERIAL_RIGHT } from '../consts.js';

import Score from '../components/Score';
import Message from '../components/Message';
import '../styles/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scoreLeft: 0,
      scoreRight: 0,
      showMessage: false,
    };
  }

  componentDidMount() {
    socket.on('message', (data) => {
      const { serialNumber, batteryVoltage, clickType } = JSON.parse(data);

      if (clickType === 'SINGLE') {
        if (serialNumber === SERIAL_LEFT) {
          this.setState({scoreLeft: this.state.scoreLeft + 1});
        } else if (serialNumber === SERIAL_RIGHT) {
          this.setState({scoreRight: this.state.scoreRight + 1});
        }
      } else if (clickType === 'DOUBLE') {
        if (!this.state.showMessage) { // first DOUBLE click
          // user gets 15 seconds to click again
          setTimeout(() => { this.setState({showMessage: false}); }, 15000);
          this.setState({showMessage: true});
        } else { // two DOUBLE clicks within 15 seconds
          this.setState({
            scoreLeft: 0,
            scoreRight: 0,
            showMessage: false,
          });
        }
      }
    });
  }

  render() {
    return (
      <div>
        {!this.state.showMessage &&
          <div id="background" class="grey">
            <p className="test">Beer Die</p>
            <Score score={this.state.scoreLeft} side="Left" />
            <Score score={this.state.scoreRight} side="Right" />
          </div>
        }
        {this.state.showMessage &&
          <Message color="blue" />
        }
      </div>
    );
  }
}

export default App;
