import dayjs from "dayjs";
import { ParcelHistory } from "./parcelHistory";
import { Slot } from "./slot";
import { Parcel } from "./parcel";
import { RecordType } from "../enums/RecordType";
import { UserPanel } from "./userPanel";

export class Locker {
  readonly id: number;
  public address: string;
  private slots: Slot[];
  private historyRecord: ParcelHistory[];
  private incomingParcels: Parcel[];
  public userPanel: UserPanel;

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
    this.userPanel = new UserPanel(slots, address, id);
  }

  public changeLockerAddress(newAddress: string): void {
    this.address = newAddress;
  }

  public getHistoryOfParcels(): ParcelHistory[] {
    const oneWeekAgo = dayjs().subtract(7, "day");
    const recentParcels = this.historyRecord.filter((parcelHistory) =>
      dayjs(parcelHistory.time).isAfter(oneWeekAgo),
    );

    return recentParcels;
  }

  public getHistoryOfParcel(parcelId: number): ParcelHistory[] {
    const parcelHistory = this.historyRecord.filter(
      (parcelHistory) => parcelHistory.parcelId === parcelId,
    );
    return parcelHistory;
  }

  public getPlannedParcels(): Parcel[] {
    return this.incomingParcels;
  }

  public addToHistory(parcelHistory: ParcelHistory): void {
    this.historyRecord.push(parcelHistory);
  }

  public moveToExternalStorage(
    parcel_id: number,
    place: string,
  ): Parcel | null {
    const parcel =
      this.slots
        .find((slot) => slot.getParcel()?.id === parcel_id)
        ?.getParcel() || null;
    if (parcel) {
      parcel.updateRecord(
        new Date(),
        RecordType.PACKAGE_IN_EXTERNAL_STORAGE,
        place,
      );
    }
    return parcel;
  }

  public getAddress(): string {
    return this.address;
  }

  public getSlots(): Slot[] {
    return this.slots;
  }

  public extendLockerSlots(newSlots: Slot[]): void {
    this.slots = this.slots.concat(newSlots);
  }
}

export class LockerBuilder {
  private id: number;
  private address: string;
  private slots: Slot[];
  private historyRecord: ParcelHistory[];

  constructor() {
    this.id = 0;
    this.address = "";
    this.slots = [];
    this.historyRecord = [];
  }

  setId(id: number): LockerBuilder {
    this.id = id;
    return this;
  }

  setAddress(address: string): LockerBuilder {
    this.address = address;
    return this;
  }

  setSlots(slots: Slot[]): LockerBuilder {
    this.slots = slots;
    return this;
  }

  setHistoryRecord(historyRecord: ParcelHistory[]): LockerBuilder {
    this.historyRecord = historyRecord;
    return this;
  }

  build(): Locker {
    return new Locker(this.id, this.address, this.slots, this.historyRecord);
  }
}
