import { Parcel } from "./parcel";

export class User {
  public name: string;
  public id: number;
  public password: string;
  public phone: number;
  public sentParcels: Parcel[] | undefined;
  public receivedParcels: Parcel[] | undefined;

  public constructor(
    name: string,
    id: number,
    password: string,
    phone: number,
  ) {
    this.name = name;
    this.id = id;
    this.password = password;
    this.phone = phone;
  }
}
