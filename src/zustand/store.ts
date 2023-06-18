import { create } from 'zustand';

import { createEventSlice } from './slices/eventSlice';
import { createUserSlice } from './slices/userSlice';

export const useBoundStore = create<
  ReturnType<typeof createEventSlice> & ReturnType<typeof createUserSlice>
>()((...a) => ({
  ...createEventSlice(...a),
  ...createUserSlice(...a),
}));
