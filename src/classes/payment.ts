import { ParcelSize } from "@/enums/ParcelSize";
import { AdditionalServices } from "../enums/AdditionalServices";
import { Parcel } from "./parcel";

interface CostStrategy {
  setNext(strategy: CostStrategy): CostStrategy;
  calculateCost(baseCost: number): number;
}

abstract class AbstractCostStrategy implements CostStrategy {
  private nextStrategy: CostStrategy | null = null;

  public setNext(strategy: CostStrategy): CostStrategy {
    this.nextStrategy = strategy;
    return strategy;
  }

  public calculateCost(baseCost: number): number {
    if (this.nextStrategy) {
      return this.nextStrategy.calculateCost(this.addCost(baseCost));
    }

    return this.addCost(baseCost);
  }

  protected abstract addCost(baseCost: number): number;
}

class FastDeliveryCostStrategy extends AbstractCostStrategy {
  protected addCost(baseCost: number): number {
    return baseCost + 10;
  }
}

class DeliveryOnWeekendsCostStrategy extends AbstractCostStrategy {
  protected addCost(baseCost: number): number {
    return baseCost + 5;
  }
}

class InsuranceCostStrategy extends AbstractCostStrategy {
  protected addCost(baseCost: number): number {
    return baseCost + 20;
  }
}

class SmallParcelCostStrategy extends AbstractCostStrategy {
  protected addCost(baseCost: number): number {
    return baseCost + 5;
  }
}

class MediumParcelCostStrategy extends AbstractCostStrategy {
  protected addCost(baseCost: number): number {
    return baseCost + 10;
  }
}

class LargeParcelCostStrategy extends AbstractCostStrategy {
  protected addCost(baseCost: number): number {
    return baseCost + 15;
  }
}

export class Payment {
  private cost: number;
  private costStrategy: CostStrategy | null = null;
  private parcel: Parcel;

  public constructor(
    parcel: Parcel,
    additionalServices?: AdditionalServices[],
  ) {
    this.cost = this.setParcelSizeCostStrategy(parcel.getSize());
    this.parcel = parcel;

    if (additionalServices) {
      additionalServices.forEach((service, index) => {
        switch (service) {
          case AdditionalServices.FAST_DELIVERY:
            this.setStrategy(new FastDeliveryCostStrategy(), index);
            break;
          case AdditionalServices.DELIVERY_ON_WEEKENDS:
            this.setStrategy(new DeliveryOnWeekendsCostStrategy(), index);
            break;
          case AdditionalServices.INSURANCE:
            this.setStrategy(new InsuranceCostStrategy(), index);
            break;
        }
      });
    }
  }

  private setParcelSizeCostStrategy(size: ParcelSize): number {
    switch (size) {
      case ParcelSize.SMALL:
        this.costStrategy = new SmallParcelCostStrategy();
        return 5;
      case ParcelSize.MEDIUM:
        this.costStrategy = new MediumParcelCostStrategy();
        return 10;
      case ParcelSize.LARGE:
        this.costStrategy = new LargeParcelCostStrategy();
        return 15;
      default:
        throw new Error(`Invalid parcel size: ${size}`);
    }
  }

  private setStrategy(strategy: CostStrategy, index: number): void {
    if (index === 0) {
      this.costStrategy = strategy;
    } else if (this.costStrategy) {
      this.costStrategy.setNext(strategy);
    } else {
      console.error("Cannot set strategy");
    }
  }

  public calculateCost(): number {
    console.log("Calculating cost");
    if (this.costStrategy) {
      return this.costStrategy.calculateCost(this.cost);
    } else {
      return 0;
    }
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
