import { TParcel } from "./parcel";

export type TUser = {
  id: number;
  username: string;
  password: string;
  phone: number;
  sentParcels: TParcel[];
  receivedParcels: TParcel[];
};
