import supabase from "@/utils/supabaseClient";

export const getQuestion = async (survey_id) => {
    let { data: question_options, error } = await supabase
    .from('questions')
    .select(`
    *,
    questions_options (
        id,option_text,option_point,question_id
    )
    `).eq('survey_id', 1)
    if(error) throw error 
    return question_options
}