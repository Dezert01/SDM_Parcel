import { Parcel } from "./parcel";

export class Slot {
  public lockerId: number;
  public size: "sm" | "md" | "lg";
  public parcel: Parcel | undefined;
  public isClosed: boolean;

  public constructor(
    lockerId: number,
    size: "sm" | "md" | "lg",
    parcel: Parcel | undefined,
  ) {
    this.lockerId = lockerId;
    this.size = size;
    this.parcel = parcel;
    this.isClosed = false;
  }

  public openSlot() {
    this.isClosed = false;
  }

  public closeSlot() {
    this.isClosed = true;
  }
}
