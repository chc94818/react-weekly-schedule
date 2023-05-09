import React from 'react';
import '../css/WeeklySchedule.css';
import MemberSchedule from './MemberSchedule';

function WeeklySchedule({scheduleData}) {
  const memberScheduleList = Object.keys(scheduleData).map((memberName, index) => {
    return (
      <div className={`member-schedule-wrapper ${memberName}`} key={index}>
        <MemberSchedule memberScheduleData={scheduleData[memberName]} memberName={memberName}/>
      </div>
    )
  })
  return (
    <div className="weekly-schedule-wrapper">
      <div className="weekly-schedule-table">
        {memberScheduleList}
      </div>
    </div>
  );
}

export default WeeklySchedule;

