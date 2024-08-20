import { sessionStore } from "@/store/sessionStore"
export const useSessionStore = () => {
    const user = sessionStore((state) => state.user)
    const isAuthenticated = sessionStore((state) => state.isAuthenticated)
    const setUser = sessionStore((state) => state.setUser)
    const clearUser = sessionStore((state) => state.clearUser)
    const trueId = sessionStore((state) => state.trueId)

    return {user, isAuthenticated, setUser, clearUser, trueId}
}