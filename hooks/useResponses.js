import { responseStore } from "@/store/responseStore";

export const useResponses = () => {
    const setResponses = responseStore((state) => state.setResponses)
    const responses = responseStore((state) => state.responses)
    return {setResponses, responses}
}