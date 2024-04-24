import { Locker } from "../classes/locker";
import { mockSlots } from "./slots";

export const mockLockers: Locker[] = [
  new Locker(1, "Address 1", mockSlots, []),
  new Locker(2, "Address 2", mockSlots, []),
  new Locker(3, "Address 3", mockSlots, []),
];
