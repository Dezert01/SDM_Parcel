import { Slot } from "@/classes/slot";
import { ParcelSize } from "@/enums/ParcelSize";

export const mockSlots: Slot[][] = [
  [
    new Slot(1, ParcelSize.SMALL, null),
    new Slot(2, ParcelSize.MEDIUM, null),
    new Slot(3, ParcelSize.LARGE, null),
  ],
  [
    new Slot(4, ParcelSize.SMALL, null),
    new Slot(5, ParcelSize.MEDIUM, null),
    new Slot(6, ParcelSize.LARGE, null),
  ],
  [
    new Slot(7, ParcelSize.SMALL, null),
    new Slot(8, ParcelSize.MEDIUM, null),
    new Slot(9, ParcelSize.LARGE, null),
  ],
];
