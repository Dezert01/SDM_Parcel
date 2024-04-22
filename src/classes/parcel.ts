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
  private recpientLocker: Locker;
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
    this.recpientLocker = recpientLocker;
    this.senderLocker = senderLocker;
    this.estimatedDeliveryTime = estimatedDeliveryTime;
    this.guaranteedDeliveryTime = guaranteedDeliveryTime;
    this.parcelSize = parcelSize;
    this.isPaidFor = false;
    this.actualDeliveryTime = null;
    this.actualPickupTime = null;
    this.recordOfTransit = [];
  }

  updateRecord(date: Date, type: RecordType, place: string) {
    this.recordOfTransit.push(new TransitRecord(date, type, place));
  }

  updateRecipentLocker(locker: Locker) {
    this.recpientLocker = locker;
  }

  updateGuaranteedDeliveryTime() {
    this.guaranteedDeliveryTime = dayjs(this.guaranteedDeliveryTime)
      .add(2, "day")
      .toDate();
  }

  getTransitRecords() {
    return this.recordOfTransit;
  }

  getGuaranteedDelivery() {
    return this.guaranteedDeliveryTime;
  }

  getEstimatedDelivery() {
    return this.estimatedDeliveryTime;
  }

  setPaid() {
    this.isPaidFor = true;
    return true;
  }
}
