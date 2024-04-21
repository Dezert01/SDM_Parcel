import { Address } from "./address";
import { TransitEvent } from "./transitEvent";
import { User } from "./user";

export class Parcel {
  public id: number;
  public sender: User;
  public recipient: User;
  public estimatedDelivery: number; // timestamp
  public actualDelivery: number | undefined; // timestamp
  public guaranteedDelivery: number; // timestamp
  public actualPickup: number | undefined; // timestamp
  public record: TransitEvent[];
  public size: "sm" | "md" | "lg";

  public constructor(
    id: number,
    sender: User,
    recipient: User,
    estimatedDelivery: number,
    guaranteedDelivery: number,
    record: TransitEvent[],
    size: "sm" | "md" | "lg",
  ) {
    this.id = id;
    this.sender = sender;
    this.recipient = recipient;
    this.guaranteedDelivery = guaranteedDelivery;
    this.estimatedDelivery = estimatedDelivery;
    this.record = record;
    this.size = size;
  }

  public updateRecord(date: number, type: string, place: Address) {
    const newEvent = new TransitEvent(date, type, place);
    this.record.push(newEvent);
  }
  public updateRecipientLocker(lockerId: number) {
    // todo
  }
}
