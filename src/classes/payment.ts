import { AdditionalServices } from "../enums/AdditionalServices";
import { Parcel } from "./parcel";

export class Payment {
  private cost: number;
  private additionalServices?: AdditionalServices[];
  private parcel: Parcel;

  public constructor(
    cost: number,
    parcel: Parcel,
    additionalServices?: AdditionalServices[],
  ) {
    this.cost = cost;
    this.parcel = parcel;
    this.additionalServices = additionalServices;
  }

  public calculateCost(): number {
    let totalCost = this.cost;
    if (this.additionalServices) {
      this.additionalServices.forEach((service) => {
        switch (service) {
          case AdditionalServices.FAST_DELIVERY:
            totalCost += 10;
            break;
          case AdditionalServices.DELIVERY_ON_WEEKENDS:
            totalCost += 5;
            break;
          case AdditionalServices.INSUCARNCE:
            totalCost += 20;
            break;
        }
      });
    }
    return totalCost;
  }

  public makePayment(): void {
    const result = this.parcel.setPaid();
    if (!result) {
      console.error("Payment failed");
      return;
    }
    console.log(`Payment of ${this.calculateCost()} was made`);
  }
}
