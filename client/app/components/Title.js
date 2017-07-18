import React from 'react';

import Beer from './Beer';
import '../styles/title.css';

const Title = (props) => {
  return (
    <div>
      <span id="title"><Beer />BEER DIE</span>
      <div id="reset-button" onClick={props.resetScore}>
        Reset Score
      </div>
    </div>
  );
}

export default Title;
