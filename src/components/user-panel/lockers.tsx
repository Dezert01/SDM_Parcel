import { useUserPortal } from "@/stores/useUserPortal";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Slot } from "@/classes/slot";

type LockerDetails = {
  id: number;
  slots: Slot[];
};

const AllLockers: React.FC = () => {
  const userPortal = useUserPortal;
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [lockerDetails, setLockerDetails] = useState<LockerDetails | undefined>(
    undefined,
  );
  const [parcelToDeliver, setParcelToDeliver] = useState<number | null>(null);
  const [parcelToSend, setParcelToSend] = useState<number | null>(null);

  const handleOpenDialog = (id: number) => {
    const locker = userPortal.getLockers().find((locker) => locker.id === id);
    if (!locker) return;
    setLockerDetails({
      id: locker.id,
      slots: locker.getSlots(),
    });
    setOpenDialog(true);
  };

  const handleCollectParcel = (parcelId: number, byCourier: boolean) => {
    const userPanel = userPortal
      .getLockers()
      .find((locker) => locker.id === lockerDetails?.id)?.userPanel;
    if (!userPanel) return;
    userPanel.retrieveParcel(parcelId, byCourier);
  };

  const handleSendParcel = (parcelId: number | null) => {
    const userPanel = userPortal
      .getLockers()
      .find((locker) => locker.id === lockerDetails?.id)?.userPanel;
    const parcel = userPortal
      .getParcels()
      .find((parcel) => parcel.id === parcelId);
    if (!userPanel || !parcel) return;
    userPanel.sendParcel(parcel);
  };

  const handleDeliverParcel = (parcelId: number | null) => {
    const userPanel = userPortal
      .getLockers()
      .find((locker) => locker.id === lockerDetails?.id)?.userPanel;
    const parcel = userPortal
      .getParcels()
      .find((parcel) => parcel.id === parcelId);
    console.log(parcelId);
    if (!userPanel || !parcel) return;
    userPanel.deliverParcel(parcel);
  };

  return (
    <div className="card">
      <h1>All Lockers</h1>
      {userPortal.getLockers().map((locker, index) => (
        <div key={index}>
          <div>Locker Id: {locker.id}</div>
          <button
            className="button"
            onClick={() => handleOpenDialog(locker.id)}
          >
            Details
          </button>
        </div>
      ))}

      {lockerDetails ? (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="min-w-[25vw]">
            <DialogHeader>
              <DialogTitle>Locker {lockerDetails.id}: User Panel</DialogTitle>
            </DialogHeader>
            <div className="dialog-details">
              <h2>Parcels inside:</h2>
              {lockerDetails.slots.map((slot, index) => {
                const parcel = slot.getParcel();
                return parcel ? (
                  <div className="flex" key={index}>
                    Package ID: {parcel.id}
                    <div className="flex gap-1">
                      <button
                        className="button"
                        onClick={() => handleCollectParcel(parcel.id, true)}
                      >
                        Collect as Courier
                      </button>
                      <button
                        className="button"
                        onClick={() => handleCollectParcel(parcel.id, false)}
                      >
                        Collect as Recipient
                      </button>
                    </div>
                  </div>
                ) : null;
              })}
              <h2>Send Parcel</h2>
              <span className="text-xs opacity-50">
                Only paid for parcels can be sent.
              </span>
              <div>
                <select
                  value={parcelToSend || 0}
                  onChange={(e) => {
                    const selectedParcelId = parseInt(e.target.value);
                    console.log(selectedParcelId);
                    const parcel = userPortal
                      .getParcels()
                      .find((parcel) => parcel.id === selectedParcelId);
                    setParcelToSend(parcel?.id || null);
                  }}
                  required
                >
                  <option value={undefined}>Select Parcel</option>
                  {userPortal
                    .getParcels()
                    .filter(
                      (parcel) =>
                        parcel.getTransitRecords()[
                          parcel.getTransitRecords().length - 1
                        ].type === "PACKAGE_PAID_FOR",
                    )
                    .map((parcel) => (
                      <option key={parcel.id} value={parcel.id}>
                        {parcel.id}
                      </option>
                    ))}
                </select>
                <button
                  className="button"
                  onClick={() => handleSendParcel(parcelToSend)}
                >
                  Send Parcel
                </button>
              </div>
              <h2>Deliver Parcel</h2>
              <span className="text-xs opacity-50">
                Only parcels in transit can be delivered.
              </span>
              <div>
                <select
                  value={parcelToDeliver || 0}
                  onChange={(e) => {
                    const selectedParcelId = parseInt(e.target.value);
                    console.log(selectedParcelId);
                    const parcel = userPortal
                      .getParcels()
                      .find((parcel) => parcel.id === selectedParcelId);
                    setParcelToDeliver(parcel?.id || null);
                  }}
                  required
                >
                  <option value={undefined}>Select Parcel</option>
                  {userPortal
                    .getParcels()
                    .filter(
                      (parcel) =>
                        parcel.getTransitRecords()[
                          parcel.getTransitRecords().length - 1
                        ].type === "PACKAGE_IN_TRANSIT",
                    )
                    .map((parcel) => (
                      <option key={parcel.id} value={parcel.id}>
                        {parcel.id}
                      </option>
                    ))}
                </select>
                <button
                  className="button"
                  onClick={() => handleDeliverParcel(parcelToDeliver)}
                >
                  Deliver Parcel
                </button>
              </div>
            </div>
            <DialogFooter>
              <button className="button" onClick={() => setOpenDialog(false)}>
                Close
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
};

export default AllLockers;
