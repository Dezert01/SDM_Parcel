import { Parcel } from "./parcel";
import { Slot } from "./slot";

export class UserPanel {
  private slots: Slot[];

  constructor(slots: Slot[]) {
    this.slots = slots;
  }

  public sendParcel(parcel: Parcel): boolean {
    const slot = this.indicateSlot(parcel);
    if (slot) {
      slot.setParcel(parcel);
      return true;
    }
    return false;
  }

  public retrieveParcel(parcelId: number): Parcel | null {
    const slot = this.slots.find((slot) => slot.getParcel()?.id === parcelId);
    if (slot) {
      const parcel = slot.getParcel();
      slot.setParcel(null);
      return parcel;
    }
    return null;
  }

  public indicateSlot(parcel: Parcel): Slot | null {
    const slot = this.slots.find(
      (slot) => slot.getParcel() === null && slot.size === parcel.parcelSize,
    );
    if (slot) {
      return slot;
    }
    return null;
  }
}
