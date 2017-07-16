import React from 'react';

import '../styles/main.css';

const Message = (props) => {
  console.log(props);
  props.changeBackground(props.color);
  return (
    <div>
      Double click again to reset the score
    </div>
  );
}

export default Message;
