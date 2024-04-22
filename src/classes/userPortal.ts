import { Locker } from "./locker";
import { Parcel } from "./parcel";
import { User } from "./user";
import dayjs from "dayjs";

export class UserPortal {
  public lockers: Locker[];
  public parcels: Parcel[];
  public users: User[];

  public constructor(lockers: Locker[], parcels: Parcel[], users: User[]) {
    this.lockers = lockers;
    this.parcels = parcels;
    this.users = users;
  }

  public sendNotification(
    userId: number,
    parcelId: number,
    notificationText: string,
  ) {
    const user = this.users.find((user) => user.id === userId);
    const parcel = this.parcels.find((parcel) => parcel.id === parcelId);
    if (!user || !parcel) {
      throw new Error("User or parcel not found");
    }
    console.log(
      `Sending notification to ${user.name} about parcel ${parcel.id} with text: ${notificationText}`,
    );
  }

  public rerouteParcel(parcelId: number, lockerId: number) {
    const parcel = this.parcels.find((parcel) => parcel.id === parcelId);
    if (!parcel) {
      throw new Error("Parcel not found");
    }
    parcel.updateRecipientLocker(lockerId);
    console.log(`Rerouting parcel ${parcel.id} to locker ${lockerId}`);
  }

  public registerParcel(
    userId: number,
    recipientId: number,
    lockerId: number,
    size: "sm" | "md" | "lg",
  ) {
    const parcelId =
      this.parcels.length > 0
        ? Math.max(...this.parcels.map((parcel) => parcel.id)) + 1
        : 1;
    const sender = this.users.find((user) => user.id === userId);
    const recipient = this.users.find((user) => user.id === recipientId);
    const locker = this.lockers.find((locker) => locker.id === lockerId);
    if (!sender || !recipient || !locker) {
      throw new Error("User or locker not found");
    }
    const parcel = new Parcel(
      parcelId,
      sender,
      recipient,
      dayjs().add(7, "day").toDate(),
      dayjs().add(10, "day").toDate(),
      [],
      size,
      lockerId,
    );
    parcel.updateRecipientLocker(lockerId);
    this.parcels.push(parcel);
  }
  public makePayment() {
    console.log("Payment made");
  }
  public trackParcel(parcelId: number) {
    const parcel = this.parcels.find((parcel) => parcel.id === parcelId);
    if (!parcel) {
      throw new Error("Parcel not found");
    }
    console.log(`Parcel ${parcel.id} is at ${parcel.record[0].place.city}`);
  }

  public extendRetrievalDate(parcelId: number) {
    const parcel = this.parcels.find((parcel) => parcel.id === parcelId);
    if (!parcel) {
      throw new Error("Parcel not found");
    }
    parcel.guaranteedDelivery = dayjs(parcel.guaranteedDelivery)
      .add(2, "day")
      .toDate();
    console.log(
      `Extended retrieval date for parcel ${parcel.id} to ${parcel.guaranteedDelivery}`,
    );
  }
}
