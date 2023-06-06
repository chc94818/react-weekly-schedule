import REST_KEYWORDS from '../configs/restKeyword.json';
import React, { useState } from 'react';
const CONTENT_SIZE = {
  small: 10,
  medium: 10,
  large: 12
};

// auto add space before JST
const preprocessContent = (content) => {
  return content
  .replaceAll('\r', '')
  .split(/([\d][\d]:[\d][\d](?:\s?JST)?)/)
  .map((splitContent, index) => {
    let result = splitContent;
    const timeZoneIndex = splitContent.indexOf('JST');
    if (timeZoneIndex > 0 && splitContent[timeZoneIndex-1] !== ' ') {
      result = splitContent.slice(0, timeZoneIndex) + " " + splitContent.slice(timeZoneIndex);
    }
    return result;
  }).join('');
}

function ScheduleCard({cardData}) {
  const {twitch, youtube} = cardData || {};
  const content = twitch || youtube || '';
  const preprocessedContents = preprocessContent(content);
  const [cardContent, setCardContent] = useState(preprocessedContents);
  const hasRestKeyword = REST_KEYWORDS.some((keyword) => {
    return cardContent.includes(keyword);
  })
  const [isRestDay, setIsRestDay] = useState(hasRestKeyword);
  const [isEdit, setIsEdit] = useState(false);
  
  const onCardClickHandler = (event) => {
    // trigger set rest day when right click
    event.preventDefault();
    if (event.type === 'click' && isEdit === false) {
      setIsEdit(true);
    } else if (event.type === 'contextmenu') {
      setIsRestDay(!isRestDay);
    }
  }

  const onEditTextHandler = (event) => {
    setCardContent(event.target.value);
  }

  // edit done
  const onCardKeyDownHandler = (event) => {
    if (event.key === 'Escape' && isEdit === true) setIsEdit(false);
  }
  
  let contentSize = 'small';
  Object.keys(CONTENT_SIZE).forEach(key => {
    if (content.length > CONTENT_SIZE[key]) {
      contentSize = key;
    }
  })

  const contentNodes = cardContent
    .split(/\n/)
    .filter(text=>text)
    .map((splitContent, index) => {
      return (
        <span key={index} className="member-card-content" data-storke={splitContent}>
          {splitContent}
        </span>
      )
    });

  return (
    <div 
      onClick={onCardClickHandler}
      onContextMenu={onCardClickHandler}
      onKeyDown={onCardKeyDownHandler}
      className={`
        member-card ${contentSize}
        ${isRestDay ? "rest-day" : ""}
        ${isEdit ? "editing" : ""}`
      }>
       <textarea cols="12" rows="10" value={cardContent} onChange={onEditTextHandler}></textarea>
      {contentNodes}
    </div>
  );
}

export default ScheduleCard;

