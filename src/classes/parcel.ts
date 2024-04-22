import { Address } from "./address";
import { TransitEvent } from "./transitEvent";
import { User } from "./user";

export class Parcel {
  public id: number;
  public sender: User;
  public recipient: User;
  public estimatedDelivery: Date; // timestamp
  public actualDelivery: Date | undefined; // timestamp
  public guaranteedDelivery: Date; // timestamp
  public actualPickup: Date | undefined; // timestamp
  public record: TransitEvent[];
  public size: "sm" | "md" | "lg";
  public recipientLockerId: number;

  public constructor(
    id: number,
    sender: User,
    recipient: User,
    estimatedDelivery: Date,
    guaranteedDelivery: Date,
    record: TransitEvent[],
    size: "sm" | "md" | "lg",
    recipientLockerId: number,
  ) {
    this.id = id;
    this.sender = sender;
    this.recipient = recipient;
    this.guaranteedDelivery = guaranteedDelivery;
    this.estimatedDelivery = estimatedDelivery;
    this.record = record;
    this.size = size;
    this.recipientLockerId = recipientLockerId;
  }

  public updateRecord(date: number, type: string, place: Address) {
    const newEvent = new TransitEvent(date, type, place);
    this.record.push(newEvent);
  }
  public updateRecipientLocker(lockerId: number) {
    this.recipientLockerId = lockerId;
    console.log(`Parcel ${this.id} recipient locker updated to ${lockerId}`);
  }
}
