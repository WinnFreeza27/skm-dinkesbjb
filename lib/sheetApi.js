import { spreadsheetId, auth, googleSheets  } from "./googleSheet"
const getSheetData = async () => {
    try{
        const response = await googleSheets .spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Sheet1",
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const insertSheetData = async (data) => {
    try {
        const response = await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet1!A:P",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [data]
            }
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export {getSheetData, insertSheetData}