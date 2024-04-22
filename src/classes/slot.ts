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

  public openSlot(): void {
    this.isClosed = false;
  }

  public closeSlot(): void {
    this.isClosed = true;
  }

  public getParcel(): Parcel | null {
    return this.parcel;
  }

  public setParcel(parcel: Parcel | null) {
    this.parcel = parcel;
  }
}
