import { Parcel } from "./parcel";

export class Payment {
  public cost: number;
  public additionalServices: string;
  public parcel: Parcel;

  public constructor(cost: number, additionalServices: string, parcel: Parcel) {
    this.cost = cost;
    this.additionalServices = additionalServices;
    this.parcel = parcel;
  }

  // todo
  public calculateCost(): number {
    return this.cost;
  }
}
