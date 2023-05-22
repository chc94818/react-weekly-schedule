import React from 'react';
import REST_KEYWORDS from '../configs/restKeyword.json';

function ScheduleCard({cardData}) {
  const {twitch, youtube} = cardData || {}
  const content = twitch || youtube || ''
  const isRestDay = REST_KEYWORDS.some((keyword) => {
    return content.includes(keyword);
  })
  
  const splitContents = content.split(/([\d][\d]:[\d][\d](?:\s?JST)?)/).filter(text=>text);
  const contentNodes = splitContents.map((splitContent, index) => {
    const timeZoneIndex = splitContent.indexOf('JST');
    if (timeZoneIndex > 0 && splitContent[timeZoneIndex-1] !== ' ') {
      splitContent = splitContent.slice(0, timeZoneIndex) + " " + splitContent.slice(timeZoneIndex);
    }
    return (
      <span key={index} className="member-card-content" data-storke={splitContent}>
        {splitContent}
      </span>
    )
  });

  return (
    <div className={`member-card ${isRestDay ? "rest-day" : ""}`}>
      {contentNodes}
    </div>
  );
}

export default ScheduleCard;

