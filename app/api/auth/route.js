import { NextRequest, NextResponse } from "next/server";
import { signinAdmin } from "@/lib/signIn";
import { allowedOrigins } from "@/utils/allowedOrigins";
import { decryptData } from "@/utils/decrypt";

export async function POST(req) {
    const origin = req.headers.get('origin') || req.headers.get('referer')
    if(!allowedOrigins.includes(origin)) {
        return new Response(JSON.stringify({ message: "Forbidden" }), {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
            },
          });
    }
    console.log(req)
    const {encryptData: encryptedData} = await req.json();
  console.log(encryptedData); // Should not be undefined

    try {
        const decryptedData = await decryptData(encryptedData);
        console.log(decryptedData)
        const { email, password } = decryptedData;
        const { data, error } = await signinAdmin(email, password);
        if (error) {
            return NextResponse.json({ error: error.message, data: encryptedData });
        }
        return NextResponse.json({ data }); 
    } catch (error) {
        return NextResponse.json({ error: error.message, data: encryptedData });
    }
}