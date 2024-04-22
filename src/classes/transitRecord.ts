import { RecordType } from "../enums/RecordType";

export class TransitRecord {
  public date: Date;
  public type: RecordType;
  public place: string | null;

  public constructor(date: Date, type: RecordType, place: string | null) {
    this.date = date;
    this.type = type;
    this.place = place;
  }
}
