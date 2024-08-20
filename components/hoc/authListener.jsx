"use client"

import supabase from "@/utils/supabaseClient";
import { useEffect } from "react";
import { useSessionStore } from "@/hooks/useSessionStore";

const AuthListener = () => {
    const {user, isAuthenticated, setUser, clearUser, trueId} = useSessionStore()
    useEffect(() => {
        const {data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            console.log(session?.user.id)
            console.log(trueId)
            if (session?.user && session?.user.id == trueId) {
                setUser(session.user, session.user.role == "authenticated")
            } else {
                clearUser()
            }
        })
        return () => {
            authListener?.subscription.unsubscribe()
        }
    }, [setUser, clearUser])
    console.log(user)
    console.log(isAuthenticated)
    return null;
}

export default AuthListener