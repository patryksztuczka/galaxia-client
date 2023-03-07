import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

import { IAuthContext, IAuthProvider } from "./AuthContext.types";
import { supabase } from "../../supabaseClient";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(session);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    setData();

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = { session };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
