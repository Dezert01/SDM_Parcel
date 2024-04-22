import { RecordType } from "../enums/RecordType";
import { StorageType } from "../enums/StorageType";
import { Parcel } from "./parcel";

export class Storage {
  readonly id: number;
  private address: string;
  private parcels: Parcel[];
  readonly type: StorageType;

  public constructor(
    id: number,
    address: string,
    parcels: Parcel[],
    type: StorageType,
  ) {
    this.id = id;
    this.address = address;
    this.parcels = parcels;
    this.type = type;
  }

  public retrieveParcel(parcelId: number): Parcel | null {
    const parcel = this.parcels.find((parcel) => parcel.id === parcelId);
    if (parcel) {
      this.parcels = this.parcels.filter((parcel) => parcel.id !== parcelId);
      return parcel;
    }
    return null;
  }

  public storeParcel(parcel: Parcel) {
    if (this.type === StorageType.EXTERNAL_STORAGE) {
      parcel.updateRecord(
        new Date(),
        RecordType.PACKAGE_IN_EXTERNAL_STORAGE,
        this.address,
      );
    } else if (this.type === StorageType.INTERMEDIATE_STORAGE) {
      parcel.updateRecord(
        new Date(),
        RecordType.PACKAGE_IN_INTERMEDITE_LOCKER,
        this.address,
      );
    }
    this.parcels.push(parcel);
  }
}
