import { Parcel } from "./parcel";

export interface IObserver {
  update(parcel: Parcel, notif: string): void;
}

export interface ISubject {
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  notifyObservers(notif: string): void;
}
