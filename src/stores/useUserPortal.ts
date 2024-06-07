import { UserPortal } from "../classes/userPortal";
import { mockLockers } from "../mock-data/lockers";
import { mockParcels } from "../mock-data/parcels";
import { mockStorages } from "../mock-data/storages";
import { MockUsers } from "../mock-data/users";

export const useUserPortal = UserPortal.getInstance(
  mockLockers,
  [],
  [],
  mockStorages,
);

MockUsers.forEach((user) => {
  useUserPortal.registerUser(user.name, user.password, user.phone);
});

mockParcels.forEach((parcel) => {
  useUserPortal.registerParcel(
    parcel.senderId,
    parcel.recipientId,
    parcel.recipientLockerId,
    parcel.senderLockerId,
    parcel.size,
  );
});
