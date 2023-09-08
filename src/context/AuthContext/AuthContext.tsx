import { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';

import { IAuthContext, IAuthProvider } from './AuthContext.types';
import { supabase } from '../../supabaseClient';
import { useBoundStore } from '../../zustand/store';

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  const getUserById = useBoundStore((state) => state.getUserById);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(session);
      if (session) {
        getUserById(session.user.id);
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session) {
        getUserById(session.user.id);
      }
    });

    setData();

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = { session };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
