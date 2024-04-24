import { Locker } from "../classes/locker";
import { mockSlots } from "./slots";

export const mockLockers: Locker[] = [
  new Locker(1, "Address 1", mockSlots[0], []),
  new Locker(2, "Address 2", mockSlots[1], []),
  new Locker(3, "Address 3", mockSlots[2], []),
];
