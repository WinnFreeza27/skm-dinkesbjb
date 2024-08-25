import supabase from "@/utils/supabaseClient";

export const getTemplate = async () => {
    try {
        let { data, error } = await supabase.storage.from('templates').download('template.xlsx')
        if(error) throw error
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}