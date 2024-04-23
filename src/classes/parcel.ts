import { ParcelSize } from "../enums/ParcelSize";
import { RecordType } from "../enums/RecordType";
import { Locker } from "./locker";
import { TransitRecord } from "./transitRecord";
import { User } from "./user";
import dayjs from "dayjs";

export class Parcel {
  readonly id: number;
  private readonly sender: User;
  private readonly recipient: User;
  private recipientLocker: Locker;
  private readonly senderLocker: Locker;
  private estimatedDeliveryTime: Date;
  private actualDeliveryTime: Date | null;
  private guaranteedDeliveryTime: Date;
  private actualPickupTime: Date | null;
  private recordOfTransit: TransitRecord[];
  readonly parcelSize: ParcelSize;
  private isPaidFor: boolean;

  public constructor(
    id: number,
    sender: User,
    recipient: User,
    recpientLocker: Locker,
    senderLocker: Locker,
    estimatedDeliveryTime: Date,
    guaranteedDeliveryTime: Date,
    parcelSize: ParcelSize,
  ) {
    this.id = id;
    this.sender = sender;
    this.recipient = recipient;
    this.recipientLocker = recpientLocker;
    this.senderLocker = senderLocker;
    this.estimatedDeliveryTime = estimatedDeliveryTime;
    this.guaranteedDeliveryTime = guaranteedDeliveryTime;
    this.parcelSize = parcelSize;
    this.isPaidFor = false;
    this.actualDeliveryTime = null;
    this.actualPickupTime = null;
    this.recordOfTransit = [];
  }

  updateRecord(date: Date, type: RecordType, place: string | null): void {
    this.recordOfTransit.push(new TransitRecord(date, type, place));
  }

  updateRecipentLocker(locker: Locker): void {
    this.recipientLocker = locker;
  }

  updateGuaranteedDeliveryTime(): void {
    this.guaranteedDeliveryTime = dayjs(this.guaranteedDeliveryTime)
      .add(2, "day")
      .toDate();
  }

  getTransitRecords(): TransitRecord[] {
    return this.recordOfTransit;
  }

  getGuaranteedDelivery(): Date {
    return this.guaranteedDeliveryTime;
  }

  getEstimatedDelivery(): Date {
    return this.estimatedDeliveryTime;
  }

  setPaid(): boolean {
    this.isPaidFor = true;
    return this.isPaidFor;
  }

  setActualDeliveryTime(date: Date): void {
    this.actualDeliveryTime = date;
  }

  setActualPickupTime(date: Date): void {
    this.actualPickupTime = date;
  }

  public getSender(): User {
    return this.sender;
  }
  public getRecipient(): User {
    return this.recipient;
  }
}
