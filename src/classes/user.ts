import { Parcel } from "./parcel";
import { TransitRecord } from "./transitRecord";

export class User {
  readonly id: number;
  readonly name: string;
  readonly password: string;
  readonly phone: number;
  private sentParcels: Parcel[];
  private receivedParcels: Parcel[];

  public constructor(
    name: string,
    id: number,
    password: string,
    phone: number,
  ) {
    this.name = name;
    this.id = id;
    this.password = password;
    this.phone = phone;
    this.sentParcels = [];
    this.receivedParcels = [];
  }

  public getParcelTracking(parcelId: number): TransitRecord[] | null {
    const sentParcel = this.sentParcels.find(
      (parcel) => parcel.id === parcelId,
    );
    const receivedParcel = this.receivedParcels.find(
      (parcel) => parcel.id === parcelId,
    );
    if (sentParcel) {
      return sentParcel.getTransitRecords();
    } else if (receivedParcel) {
      return receivedParcel.getTransitRecords();
    } else {
      return null;
    }
  }

  public addParcelToAccount(parcel: Parcel, sentByUser: boolean): void {
    if (sentByUser) {
      this.sentParcels.push(parcel);
    } else {
      this.receivedParcels.push(parcel);
    }
  }
}
