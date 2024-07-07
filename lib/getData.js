import supabase from "@/utils/supabaseClient";

export const getData = async () => {

    let { data, error } = await supabase
    .from('surveys')
    .select(`
    *,
    questions(
    *,
    responses(
    questions_options(option_text,option_point)
    )
    )
    `)
    .eq('id', 1)
    if(error) throw error
    return data
}