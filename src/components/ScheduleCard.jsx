import { hasRestKeyword } from "../utils/utils";
import React, { useState } from 'react';
import YoutubeSVG from './YoutubeSVG';
import TwitchSVG from './TwitchSVG';
import StrokeText from './StrokeText';
const youtubeLogo = (
  <div className='text-logo-container'>
    <YoutubeSVG></YoutubeSVG>
  </div>
)

const twitchLogo = (
  <div className='text-logo-container'>
    <TwitchSVG></TwitchSVG>
  </div>
)

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

const transformContentWithTag = ({content, tag = 'youtube'}) => {
  let transformedContent = ''
  switch(tag) {
    case 'youtube':
      transformedContent = '[YT]: ' + content;
      break;
    case 'twitch':
      transformedContent = '[TW]: ' + content;
      break;
    default:
      transformedContent = '[TXT]: ' + content;
      break;
  }

  if(transformedContent[transformedContent.length-1] !== '\n') {
    transformedContent += '\n';
  }

  return transformedContent;
}

const parseContentsFromTag = (content) => {
  const youtubeIndex = content.indexOf('[YT]: ');
  const textIndex = content.indexOf('[TXT]: ');
  const twitchContent = content.slice(0, youtubeIndex).replaceAll('[TW]: ', '');
  const youtubeContent = content.slice(youtubeIndex, textIndex).replaceAll('[YT]: ', '');
  const textContent = content.slice(textIndex).replaceAll('[TXT]: ', '');
  return { twitchContent, youtubeContent, textContent};
}

function ScheduleCard({cardData}) {
  const {twitch, youtube, text} = cardData || {};
  const twitchContent = twitch || '';
  const youtubeContent = youtube || '';
  const textContent = text || '';
  const preprocessedTwitchContentContents = preprocessContent(twitchContent);
  const preprocessedYoutubeContents = preprocessContent(youtubeContent);
  const preprocessedTextContents = preprocessContent(textContent);
  
  const [twitchCardContent, setTwitchCardContent] = useState(preprocessedTwitchContentContents);
  const [youtubeCardContent, setYoutubeCardContent] = useState(preprocessedYoutubeContents);
  const [textCardContent, setTextCardContent] = useState(preprocessedTextContents);
  const textHasRestKeyword = hasRestKeyword(textCardContent);
  const [isRestDay, setIsRestDay] = useState(textHasRestKeyword);
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
    const { twitchContent = '', youtubeContent = '', textContent = ''} = parseContentsFromTag(event.target.value) || {};
    setTwitchCardContent(twitchContent);
    setYoutubeCardContent(youtubeContent);
    setTextCardContent(textContent)
  }

  // edit done
  const onCardKeyDownHandler = (event) => {
    if (event.key === 'Escape' && isEdit === true) setIsEdit(false);
  }
  
  let contentSize = 'small';
  const contentLength = twitchCardContent.length + youtubeCardContent.length;
  Object.keys(CONTENT_SIZE).forEach(key => {
    if (contentLength > CONTENT_SIZE[key]) {
      contentSize = key;
    }
  })

  const twitchContentNodes = twitchCardContent
    .split(/\n/)
    .filter(text=>text)
    .map((splitContent, index) => {
      return (
        <div key={index} className="member-card-content twitch">
          { index === 0 && twitchLogo}
          <StrokeText text={splitContent}></StrokeText>
        </div>
      )
    });

  const youtubeContentNodes = youtubeCardContent
  .split(/\n/)
  .filter(text=>text)
  .map((splitContent, index) => {
    return (
      <div key={index} className="member-card-content youtube">
        { index === 0 && youtubeLogo}
        <StrokeText text={splitContent}></StrokeText>
      </div>
    )
  });

  const textContentNodes = textCardContent
  .split(/\n/)
  .filter(text=>text)
  .map((splitContent, index) => {
    return (
      <div key={index} className="member-card-content text">
        <StrokeText text={splitContent}></StrokeText>
      </div>
    )
  });

  // if(!!youtubeContentNodes.length) youtubeContentNodes.unshift(youtubeLogo);
  // if(!!twitchContentNodes.length) twitchContentNodes.unshift(twitchLogo);
  
  const textareaContent = 
    transformContentWithTag({content: twitchCardContent, tag: 'twitch'}) +
    transformContentWithTag({content: youtubeCardContent, tag: 'youtube'}) +
    transformContentWithTag({content: textCardContent, tag: 'text'});

  return (
    <div 
      onClick={onCardClickHandler}
      onContextMenu={onCardClickHandler}
      onKeyDown={onCardKeyDownHandler}
      className={`
        member-card ${contentSize}
        ${isRestDay ? "rest-day" : ""}
        ${isEdit ? "editing" : ""}
      `}
    >
      <textarea cols="12" rows="10" value={textareaContent} onChange={onEditTextHandler}></textarea>
      { !!twitchContentNodes.length && <div className="member-card-content-wrapper">{twitchContentNodes}</div>}
      { !!youtubeContentNodes.length && <div className="member-card-content-wrapper">{youtubeContentNodes}</div>}
      { !!textContentNodes.length && <div className="member-card-content-wrapper">{textContentNodes}</div>}
    </div>
  );
}

export default ScheduleCard;

