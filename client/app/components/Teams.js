import React from 'react';

import Score from './Score';
import '../styles/teams.css';

const Teams = (props) => {
  return (
    <div id="teams">
      <div className="teams-side left">
        <span className="teams-title left">Left Team</span>
        <Score score={props.scoreLeft} />
      </div>
      <div className="teams-side right">
        <span className="teams-title right">Right Team</span>
        <Score score={props.scoreRight} />
      </div>
    </div>
  );
}

export default Teams;
