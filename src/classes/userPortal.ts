import { AdditionalServices } from "@/enums/AdditionalServices";
import { ParcelSize } from "../enums/ParcelSize";
import { RecordType } from "../enums/RecordType";
import { Locker } from "./locker";
import { Parcel } from "./parcel";
import { Payment } from "./payment";
import { CStorage } from "./storage";
import { User } from "./user";
import dayjs from "dayjs";

export class UserPortal {
  private static instance: UserPortal;

  private lockers: Locker[];
  private parcels: Parcel[];
  private users: User[];
  private storages: CStorage[];

  private constructor(
    lockers: Locker[],
    parcels: Parcel[],
    users: User[],
    storages: CStorage[],
  ) {
    this.lockers = lockers;
    this.parcels = parcels;
    this.users = users;
    this.storages = storages;
  }

  public static getInstance(
    lockers: Locker[],
    parcels: Parcel[],
    users: User[],
    storages: CStorage[],
  ): UserPortal {
    if (!UserPortal.instance) {
      UserPortal.instance = new UserPortal(lockers, parcels, users, storages);
    }
    return UserPortal.instance;
  }

  public sendNotification(
    userId: number,
    parcelId: number,
    notificationText: string,
  ): void {
    const user = this.users.find((user) => user.id === userId);
    const parcel = this.parcels.find((parcel) => parcel.id === parcelId);
    if (!user || !parcel) {
      throw new Error("User or parcel not found");
    }
    console.log(
      `Sending notification to ${user.name} about parcel ${parcel.id} with text: ${notificationText}`,
    );
  }

  public rerouteParcel(parcelId: number, locker: Locker): void {
    const parcel = this.parcels.find((parcel) => parcel.id === parcelId);
    if (!parcel) {
      throw new Error("Parcel not found");
    }
    parcel.updateRecipentLocker(locker);
    console.log(`Rerouting parcel ${parcel.id} to locker ${locker.id}`);
  }

  public registerParcel(
    userId: number,
    recipientId: number,
    recipientLockerId: number,
    senderLockerId: number,
    size: ParcelSize,
    additionalServices?: AdditionalServices[],
  ): void {
    const parcelId =
      this.parcels.length > 0
        ? Math.max(...this.parcels.map((parcel) => parcel.id)) + 1
        : 1;
    const sender = this.users.find((user) => user.id === userId);
    const recipient = this.users.find((user) => user.id === recipientId);
    const senderLocker = this.lockers.find(
      (locker) => locker.id === senderLockerId,
    );
    const recipientLocker = this.lockers.find(
      (locker) => locker.id === recipientLockerId,
    );
    if (!sender || !recipient || !senderLocker || !recipientLocker) {
      console.log(sender, recipient, senderLocker, recipientLocker);
      throw new Error("User or locker not found");
    }
    const parcel = new Parcel(
      parcelId,
      sender,
      recipient,
      recipientLocker,
      senderLocker,
      dayjs().add(2, "day").toDate(),
      dayjs().add(5, "day").toDate(),
      size,
    );
    const payment = new Payment(parcel, additionalServices);
    sender.addParcelToAccount(parcel, true);
    recipient.addParcelToAccount(parcel, false);
    parcel.updateRecipentLocker(recipientLocker);
    parcel.updateRecord(new Date(), RecordType.PACKAGE_REGISTERED, null);
    parcel.addObserver(sender);
    parcel.addObserver(recipient);
    parcel.addPayment(payment);
    this.parcels.push(parcel);
  }

  public makePayment(parcelId: number): void {
    const parcel = this.parcels.find((parcel) => parcel.id === parcelId);
    if (!parcel) {
      throw new Error("Parcel not found");
    }
    parcel.updateRecord(new Date(), RecordType.PACKAGE_PAID_FOR, null);
    parcel.setPaid();
    console.log("Payment made");
  }

  public trackParcel(parcelId: number): void {
    const parcel = this.parcels.find((parcel) => parcel.id === parcelId);
    if (!parcel) {
      throw new Error("Parcel not found");
    }
    console.log(`Parcel ${parcel.id} is at ${parcel.getTransitRecords()[0]}`);
  }

  public extendRetrievalDate(parcelId: number): void {
    const parcel = this.parcels.find((parcel) => parcel.id === parcelId);
    if (!parcel) {
      throw new Error("Parcel not found");
    }
    parcel.updateGuaranteedDeliveryTime();
    console.log(
      `Extended retrieval date for parcel ${parcel.id} to ${parcel.getGuaranteedDeliveryTime()}`,
    );
  }

  public registerUser(name: string, password: string, phone: number): void {
    const highestId = this.users.reduce((maxId, user) => {
      return user.id > maxId ? user.id : maxId;
    }, 0);
    const id = highestId ? highestId + 1 : 1;
    const user = new User(name, id, password, phone);
    this.users.push(user);
  }

  public getUserByName(name: string): User | undefined {
    return this.users.find((user) => user.name === name);
  }

  public getUserByPhone(phone: number): User | undefined {
    return this.users.find((user) => user.phone === phone);
  }

  public getLockers(): Locker[] {
    return this.lockers;
  }

  public getParcels(): Parcel[] {
    return this.parcels;
  }
}
