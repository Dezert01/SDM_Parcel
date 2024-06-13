import { ParcelSize } from "../enums/ParcelSize";
import { RecordType } from "../enums/RecordType";
import { Locker } from "./locker";
import { IObserver, ISubject } from "./observer";
import { TransitRecord } from "./transitRecord";
import { User } from "./user";
import dayjs from "dayjs";
import { Payment } from "./payment";

export class Parcel implements ISubject {
  readonly id: number;
  private readonly sender: User;
  private readonly recipient: User;
  private recipientLocker: Locker;
  private senderLocker: Locker;
  private estimatedDeliveryTime: Date;
  private actualDeliveryTime: Date | null;
  private guaranteedDeliveryTime: Date;
  private actualPickupTime: Date | null;
  private recordOfTransit: TransitRecord[];
  readonly parcelSize: ParcelSize;
  private isPaidFor: boolean;
  private payment: Payment | null;
  private observers: IObserver[];

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
    this.observers = [];
    this.payment = null;
  }

  public addObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  public addPayment(payment: Payment): void {
    this.payment = payment;
  }

  public removeObserver(observer: IObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  public notifyObservers(notif: string): void {
    for (const observer of this.observers) {
      observer.update(this, notif);
    }
  }

  updateRecord(date: Date, type: RecordType, place: string | null): void {
    this.recordOfTransit.push(new TransitRecord(date, type, place));
    this.notifyObservers(`Parcel ${this.id} has been ${type} at ${place}`);
  }

  updateSenderLocker(locker: Locker): void {
    this.senderLocker = locker;
    this.notifyObservers(
      `Parcel ${this.id} has been sent from different locker ${locker.id}`,
    );
  }

  updateRecipentLocker(locker: Locker): void {
    this.recipientLocker = locker;
    this.notifyObservers(
      `Parcel ${this.id} has been rerouted to locker ${locker.id}`,
    );
  }

  updateGuaranteedDeliveryTime(): void {
    this.guaranteedDeliveryTime = dayjs(this.guaranteedDeliveryTime)
      .add(2, "day")
      .toDate();
    this.notifyObservers(
      `Parcel ${this.id} has a new guaranteed delivery time of ${this.guaranteedDeliveryTime}`,
    );
  }

  getTransitRecords(): TransitRecord[] {
    return this.recordOfTransit;
  }

  getGuaranteedDeliveryTime(): Date {
    return this.guaranteedDeliveryTime;
  }

  getEstimatedDeliveryTime(): Date {
    return this.estimatedDeliveryTime;
  }

  getActualDeliveryTime(): Date | null {
    return this.actualDeliveryTime;
  }

  getActualPickupTime(): Date | null {
    return this.actualPickupTime;
  }

  getPayment(): Payment | null {
    return this.payment;
  }

  getSenderLocker(): Locker {
    return this.senderLocker;
  }

  setPaid(): boolean {
    this.isPaidFor = true;
    this.notifyObservers(`Parcel ${this.id} has been paid for`);
    return this.isPaidFor;
  }

  setActualDeliveryTime(date: Date): void {
    this.actualDeliveryTime = date;
    this.notifyObservers(
      `Parcel ${this.id} has been delivered at ${this.recipientLocker.id} by ${this.actualDeliveryTime}`,
    );
  }

  setActualPickupTime(date: Date): void {
    this.actualPickupTime = date;
    this.notifyObservers(
      `Parcel ${this.id} has been picked up at ${this.senderLocker.id} by ${this.actualPickupTime}`,
    );
  }

  public getSender(): User {
    return this.sender;
  }

  public getRecipient(): User {
    return this.recipient;
  }

  public getSize(): ParcelSize {
    return this.parcelSize;
  }

  public getPaidStatus(): boolean {
    return this.isPaidFor;
  }

  public getParcelDetails() {
    return {
      id: this.id,
      sender: this.sender,
      recipient: this.recipient,
      recipientLocker: this.recipientLocker,
      senderLocker: this.senderLocker,
      estimatedDeliveryTime: this.estimatedDeliveryTime,
      guaranteedDeliveryTime: this.guaranteedDeliveryTime,
      parcelSize: this.parcelSize,
      isPaidFor: this.isPaidFor,
      actualDeliveryTime: this.actualDeliveryTime,
      actualPickupTime: this.actualPickupTime,
      recordOfTransit: this.recordOfTransit,
      payment: this.getPayment(),
    };
  }
}
