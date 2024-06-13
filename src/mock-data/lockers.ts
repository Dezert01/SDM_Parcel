import { Locker, LockerBuilder } from "../classes/locker";
import { mockSlots } from "./slots";

export const mockLockers: Locker[] = [
  new LockerBuilder()
    .setId(1)
    .setAddress("Address 1")
    .setSlots(mockSlots[0])
    .setHistoryRecord([])
    .build(),
  new LockerBuilder()
    .setId(2)
    .setAddress("Address 2")
    .setSlots(mockSlots[1])
    .setHistoryRecord([])
    .build(),
  new LockerBuilder()
    .setId(3)
    .setAddress("Address 3")
    .setSlots(mockSlots[2])
    .setHistoryRecord([])
    .build(),
];
