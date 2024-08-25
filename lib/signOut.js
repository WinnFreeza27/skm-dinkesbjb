import supabase from "@/utils/supabaseClient";

export const signOutAdmin = async (accessToken) => {
    const { error } = await supabase.auth.signOut({ access_token: accessToken });
    return { error };
}