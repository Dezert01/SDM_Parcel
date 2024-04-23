import { ParcelSize } from "../enums/ParcelSize";
export type TMockParcel = {
  senderId: number;
  recipientId: number;
  recipientLockerId: number;
  senderLockerId: number;
  size: ParcelSize;
};

export const mockParcels: TMockParcel[] = [
  {
    senderId: 1,
    recipientId: 2,
    recipientLockerId: 1,
    senderLockerId: 2,
    size: ParcelSize.SMALL,
  },
  {
    senderId: 2,
    recipientId: 1,
    recipientLockerId: 2,
    senderLockerId: 1,
    size: ParcelSize.MEDIUM,
  },
  {
    senderId: 1,
    recipientId: 2,
    recipientLockerId: 1,
    senderLockerId: 2,
    size: ParcelSize.LARGE,
  },
  {
    senderId: 2,
    recipientId: 1,
    recipientLockerId: 2,
    senderLockerId: 1,
    size: ParcelSize.SMALL,
  },
  {
    senderId: 1,
    recipientId: 2,
    recipientLockerId: 1,
    senderLockerId: 2,
    size: ParcelSize.MEDIUM,
  },
  {
    senderId: 2,
    recipientId: 1,
    recipientLockerId: 2,
    senderLockerId: 1,
    size: ParcelSize.LARGE,
  },
  {
    senderId: 1,
    recipientId: 2,
    recipientLockerId: 1,
    senderLockerId: 2,
    size: ParcelSize.SMALL,
  },
  {
    senderId: 2,
    recipientId: 1,
    recipientLockerId: 2,
    senderLockerId: 1,
    size: ParcelSize.MEDIUM,
  },
  {
    senderId: 1,
    recipientId: 2,
    recipientLockerId: 1,
    senderLockerId: 2,
    size: ParcelSize.LARGE,
  },
  {
    senderId: 2,
    recipientId: 1,
    recipientLockerId: 2,
    senderLockerId: 1,
    size: ParcelSize.SMALL,
  },
  {
    senderId: 1,
    recipientId: 2,
    recipientLockerId: 1,
    senderLockerId: 2,
    size: ParcelSize.MEDIUM,
  },
  {
    senderId: 2,
    recipientId: 1,
    recipientLockerId: 2,
    senderLockerId: 1,
    size: ParcelSize.LARGE,
  },
];
