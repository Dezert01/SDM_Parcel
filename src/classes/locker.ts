import dayjs from "dayjs";
import { ParcelHistory } from "./parcelHistory";
import { Slot } from "./slot";
import { Parcel } from "./parcel";
import { RecordType } from "../enums/RecordType";
import { UserPanel } from "./userPanel";

export class Locker {
  readonly id: number;
  private address: string;
  private slots: Slot[];
  private historyRecord: ParcelHistory[];
  private incomingParcels: Parcel[];
  private userPanel: UserPanel;

  public constructor(
    id: number,
    address: string,
    slots: Slot[],
    historyRecord: ParcelHistory[],
  ) {
    this.id = id;
    this.address = address;
    this.slots = slots;
    this.historyRecord = historyRecord;
    this.incomingParcels = [];
    this.userPanel = new UserPanel(slots);
  }

  public changeLockerAddress(newAddress: string) {
    this.address = newAddress;
  }

  public getHistoryOfParcels() {
    const oneWeekAgo = dayjs().subtract(7, "day");

    const recentParcels = this.historyRecord.filter((parcelHistory) =>
      dayjs(parcelHistory.depositTime).isAfter(oneWeekAgo),
    );

    return recentParcels;
  }

  public getHistoryOfParcel(parcelId: number) {
    const parcelHistory = this.historyRecord.find(
      (parcelHistory) => parcelHistory.parcelId === parcelId,
    );
    return parcelHistory;
  }

  public getPlannedParcels() {
    return this.incomingParcels;
  }

  public moveToExternalStorage(parcel_id: number, place: string) {
    const parcel = this.slots
      .find((slot) => slot.getParcel()?.id === parcel_id)
      ?.getParcel();
    if (parcel) {
      parcel.updateRecord(
        new Date(),
        RecordType.PACKAGE_IN_EXTERNAL_STORAGE,
        place,
      );
    }
    return parcel;
  }

  public getAddress() {
    return this.address;
  }
}
