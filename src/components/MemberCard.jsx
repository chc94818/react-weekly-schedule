import React from 'react';
import riloImg from '../images/rilo.png';
import melcoImg from '../images/melco.png';
import hatsukiImg from '../images/hatsuki.png';
import hakuzenImg from '../images/hakuzen.png';

const MEMBER_IMG_MAP = {
  rilo: riloImg,
  melco: melcoImg,
  hatsuki: hatsukiImg,
  hakuzen: hakuzenImg
}

function MemberCard({memberName}) {
  return (
    <div className="member-card member">
      <img className="member-card-image" src={MEMBER_IMG_MAP[memberName]} alt="member-card"/>
    </div>
  );
}

export default MemberCard;

