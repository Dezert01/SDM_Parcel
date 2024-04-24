import { RecordType } from "@/enums/RecordType";
import { Parcel } from "./parcel";
import { Slot } from "./slot";

export class UserPanel {
  private slots: Slot[];
  private address: string;

  constructor(slots: Slot[], address: string) {
    this.slots = slots;
    this.address = address;
  }

  public sendParcel(parcel: Parcel): boolean {
    const slot = this.indicateSlot(parcel);
    if (slot) {
      slot.setParcel(parcel);
      parcel.updateRecord(
        new Date(),
        RecordType.PACKAGE_IN_SENDER_LOCKER,
        this.address,
      );
      return true;
    }
    console.log("No available slots");
    return false;
  }

  public deliverParcel(parcel: Parcel): boolean {
    const slot = this.indicateSlot(parcel);
    if (slot) {
      slot.setParcel(parcel);
      const date = new Date();
      parcel.updateRecord(
        date,
        RecordType.PACKAGE_IN_RECEIVER_LOCKER,
        this.address,
      );
      parcel.setActualDeliveryTime(date);
      return true;
    }
    console.log("No available slots");
    return false;
  }

  public retrieveParcel(parcelId: number, byCourier: boolean): Parcel | null {
    const slot = this.slots.find((slot) => slot.getParcel()?.id === parcelId);
    if (slot) {
      const parcel = slot.getParcel();
      slot.setParcel(null);
      if (byCourier) {
        parcel?.updateRecord(
          new Date(),
          RecordType.PACKAGE_IN_TRANSIT,
          this.address,
        );
      } else {
        const date = new Date();
        parcel?.updateRecord(date, RecordType.PACKAGE_RECEIVED, this.address);
        parcel?.setActualPickupTime(date);
      }
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
