import { create } from "zustand";
import { Parcel } from "../classes/parcel";
import { useMockParcels } from "../mock-data/parcels";

// const MockParcels = useMockParcels();

export type ParcelStore = {
  parcels: Parcel[];
  addParcel: (parcel: Parcel) => void;
  setParcels: (parcels: Parcel[]) => void;
};

export const useParcelStore = create<ParcelStore>((set, get) => ({
  parcels: [],

  addParcel: (parcel: Parcel) => {
    set((state) => ({
      parcels: [...state.parcels, parcel],
    }));
  },
  setParcels: (parcels: Parcel[]) => {
    set(() => ({
      parcels: parcels,
    }));
  },
}));
