import { GoogleSpreadsheet } from "google-spreadsheet";
import LIVE_PLATFORMS from "../configs/platform.json";
import MEMBER_SHEET_MAP from "../configs/memberSheetMap.json";
// Config variables
const SPREADSHEET_DOC_ID = process.env.REACT_APP_GOOGLE_SPREADSHEET_DOC_ID;
const SPREADSHEET_SHEET_ID = process.env.REACT_APP_GOOGLE_SPREADSHEET_SHEET_ID;
const PRIVATE_KEY_ID = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY_ID;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_SERVICE_CLIENT_EMAIL;
const CLIENT_ID = process.env.REACT_APP_GOOGLE_SERVICE_CLIENT_ID;
const doc = new GoogleSpreadsheet(SPREADSHEET_DOC_ID);

const readSpreadsheet = async () => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // // loads document properties and worksheets
    await doc.loadInfo();
    const sheet = doc.sheetsById[SPREADSHEET_SHEET_ID];
    const columnCount = sheet._rawProperties.gridProperties.columnCount;
    await sheet.loadCells({
      startRowIndex: 0, endRowIndex: 23, startColumnIndex:0, endColumnIndex: columnCount
    });

    const result = [];
    for (let colIndex = 1; colIndex < columnCount; colIndex++){
      const daySchedule = {};
      // get date
      daySchedule.date = sheet.getCell(1, colIndex)._rawData.formattedValue
      Object.keys(MEMBER_SHEET_MAP).forEach(member => {
        const memberSchedule = {};
        LIVE_PLATFORMS.forEach(platform => {
          const platformRowIndex = MEMBER_SHEET_MAP[member][platform];
          memberSchedule[platform] = sheet.getCell(platformRowIndex, colIndex)._rawData.formattedValue
        })
        daySchedule[member] = memberSchedule;
      });
      result.push(daySchedule);
    }
    return result;
  } catch (e) {
    console.error('Error: ', e);
  }
};



export { readSpreadsheet }