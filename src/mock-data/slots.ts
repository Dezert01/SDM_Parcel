import { Slot } from "@/classes/slot";
import { ParcelSize } from "@/enums/ParcelSize";

export const mockSlots: Slot[] = [
  new Slot(1, ParcelSize.SMALL, null),
  new Slot(2, ParcelSize.MEDIUM, null),
  new Slot(3, ParcelSize.LARGE, null),
];
