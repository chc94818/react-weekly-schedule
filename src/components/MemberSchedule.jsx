import React from 'react';
import MemberCard from './MemberCard';
import ScheduleCard from './ScheduleCard';

function MemberSchedule({memberScheduleData, memberName}) {
  const ScheduleCards = memberScheduleData.map((data, index) => {
    return (
      <li key={index}>
        <ScheduleCard cardData={data}/>
      </li>
    )
  })
  
  return (
    <ul className="member-schedule-list">
      <li>
        <MemberCard memberName={memberName}/>
      </li>
      {ScheduleCards}
    </ul>
  );
}

export default MemberSchedule;

