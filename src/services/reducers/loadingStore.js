import { create } from 'zustand';

const useLoadingStore = create((set) => ({
  loading: false,
  setLoading: (newLoading) => set({ loading: newLoading })
}));

const durations = {
  short: 200,
  medium: 500,
  long: 800
}

export {
  useLoadingStore,
  durations
};