import { Address } from "./address";
import { Slot } from "./slot";

export class Locker {
  public id: number;
  public address: Address;
  public slots: Slot[];
  // record: null; // TODO: define

  public constructor(
    id: number,
    address: Address,
    slots: Slot[],
    // record: null,
  ) {
    this.id = id;
    this.address = address;
    this.slots = slots;
  }

  public changeLockerAddress(newAddress: Address) {
    this.address = newAddress;
  }

  // todo: define record class
  // public getHistoryOfParcels() {
  //   return this.record;
  // }

  public getHistoryOfParcel(parcelId: number) {
    const slotWithParcel = this.slots.find(
      (slot) => slot.parcel && slot.parcel.id === parcelId,
    );
    if (slotWithParcel && slotWithParcel.parcel) {
      return slotWithParcel.parcel.record;
    } else {
      return undefined;
    }
  }

  // todo
  public getPlannedParcels() {}

  // todo
  public moveToExternalStorage(parcelId: number) {}
}
