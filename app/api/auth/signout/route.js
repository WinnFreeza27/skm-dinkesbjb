import { signOutAdmin } from "@/lib/signOut";

export async function POST(req) {
    try {
        // Parse the JSON body to get the access token
        const { accessToken } = await req.json();

        // Invalidate the session in Supabase
        const { error } = await signOutAdmin(accessToken);

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Optionally clear cookies or other session management mechanisms here
        // Example: Clearing cookies
        const response = new Response(JSON.stringify({ message: 'Logged out successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': 'sb-access-token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax',
                'Set-Cookie': 'sb-refresh-token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax',
            },
        });

        return response;
    } catch (error) {
        console.error('Logout Error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}