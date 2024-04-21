import { Address } from "./address";

export class TransitEvent {
  public date: number; // timestamp
  public type: string;
  public place: Address;

  public constructor(date: number, type: string, place: Address) {
    this.date = date;
    this.type = type;
    this.place = place;
  }
}
