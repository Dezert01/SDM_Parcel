import { HistoryType } from "@/enums/HistoryType";

export class ParcelHistory {
  readonly parcelId: number;
  readonly time: Date;
  readonly event: HistoryType;

  public constructor(parcelId: number, time: Date, event: HistoryType) {
    this.parcelId = parcelId;
    this.time = time;
    this.event = event;
  }
}
