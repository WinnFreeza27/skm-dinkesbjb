export const sortData = (data) => {
    const sortTheOptions = data.map(question => {
        const options = question.questions_options.sort((a,b) => {
            return a.number - b.number
        })
        return {...question, questions_options: options}
    })

    const sortTheQuestions = sortTheOptions.sort((a, b) => {
        return a.number - b.number
    })
    return sortTheQuestions
}