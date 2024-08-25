import { NextRequest, NextResponse } from "next/server";
import { signinAdmin } from "@/lib/signIn";
import { allowedOrigins } from "@/utils/allowedOrigins";
import { decryptData } from "@/utils/decrypt";

export async function POST(req) {
  const origin = req.headers.get('origin') || req.headers.get('referer');

  // Check if origin is allowed
  if (!allowedOrigins.includes(origin)) {
    return new Response(JSON.stringify({ message: "Forbidden" }), {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const { encryptData: encryptedData } = await req.json();
    console.log('Encrypted Data:', encryptedData);

    const decryptedData = await decryptData(encryptedData);
    const parseData = JSON.parse(decryptedData);
    const { email, password } = parseData;

    const { data, error } = await signinAdmin(email, password);

    if (error) {
      return NextResponse.json({ error: error.message, data: encryptedData, decryptedData });
    }

    console.log(data);

    // Ensure both access_token and refresh_token are returned
    return NextResponse.json({
      message: 'Signed in successfully',
      sessionToken: data.session.access_token, // Return access token
      refreshToken: data.session.refresh_token, // Return refresh token
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message });
  }
}
