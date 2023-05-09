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

export { transformScheduleData, getWeeklySchedule };