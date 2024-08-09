import { v4 as uuidv4 } from "uuid";

export const insertUuid = (formData) => {
    const uuid = uuidv4();
    const data = formData.map((item) => {
        return {...item, response_entry_id: uuid}
    })
    return data
}