import {create} from 'zustand'

export const optionStore = create((set) => ({
    optionsStore: {},
    setOptionsStore: (questionIndex, option) => set((state) => 
        ({optionsStore : {...state.optionsStore, [questionIndex] : option}})),
}))