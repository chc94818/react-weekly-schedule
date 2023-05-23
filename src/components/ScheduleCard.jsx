import REST_KEYWORDS from '../configs/restKeyword.json';
import React, { useState } from 'react';
const CONTENT_SIZE = {
  small: 10,
  medium: 10,
  large: 12
};

function ScheduleCard({cardData}) {
  const {twitch, youtube} = cardData || {}
  const content = twitch || youtube || ''
  const hasRestKeyword = REST_KEYWORDS.some((keyword) => {
    return content.includes(keyword);
  })
  const [isRestDay, setIsRestDay] = useState(hasRestKeyword);

  const onCardClickHandler = () => {
    setIsRestDay(!isRestDay);
  }
  
  let contentSize = 'small';
  Object.keys(CONTENT_SIZE).forEach(key => {
    if (content.length > CONTENT_SIZE[key]) {
      contentSize = key;
    }
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
    <div onClick={onCardClickHandler} className={`member-card ${contentSize} ${isRestDay ? "rest-day" : ""}`}>
      {contentNodes}
    </div>
  );
}

export default ScheduleCard;

