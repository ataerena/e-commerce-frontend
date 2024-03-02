import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser })
}));

export default useUserStore;