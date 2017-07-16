import React from 'react';

import '../styles/main.css';

const Score = (props) => {
  return (
    <div className="score">
      {`${props.side} side: ${props.score}`}
    </div>
  );
}

export default Score;
