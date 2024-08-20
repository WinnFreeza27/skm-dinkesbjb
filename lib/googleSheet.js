import {google} from 'googleapis';

const spreadsheetId = process.env.NEXT_PUBLIC_SHEET_ID

const credentialsBase64 = process.env.NEXT_PUBLIC_SHEET;
const credentials = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('utf-8'));

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
})

const client = await auth.getClient()
const googleSheets = google.sheets({version: 'v4', auth: client})

export {googleSheets , auth, spreadsheetId}