export class Address {
  public country: string;
  public city: string;
  public postcode: string;
  public street: string;
  public partment?: number;

  public constructor(
    country: string,
    city: string,
    postcode: string,
    street: string,
    apartment?: number,
  ) {
    this.country = country;
    this.city = city;
    this.postcode = postcode;
    this.street = street;
  }
}
