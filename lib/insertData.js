import supabase from "@/utils/supabaseClient"

export const insertData = async (formData) => {
    const { data, error } = await supabase
    .from('responses')
    .insert([
    ...formData
    ])
    .select()

    if(error) throw error

    return data
}