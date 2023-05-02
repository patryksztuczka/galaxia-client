import { StateCreator } from 'zustand';

import { supabase } from '../../supabaseClient';
import { Database } from '../../types/supabase';

export interface IEventSlice {
  events: Database['public']['Tables']['Event']['Row'][] | undefined;
  event: Database['public']['Tables']['Event']['Row'] | undefined;
  getEventsStatus: boolean;
  getEventByIdStatus: boolean;
  getEvents: () => void;
  getEventById: (eventId: string) => void;
}

export const createEventSlice: StateCreator<IEventSlice> = (set) => ({
  events: undefined,
  event: undefined,
  getEventsStatus: false,
  getEventByIdStatus: false,

  getEvents: async () => {
    try {
      set({ getEventsStatus: true });
      const { data, error } = await supabase
        .from('Event')
        .select('*')
        .order('start_datetime', { ascending: true });
      if (error) throw error;
      set({ events: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ getEventsStatus: false });
    }
  },

  getEventById: async (eventId: string) => {
    try {
      set({ getEventByIdStatus: true });
      const { data, error } = await supabase.from('Event').select('*').eq('id', eventId).single();
      if (error) throw error;
      set({ event: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ getEventByIdStatus: false });
    }
  },
});
