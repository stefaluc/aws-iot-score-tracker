import React from 'react';

import '../styles/main.css';

const Message = (props) => {
  return (
    <div id="background" className={props.color}>
      Double click again to reset the score
    </div>
  );
}

export default Score;
