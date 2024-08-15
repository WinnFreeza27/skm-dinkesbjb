import { insertData } from "@/lib/insertData";
import { allowedOrigins } from "@/utils/allowedOrigins";
import { NextResponse, NextRequest } from "next/server";
import { getData } from "@/lib/getData";
import { insertUuid } from "@/utils/insertUuid";
import { getSheetData, insertSheetData } from "@/lib/sheetApi";

export async function POST(req) {
    const origin = req.headers.get('origin')
    console.log(origin)
    if(!allowedOrigins.includes(origin)) {
        console.log('Forbidden')
        return new Response(JSON.stringify({ message: "Forbidden" }), {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
            },
          });
    }

    
    try{
        const rawFormData = await req.json()
        const formData = insertUuid(rawFormData.formData)
        const data = await insertData(formData)
        const sheetData = await insertSheetData(rawFormData.sheetData)
        return NextResponse.json({message: "Success", error: null, status: 200, data: data, sheet: sheetData})
    } catch (error) {
        return NextResponse.json({message: "Error", error: error, status: 500, data: []})
    }
}

export async function GET(req) {
    const origin = req.headers.get('origin') || req.headers.get('referer')
    console.log(origin)
    if(!allowedOrigins.includes(origin)) {
        console.log('Forbidden')
        return new Response(JSON.stringify({ message: "Forbidden" }), {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
            },
          });
    }
    try{
        const response = await getData()
        const sheetData = await getSheetData()
        return NextResponse.json({message: "Success", error: null, status: 200, data: response, sheet: sheetData})
    } catch (error) {
        return NextResponse.json({message: "Error", error: error, status: 500, data: []})
    }
}