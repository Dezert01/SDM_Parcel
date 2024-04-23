import { Parcel } from "../classes/parcel";
import { useLockerStore } from "../stores/lockerStore";
import { ParcelSize } from "../enums/ParcelSize";
import { useUserStore } from "../stores/userStore";

export const useMockParcels = (): Parcel[] => {
  const userStore = useUserStore();
  const lockerStore = useLockerStore();
  const MockParcels: Parcel[] = [
    new Parcel(
      1,
      userStore.getUserByPhone(123)!,
      userStore.getUserByPhone(321)!,
      lockerStore.getLockerById(1)!,
      lockerStore.getLockerById(2)!,
      new Date("2024-05-01T11:00:00"),
      new Date("2024-05-05T12:30:00"),
      ParcelSize.MEDIUM,
    ),
    new Parcel(
      2,
      userStore.getUserByPhone(321)!,
      userStore.getUserByPhone(123)!,
      lockerStore.getLockerById(3)!,
      lockerStore.getLockerById(1)!,
      new Date("2024-06-01T13:30:00"),
      new Date("2024-07-02T12:00:00"),
      ParcelSize.SMALL,
    ),
  ];
  return MockParcels;
};
