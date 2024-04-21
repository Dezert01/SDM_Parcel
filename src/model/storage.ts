import { TAddress } from "./address";
import { TParcel } from "./parcel";

export type Storage = {
  id: number;
  address: TAddress;
  parcels: TParcel[];
};
