export const mergeData = (rawData) => {
    let obj = {
        response_id: {
        }
       }
   const questions = rawData[0].questions
   const x = questions.map((question) => {
    const questionData = {
        question_id: question.id,
        question_text: question.question_text,
        question_number: question.number,
    }
      question.responses.map((response) => {
        let responseValue = response.questions_options
        if(response.response_input) responseValue = {option_text:response.response_input}
        const responseData = {
            value: responseValue,
            created_at: response.created_at
        }
        const responseID = response.response_entry_id
        if(!obj.response_id[responseID]) {
            obj.response_id[responseID] = [
                {
                    ...questionData,
                    responses: responseData
                }
            ]
        } else {
            obj.response_id[responseID].push({
                ...questionData,
                responses: responseData
            })
        }
       
       })
       return null
   })

    Object.keys(obj.response_id).map((key) => {
    console.log(key)
    obj.response_id[key] = sortData(obj.response_id[key])
   })
   return obj
}

const sortData = (data) => {
    const sorted = data.sort((a, b) => a.question_number - b.question_number)
    return sorted
}