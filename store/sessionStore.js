import {create} from "zustand";

export const sessionStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    trueId: process.env.NEXT_PUBLIC_TRUE_ID,
    setUser: (user, auth) => set((state) => ({...state , user, isAuthenticated: auth})),
    clearUser: () => set((state) => ({...state, user: null, isAuthenticated: false})),
}))