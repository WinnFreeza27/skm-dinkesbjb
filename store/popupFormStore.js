import { create } from 'zustand';

export const popupFormStore = create((set) => ({
    isOpen: {},
    setIsOpen: (value) => set((state) => ({ ...state, isOpen: {...state.isOpen, ...value} })),
}));
