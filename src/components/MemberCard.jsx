import React from 'react';
import riloImg from '../images/rilo.png';
import melcoImg from '../images/melco.png';
import hatsukiImg from '../images/hazuki.png';
import hakuzenImg from '../images/hakuzen.png';

const MEMBER_IMG_MAP = {
  rilo: riloImg,
  melco: melcoImg,
  hatsuki: hatsukiImg,
  hakuzen: hakuzenImg
}

const MEMBER_NAME_MAP = {
  rilo: "流川莉蘿 Rilo",
  melco: "芽心 Melco",
  hatsuki: "葉月 Hazuki",
  hakuzen: "久田 Hakuzen",
}

function MemberCard({memberName}) {
  return (
    <div className="member-card member">
      <img className="member-card-image" src={MEMBER_IMG_MAP[memberName]} alt="member-card"/>
      <span>{MEMBER_NAME_MAP[memberName]}</span>
    </div>
  );
}

export default MemberCard;

