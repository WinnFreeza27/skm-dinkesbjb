import { popupFormStore } from "@/store/popupFormStore";

export const usePopupForm = () => {
    const isOpen = popupFormStore((state) => state.isOpen);
    const setIsOpen = popupFormStore((state) => state.setIsOpen);
    return {
        isOpen,
        setIsOpen,
    }
}