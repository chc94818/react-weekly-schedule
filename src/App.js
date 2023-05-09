import React, { useState, useEffect } from 'react';
import './App.css';
import { readSpreadsheet } from './services/sheetService';
import { transformScheduleData, getWeeklySchedule } from './utils/transformScheduleData';
import WeeklySchedule from './components/WeeklySchedule';

function App() {
  const [scheduleData, setScheduleData] = useState([]);
  const [selectDateIndex, setSelectDateIndex] = useState(20);

  useEffect(() => {
    const getSheet = async () => {
      const data = await readSpreadsheet();
      setScheduleData(data);
    };
  
    getSheet();
  }, []);

  // const scheduleDivs = scheduleData.map((data, index) => {
  //   const { date, rilo, meruko, husky, hakuzen } = data;
  //   return (
  //     <div className="day-schedule-wrapper" key={index}>
  //       <div className="date">{date}</div>
  //       <div>
  //         <span>{rilo.twitch}</span>
  //         <span>{rilo.youtube}</span>
  //       </div>
  //       <div>
  //         <span>{meruko.twitch}</span>
  //         <span>{meruko.youtube}</span>
  //       </div>
  //       <div>
  //         <span>{husky.twitch}</span>
  //         <span>{husky.youtube}</span>
  //       </div>
  //       <div>
  //         <span>{hakuzen.twitch}</span>
  //         <span>{hakuzen.youtube}</span>
  //       </div>
  //     </div>
  //   )
  // })

  const weeklySchedule = getWeeklySchedule(scheduleData, selectDateIndex);
  const memberWeeklySchedule = transformScheduleData(weeklySchedule);
  console.log('---------memberWeeklySchedule',memberWeeklySchedule);
  return (
    <div className="App">
      <WeeklySchedule scheduleData={memberWeeklySchedule}/>
    </div>
  );
}

export default App;

