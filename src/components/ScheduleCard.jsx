import React from 'react';
import REST_KEYWORDS from '../configs/restKeyword.json';

function ScheduleCard({cardData}) {
  const {twitch, youtube} = cardData || {}
  const content = twitch || youtube || ''
  const isRestDay = REST_KEYWORDS.some((keyword) => {
    return content.includes(keyword);
  })
  return (
    <div className={`member-card ${isRestDay ? "rest-day" : ""}`}>
      <div className="member-card-content" data-storke={content}>
        {content}
      </div>
    </div>
  );
}

export default ScheduleCard;

