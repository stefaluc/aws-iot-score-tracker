import React from 'react';

import '../styles/main.css';

const Message = (props) => {
  return (
    <div>
      {(typeof props.messageType === 'object') &&
        <span>{`${props.messageType.winner} Team is the winner!`}</span>
      }
    </div>
  );
}

export default Message;
