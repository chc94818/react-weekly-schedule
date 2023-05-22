// import LIVE_PLATFORMS from "../configs/platform.json";
import MEMBER_SHEET_MAP from "../configs/memberSheetMap.json";

const transformScheduleData = (scheduleData = []) => {
  if(scheduleData.length < 1) {
    return {};
  }
  const result = {}
  scheduleData.forEach((daySchedule) => {
    Object.keys(MEMBER_SHEET_MAP).forEach((key)=> {
      if (!result[key]){
        result[key] = [];
      }
      result[key].push(daySchedule[key]);
    })
  })
  return result;
}

const getWeeklySchedule = (scheduleData = [], startIndex = 0, count = 7) => {
  return scheduleData.slice(startIndex, startIndex + count);
}

const getScheduledMondayIndex = (scheduleData = []) => {
  if (scheduleData.length < 7) {
    return 0;
  }
  const date = new Date();
  const weekday = date.getDay();
  const offset = (8 - weekday) % 7;
  const mondayDate = new Date(date.setDate(date.getDate()+offset));
  const dateString = mondayDate.toLocaleString('zh-Hant-TW', {  month: 'long', day: 'numeric'});
  const reverseIndex = [...scheduleData].reverse().findIndex((data) => {
    return data.date && data.date.includes(dateString);
  })

  const matchIndex = scheduleData.length - 1 - reverseIndex;

  const mondayMonth = (mondayDate.getMonth() + 1).toString().padStart(2, "0");
  const mondayDay = mondayDate.getDate().toString().padStart(2, "0");
  const mondayString = mondayMonth + "." + mondayDay;
  const sundayDate = new Date(mondayDate.setDate(mondayDate.getDate()+6));
  const sundayMonth = (sundayDate.getMonth() + 1).toString().padStart(2, "0");
  const sundayDay = sundayDate.getDate().toString().padStart(2, "0");
  const sundayString = sundayMonth + "." + sundayDay;

  const selectDate = {matchIndex, mondayString, sundayString};
  return selectDate;
}

const getHalfWidthValue = (text = '') => {
  return text
      .replace(/[\uff01-\uff5e]/g, fullwidthChar => String.fromCharCode(fullwidthChar.charCodeAt(0) - 0xfee0))
      .replace(/\u3000/g, '\u0020');
}

export { transformScheduleData, getWeeklySchedule, getScheduledMondayIndex, getHalfWidthValue };