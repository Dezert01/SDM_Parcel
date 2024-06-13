import { RecordType } from "@/enums/RecordType";
import { Parcel } from "./parcel";
import { Slot } from "./slot";
import { ParcelSize } from "@/enums/ParcelSize";

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
    const availableSlots = this.slots.filter(
      (slot) => slot.getParcel() === null,
    );

    availableSlots.sort((a, b) => {
      const sizeOrder = Object.values(ParcelSize);
      return sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size);
    });

    for (const slot of availableSlots) {
      if (slot.size === parcel.parcelSize) {
        return slot;
      }

      const sizeOrder = Object.values(ParcelSize);
      const slotIndex = sizeOrder.indexOf(slot.size);
      const parcelIndex = sizeOrder.indexOf(parcel.parcelSize);

      if (slotIndex > parcelIndex) {
        return slot;
      }
    }

    return null;
  }
}
