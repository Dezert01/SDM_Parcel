import { TAddress } from "./address";

export type TTransitEvent = {
  date: number; // timestamp
  type: string;
  place: TAddress;
};
