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
      bgColor: 'grey',
    };

    this.changeBackground = this.changeBackground.bind(this);
    this.resetScore = this.resetScore.bind(this);
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
          this.setState({
            showMessage: true,
            scoreRight: this.state.scoreRight + 1, // temporary until another button is purchased
          });
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

  changeBackground(color) {
    this.setState({bgColor: color});
  }

  resetScore(e) {
    e.preventDefault();

    this.setState({scoreLeft: 0, scoreRight: 0});
  }

  render() {
    return (
      <div id="main">
        <div id="reset-button" onClick={this.resetScore}>Reset Score</div>
        <div id="display">
          <span id="title">BEER DIE</span>
          {!this.state.showMessage &&
            <div id="teams">
              <div className="teams-side left">
                <span className="teams-title left">Left Team</span>
                <Score score={this.state.scoreLeft} />
              </div>
              <div className="teams-side right">
                <span className="teams-title right">Right Team</span>
                <Score score={this.state.scoreRight} />
              </div>
            </div>
          }
          {this.state.showMessage &&
            <Message />
          }
        </div>
      </div>
    );
  }
}

export default App;
