import React from 'react';

function ScheduleCard({cardData}) {
  const {twitch, youtube} = cardData || {}
  const content = twitch || youtube || ''
  return (
    <div className="member-card">
      <div className="member-card-content">
        {content}
      </div>
    </div>
  );
}

export default ScheduleCard;

