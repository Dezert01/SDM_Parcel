import { TParcel } from "./parcel";

export type TSlot = {
  lockerId: number;
  size: "sm" | "md" | "lg";
  parcel: TParcel | undefined;
  isClosed: boolean;
};
