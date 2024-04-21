import { TLocker } from "./locker";
import { TTransitEvent } from "./transitEvent";
import { TUser } from "./user";

export type TParcel = {
  id: number;
  sender: TUser;
  recipient: TUser;
  senderLocker: TLocker;
  recipientLocker: TLocker;
  estimatedDelivery: number; // timestamp
  actualDelivery: number | undefined; // timestamp
  guaranteedDelivery: number; // timestamp
  actualPickup: number | undefined; // timestamp
  record: TTransitEvent[];
  size: "sm" | "md" | "lg";
};
