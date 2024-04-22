export class ParcelHistory {
  readonly id: number;
  readonly parcelId: number;
  readonly depositTime: Date;
  private collectionTime: Date;

  public constructor(
    id: number,
    parcelId: number,
    depositTime: Date,
    collectionTime: Date,
  ) {
    this.id = id;
    this.parcelId = parcelId;
    this.depositTime = depositTime;
    this.collectionTime = collectionTime;
  }

  public updateCollectionTime(time: Date): void {
    this.collectionTime = time;
  }
}
