import React from 'react';
import MemberSchedule from './MemberSchedule';
import WEEK_HEADER from '../configs/daysOfWeekMap.json';

const WeeklySchedule = React.forwardRef(({scheduleData, selectDate}, ref) => {
  const weekHeaders = Object.keys(WEEK_HEADER).map((day, index) => {
    return (
      <li key={index} className={day} data-storke={WEEK_HEADER[day]}>
        {WEEK_HEADER[day]}
      </li>
    )
  })

  const memberScheduleList = Object.keys(scheduleData).map((memberName, index) => {
    return (
      <div className={`member-schedule-wrapper ${memberName}`} key={index}>
        <MemberSchedule memberScheduleData={scheduleData[memberName]} memberName={memberName}/>
      </div>
    )
  })
  const periodString = selectDate.mondayString + "-" +selectDate.sundayString;
  return (
    <div className="weekly-schedule" ref={ref}>
      <div className="weekly-schedule-period-wrapper">
        <span>{periodString}</span>
      </div>
      <div className="weekly-schedule-table">
        <div className="weekly-schedule-table-header-wrapper">
          <ul className="weekly-schedule-table-header-list">
            {weekHeaders}
          </ul>
        </div>
        {memberScheduleList}
      </div>
    </div>
  );
});

export default WeeklySchedule;

