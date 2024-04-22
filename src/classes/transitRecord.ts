import { RecordType } from "../enums/RecordType";

export class TransitRecord {
  public date: Date;
  public type: RecordType;
  public place: string;

  public constructor(date: Date, type: RecordType, place: string) {
    this.date = date;
    this.type = type;
    this.place = place;
  }
}
