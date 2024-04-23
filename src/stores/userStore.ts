import { create } from "zustand";
import { User } from "../classes/user";
import { MockUsers } from "../mock-data/users";

export type UserStore = {
  users: User[];
  getUserByName: (name: string) => User | undefined;
  getUserByPhone: (phone: number) => User | undefined;
  addUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set, get) => ({
  users: MockUsers,
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
}));
