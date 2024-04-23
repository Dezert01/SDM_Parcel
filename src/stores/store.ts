import { create } from "zustand";
import { User } from "../classes/user";
import { MockUsers } from "../mock-data/users";
import { Locker } from "../classes/locker";
import { mockLockers } from "../mock-data/lockers";
import { Parcel } from "../classes/parcel";

export type SystemStore = {
  currentUser: string | undefined;
  setCurrentUser: (user: string | undefined) => void;
  users: User[];
  getUserByName: (name: string) => User | undefined;
  getUserByPhone: (phone: number) => User | undefined;
  addUser: (user: User) => void;
  lockers: Locker[];
  parcels: Parcel[];
  addParcel: (parcel: Parcel) => void;
};

export const useSystemStore = create<SystemStore>((set, get) => ({
  currentUser: undefined,
  users: MockUsers,
  lockers: mockLockers,
  parcels: [],
  getUserByName: (name: string) => {
    const user = get().users.find((el) => el.name === name);
    return user;
  },
  getUserByPhone: (phone: number) => {
    const user = get().users.find((el) => el.phone === phone);
    return user;
  },
  addUser: (user: User) => {
    set((state) => ({
      users: [...state.users, user],
    }));
  },
  setCurrentUser: (user: string | undefined) => {
    set(() => ({
      currentUser: user,
    }));
  },
  addParcel: (parcel: Parcel) => {
    set((state) => ({
      parcels: [...state.parcels, parcel],
    }));
  },
}));
