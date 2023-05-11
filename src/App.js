import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { readSpreadsheet } from './services/sheetService';
import { transformScheduleData, getWeeklySchedule, getScheduledMondayIndex } from './utils/utils';
import WeeklySchedule from './components/WeeklySchedule';
import html2canvas from 'html2canvas'

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


  const refPhoto = useRef(null);
  const handleTakeCanvas = () => {
      html2canvas(refPhoto.current).then(function (canvas) {
          const periodString = selectDate.mondayString + "-" +selectDate.sundayString;
          const dataUrl = canvas.toDataURL('image/png')
          const link = document.createElement('a')
          link.download = `weekly_schedule_${periodString}.png`
          link.href = dataUrl
          link.click()
      });
  }

  const weeklySchedule = getWeeklySchedule(scheduleData, selectDate.matchIndex);
  const memberWeeklySchedule = transformScheduleData(weeklySchedule);
  return (
    <div className="App">
      <div className="control-panel-wrapper">
        <div className="control-panel">
          <button onClick={handleTakeCanvas}>Download image</button>
        </div>
      </div>
      <div className='weekly-schedule-wrapper'>
        <WeeklySchedule ref={refPhoto} scheduleData={memberWeeklySchedule} selectDate={selectDate} />
      </div>
    </div>
  );
}

export default App;

