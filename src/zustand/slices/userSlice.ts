import { StateCreator } from 'zustand';

import { supabase } from '../../supabaseClient';
import { Database } from '../../types/supabase';

export interface IUserSlice {
  user: Database['public']['Tables']['profiles']['Row'] | undefined;
  getUserByIdStatus: boolean;
  updateUserStatus: boolean;
  getUserById: (userId: string) => void;
  updateUser: (userId: string, data: Database['public']['Tables']['profiles']['Row']) => void;
  clearUser: () => void;
}

export const createUserSlice: StateCreator<IUserSlice> = (set) => ({
  user: undefined,
  getUserByIdStatus: false,
  updateUserStatus: false,

  getUserById: async (userId: string) => {
    try {
      set({ getUserByIdStatus: true });

      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

      if (error) throw error;

      let avatarUrl = null;

      if (data.avatar != null) {
        const { data: imgData } = supabase.storage.from('avatars').getPublicUrl(data.avatar);
        avatarUrl = imgData.publicUrl;
      }

      set({ user: { ...data, avatar: avatarUrl } });
    } catch (error) {
      console.log(error);
    } finally {
      set({ getUserByIdStatus: false });
    }
  },

  updateUser: async (userId: string, data: Database['public']['Tables']['profiles']['Row']) => {
    try {
      set({ updateUserStatus: true });
      const { error } = await supabase.from('profiles').update(data).eq('id', userId);

      if (error) throw error;

      let avatarUrl = null;

      if (data.avatar != null) {
        const { data: imgData } = supabase.storage.from('avatars').getPublicUrl(data.avatar);
        avatarUrl = imgData.publicUrl;
      }

      set({ user: { ...data, avatar: avatarUrl } });
    } catch (error) {
      console.log(error);
    } finally {
      set({ updateUserStatus: false });
    }
  },

  clearUser: () => set({ user: undefined }),
});
