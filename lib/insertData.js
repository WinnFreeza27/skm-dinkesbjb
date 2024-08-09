import supabase from "@/utils/supabaseClient"
import { v4 as uuidv4 } from "uuid"

export const insertData = async (formData) => {
    console.log(formData)

    const { data, error } = await supabase
    .from('responses')
    .insert([
    ...formData
    ])
    .select()
    if(error) throw error
    return data
}