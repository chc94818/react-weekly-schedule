import React, { useState, useEffect } from 'react';
import './App.css';
import { readSpreadsheet } from './services/sheetService';
import { transformScheduleData, getWeeklySchedule, getScheduledMondayIndex } from './utils/utils';
import WeeklySchedule from './components/WeeklySchedule';


function App() {
  const [scheduleData, setScheduleData] = useState([]);
  const [selectDate, setSelectDateIndex] = useState({matchIndex: 0, mondayString: '01.01', sundayString: '01.07'});

  useEffect(() => {
    const getSheet = async () => {
      const data = await readSpreadsheet();
      const selectScheduleDate = getScheduledMondayIndex(data)
      setScheduleData(data);
      setSelectDateIndex(selectScheduleDate);
    };
  
    getSheet();
  }, []);

  const weeklySchedule = getWeeklySchedule(scheduleData, selectDate.matchIndex);
  const memberWeeklySchedule = transformScheduleData(weeklySchedule);
  return (
    <div className="App">
      <WeeklySchedule scheduleData={memberWeeklySchedule} selectDate={selectDate} />
    </div>
  );
}

export default App;

