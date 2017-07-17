import React from 'react';

import '../styles/main.css';

const Score = (props) => {
  return (
    <div className="score">
      {props.score}
    </div>
  );
}

export default Score;
