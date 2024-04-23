import { create } from "zustand";

export type SystemStore = {
  currentUser: string | undefined;
  setCurrentUser: (user: string | undefined) => void;
};

export const useSystemStore = create<SystemStore>((set, get) => ({
  currentUser: undefined,

  setCurrentUser: (user: string | undefined) => {
    set(() => ({
      currentUser: user,
    }));
  },
}));
