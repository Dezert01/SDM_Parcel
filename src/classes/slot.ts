import { ParcelSize } from "../enums/ParcelSize";
import { Parcel } from "./parcel";

export class Slot {
  readonly id: number;
  readonly size: ParcelSize;
  private parcel: Parcel | null;
  private isClosed: boolean;

  public constructor(id: number, size: ParcelSize, parcel: Parcel | null) {
    this.id = id;
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

  public getParcel() {
    return this.parcel;
  }

  public setParcel(parcel: Parcel | null) {
    this.parcel = parcel;
  }
}
