import React from 'react';
import riloImg from '../images/rilo.png';
import melocoImg from '../images/meloco.png';
import hatsukiImg from '../images/hatsuki.png';
import hakuzenImg from '../images/hakuzen.png';

const MEMBER_IMG_MAP = {
  rilo: riloImg,
  meloco: melocoImg,
  hatsuki: hatsukiImg,
  hakuzen: hakuzenImg
}

function MemberCard({memberName}) {
  return (
    <div className="member-card">
      <img className="member-card-image" src={MEMBER_IMG_MAP[memberName]} alt="member-card"/>
    </div>
  );
}

export default MemberCard;

