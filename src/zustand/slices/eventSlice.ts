import { StateCreator, create } from 'zustand';

import { supabase } from '../../supabaseClient';
import { Database } from '../../types/supabase';

export interface IEventSlice {
  events: Database['public']['Tables']['Events']['Row'][] | undefined;
  event: Database['public']['Tables']['Events']['Row'] | undefined | any;
  eventAttendees: any;
  userAttendingEvents: any;
  userHostingEvents: any;
  getEventsStatus: boolean;
  getEventByIdStatus: boolean;
  getEventAttendeesStatus: boolean;
  attendEventStatus: boolean;
  resignFromEventStatus: boolean;
  createEventStatus: boolean;
  editEventStatus: boolean;
  getEvents: () => void;
  getEventById: (eventId: string) => void;
  getEventAttendees: (eventId: string) => void;
  attendEvent: (eventId: string, userId: string) => void;
  resignFromEvent: (eventId: string, userId: string) => void;
  createEvent: (input: any) => void;
  editEvent: (input: any) => void;
  getUserAttendingEvents: (userId: string) => void;
  getUserHostingEvents: (userId: string) => void;
}

export const createEventSlice: StateCreator<IEventSlice> = (set) => ({
  events: undefined,
  event: undefined,
  eventAttendees: undefined,
  userAttendingEvents: undefined,
  userHostingEvents: undefined,
  getEventsStatus: false,
  getEventByIdStatus: false,
  getEventAttendeesStatus: false,
  attendEventStatus: false,
  resignFromEventStatus: false,
  createEventStatus: false,
  editEventStatus: false,

  getEvents: async () => {
    try {
      set({ getEventsStatus: true });
      const { data, error } = await supabase
        .from('Events')
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
      const { data, error } = await supabase
        .from('Events')
        .select(
          `id, name, description, start_datetime, end_datetime, image, author ( id, full_name )`,
        )
        .eq('id', eventId)
        .single();
      if (error) throw error;
      set({ event: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ getEventByIdStatus: false });
    }
  },

  getEventAttendees: async (eventId: string) => {
    try {
      set({ getEventAttendeesStatus: true });
      const { data, error } = await supabase
        .from('EventsAttendees')
        .select(`attendee_id (id, avatar_url, full_name)`)
        .eq('event_id', eventId);
      if (error) throw error;
      set({ eventAttendees: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ getEventAttendeesStatus: false });
    }
  },

  attendEvent: async (eventId: string, userId: string) => {
    try {
      set({ attendEventStatus: true });
      const { error } = await supabase
        .from('EventsAttendees')
        .insert([{ event_id: eventId, attendee_id: userId }]);
      if (error) throw error;
      set((state) => ({
        eventAttendees: [
          ...state.eventAttendees,
          {
            attendee_id: {
              id: userId,
              avatar_url: null,
              full_name: null,
            },
          },
        ],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ attendEventStatus: false });
    }
  },

  resignFromEvent: async (eventId: string, userId: string) => {
    try {
      set({ resignFromEventStatus: true });
      const { error } = await supabase
        .from('EventsAttendees')
        .delete()
        .eq('event_id', eventId)
        .eq('attendee_id', userId);
      if (error) throw error;
      set((state) => ({
        eventAttendees: state.eventAttendees.filter(
          (attendee: any) => attendee.attendee_id.id !== userId,
        ),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ resignFromEventStatus: false });
    }
  },

  createEvent: async (input: any) => {
    try {
      set({ createEventStatus: true });
      const { data, error } = await supabase
        .from('Events')
        .insert([{ ...input }])
        .select();
      if (error) throw error;
      return data[0].id;
    } catch (error) {
      console.log(error);
    } finally {
      set({ createEventStatus: false });
    }
  },

  editEvent: async (input: any) => {
    try {
      set({ editEventStatus: true });
      const { data, error } = await supabase
        .from('Events')
        .update({ ...input })
        .eq('id', input.id)
        .select();
      if (error) throw error;
      return data[0].id;
    } catch (error) {
      console.log(error);
    } finally {
      set({ editEventStatus: false });
    }
  },

  getUserAttendingEvents: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('EventsAttendees')
        .select(`event_id (id, name, description, start_datetime, end_datetime, image)`)
        .eq('attendee_id', userId);
      if (error) throw error;
      set({ userAttendingEvents: data });
    } catch (error) {
      console.log(error);
    }
  },

  getUserHostingEvents: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('Events')
        .select(`id, name, description, start_datetime, end_datetime, image`)
        .eq('author', userId);
      if (error) throw error;
      set({ userHostingEvents: data });
    } catch (error) {
      console.log(error);
    }
  },
});
