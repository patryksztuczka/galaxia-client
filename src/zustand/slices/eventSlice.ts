import { StateCreator } from "zustand";

import { supabase } from "../../supabaseClient";
import { Database } from "../../types/supabase";

export interface IEventSlice {
  events: Database["public"]["Tables"]["Event"]["Row"][] | undefined;
  getEventsStatus: boolean;
  getEvents: () => void;
}

export const createEventSlice: StateCreator<IEventSlice> = (set) => ({
  events: undefined,
  getEventsStatus: false,

  getEvents: async () => {
    try {
      set({ getEventsStatus: true });
      const { data, error } = await supabase
        .from("Event")
        .select("*")
        .order("start_datetime", { ascending: true });
      if (error) throw error;
      set({ events: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ getEventsStatus: false });
    }
  },
});
