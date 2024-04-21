import { TAddress } from "./address";
import { TSlot } from "./slot";

export type TLocker = {
  id: number;
  address: TAddress;
  slots: TSlot[];
  record: null; // TODO: define
};
