import { StateCreator } from 'zustand';

import { supabase } from '../../supabaseClient';
import { Database } from '../../types/supabase';

export interface IUserSlice {
  user: Database['public']['Tables']['profiles']['Row'] | undefined;
  getUserByIdStatus: boolean;
  getUserById: (userId: string) => void;
}

export const createUserSlice: StateCreator<IUserSlice> = (set) => ({
  user: undefined,
  getUserByIdStatus: false,

  getUserById: async (userId: string) => {
    try {
      set({ getUserByIdStatus: true });
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (error) throw error;
      set({ user: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ getUserByIdStatus: false });
    }
  },
});
