import { create } from "zustand";
import { Locker } from "../classes/locker";
import { mockLockers } from "../mock-data/lockers";

export type LockerStore = {
  lockers: Locker[];
  getLockerById: (id: number) => Locker | undefined;
};

export const useLockerStore = create<LockerStore>((set, get) => ({
  lockers: mockLockers,
  getLockerById: (id: number) => {
    const locker = get().lockers.find((el) => el.id === id);
    return locker;
  },
}));
