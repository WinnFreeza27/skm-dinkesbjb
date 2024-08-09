import { getQuestion } from "@/lib/getQuestion";
import {NextResponse} from "next/server";
import { allowedOrigins } from "@/utils/allowedOrigins";

export async function GET(req) {
    const origin = req.headers.get('origin') || req.headers.get('referer')
    if(!allowedOrigins.includes(origin)) {
        return new Response(JSON.stringify({ message: "Forbidden" }), {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
            },
          });
    }
    try{
        const response = await getQuestion()
        return NextResponse.json({message: "Success", error: null, status: 200, data: response})
    } catch (error) {
        return NextResponse.json({message: "Error", error: error, status: 500, data: []})
    }
}