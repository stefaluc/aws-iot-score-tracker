import React from 'react';
import io from 'socket.io-client';
const socket = io();

import { SERIAL_LEFT, SERIAL_RIGHT } from '../consts.js';

import Title from '../components/Title';
import Beer from '../components/Beer';
import Teams from '../components/Teams';
import Message from '../components/Message';
import '../styles/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scoreLeft: 0,
      scoreRight: 0,
      showMessage: false,
      messageType: '',
    };

    this.changeBackground = this.changeBackground.bind(this);
    this.resetScore = this.resetScore.bind(this);
  }

  componentWillMount() {
    console.log('componentWillMount');
    const { scoreLeft, scoreRight } = this.state;
    // first to 8, win by 2
    if ((scoreLeft >= 1 )){//|| scoreRight >= 8) && (Math.abs(scoreLeft - scoreRight) > 1)) {
      console.log('reached');
      this.setState({
        messageType: {
          winner: (scoreLeft > scoreRight) ? 'Left' : 'Right',
        }
      });
    }
  }

  componentDidMount() {
    // listen for message from server
    socket.on('message', (data) => {
      const { serialNumber, batteryVoltage, clickType } = JSON.parse(data);

      if (clickType === 'SINGLE') {
        if (serialNumber === SERIAL_LEFT) {
          this.setState({scoreLeft: this.state.scoreLeft + 1});
        } else if (serialNumber === SERIAL_RIGHT) {
          this.setState({scoreRight: this.state.scoreRight + 1});
        }
      } else if (clickType === 'DOUBLE') {
        if (!this.state.messageType) { // first DOUBLE click
          // user gets 15 seconds to click again
          setTimeout(() => { this.setState({messageType: ''}); }, 15000);
          this.setState({
            scoreRight: this.state.scoreRight + 1, // temporary until another button is purchased
          });
        } else { // two DOUBLE clicks within 15 seconds
          this.setState({
            scoreLeft: 0,
            scoreRight: 0,
            messageType: '',
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
    console.log('render');
    return (
      <div id="main">
        <Title resetScore={this.resetScore} />

        {!this.state.messageType &&
          <Teams scoreLeft={this.state.scoreLeft}
                 scoreRight={this.state.scoreRight} />
        }
        {this.state.messageType &&
          <Message messageType={this.state.messageType} />
        }
      </div>
    );
  }
}

export default App;
