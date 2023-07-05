import React from 'react';

function StrokeText({text}) {
  return (
    <span className="member-card-text" data-storke={text}>
      {text}
    </span>
  );
}

export default StrokeText;

