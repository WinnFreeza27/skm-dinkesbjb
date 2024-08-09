import {create} from 'zustand'

export const responseStore = create((set) => ({
    responses: [],
    setResponses: (newResponse) => set((state) => 
        ({responses : [...newResponse]})),
}))