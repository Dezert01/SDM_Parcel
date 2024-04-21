import { Address } from "./address";
import { Parcel } from "./parcel";

export class Storage {
  public id: number;
  public address: Address;
  public parcels: Parcel[];

  public constructor(id: number, address: Address, parcels: Parcel[]) {
    this.id = id;
    this.address = address;
    this.parcels = parcels;
  }

  public retrieveParcel(parcelId: number): Parcel | undefined {
    return this.parcels.find((parcel) => parcel.id === parcelId);
  }
}
