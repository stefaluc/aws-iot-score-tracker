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
      bgColor: 'grey',
    };

    this.changeBackground = this.changeBackground.bind(this);
    this.resetScore = this.resetScore.bind(this);
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
        <Title resetScore={this.resetScore} />
        {!this.state.showMessage &&
          <Teams scoreLeft={this.state.scoreLeft}
                 scoreRight={this.state.scoreRight} />
        }
        {this.state.showMessage &&
          <Message />
        }
      </div>
    );
  }
}

export default App;
