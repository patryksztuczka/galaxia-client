import { create } from "zustand";

import { createEventSlice, IEventSlice } from "./slices/eventSlice";

export const useBoundStore = create<IEventSlice>()((...a) => ({
  ...createEventSlice(...a),
}));
