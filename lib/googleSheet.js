import {google} from 'googleapis';

const spreadsheetId = "1IGNjDD-LSI2DZ6oR96zBeJMPFrlEz6neH7bgMhMn-ws"

const credentialsBase64 = process.env.NEXT_PUBLIC_SHEET;
const credentials = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('utf-8'));

// Now you can use the credentials object as you would with the actual JSON file

console.log(credentials)

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
})

const client = await auth.getClient()
const googleSheets = google.sheets({version: 'v4', auth: client})

export {googleSheets , auth, spreadsheetId}