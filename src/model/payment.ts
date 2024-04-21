import { TParcel } from "./parcel";

export type TPayment = {
  cost: number;
  additionalServices: string;
  parcel: TParcel;
};
