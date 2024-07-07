import { optionStore } from "@/store/optionsStore"

export const useOptions = () => {
    const setOptionsStore = optionStore((state) => state.setOptionsStore)
    const optionsStore = optionStore((state) => state.optionsStore)
    return {
        optionsStore,
        setOptionsStore
    }
}