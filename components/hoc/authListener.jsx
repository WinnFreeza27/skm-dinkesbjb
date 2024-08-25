"use client";

import supabase from "@/utils/supabaseClient";
import { useEffect } from "react";
import { useSessionStore } from "@/hooks/useSessionStore";

const AuthListener = () => {
  const { user, setUser, clearUser } = useSessionStore();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        if (!user || session.user.id !== user.id) {
          setUser(session.user, true);
        }
      } else {
        clearUser();
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        if (!user || session.user.id !== user.id) {
          setUser(session.user, true);
        }
      } else {
        clearUser();
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [user, setUser, clearUser]);

  return null;
};

export default AuthListener;
