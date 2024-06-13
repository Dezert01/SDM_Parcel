import { useState } from "react";
import { useSystemStore } from "../../stores/systemStore";
import { useUserPortal } from "../../stores/useUserPortal";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TransitRecord } from "@/classes/transitRecord";
import { User } from "@/classes/user";
import { ParcelSize } from "@/enums/ParcelSize";

type ParcelDetails = {
  id: number;
  size: ParcelSize;
  sender: User;
  recipient: User;
  transitRecord: TransitRecord[];
  guaranteedDeliveryTime: Date;
  estimatedDeliveryTime: Date;
  actualDeliveryTime: Date | null;
  actualPickupTime: Date | null;
  isPaidFor: boolean;
};

const Parcels: React.FC = () => {
  const userPortal = useUserPortal;
  const systemStore = useSystemStore();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [parcelDetails, setParcelDetails] = useState<ParcelDetails | undefined>(
    undefined,
  );
  const [newLocker, setNewLocker] = useState<number | null>(
    userPortal.getLockers()[0].id || null,
  );
  const currentUser = systemStore.currentUser;
  if (!currentUser) {
    return null;
  }
  const user = userPortal.getUserByName(currentUser);
  if (!user) {
    return null;
  }

  const handleOpenDialog = (id: number) => {
    const parcel = userPortal.getParcels().find((parcel) => parcel.id === id);
    if (!parcel) return;
    setParcelDetails({
      id: parcel.id,
      size: parcel.getSize(),
      sender: parcel.getSender(),
      recipient: parcel.getRecipient(),
      transitRecord: parcel.getTransitRecords(),
      guaranteedDeliveryTime: parcel.getGuaranteedDeliveryTime(),
      estimatedDeliveryTime: parcel.getEstimatedDeliveryTime(),
      actualDeliveryTime: parcel.getActualDeliveryTime(),
      actualPickupTime: parcel.getActualPickupTime(),
      isPaidFor: parcel.getPaidStatus(),
    });
    setOpenDialog(true);
  };

  const handleRerouteParcel = (parcelId: number, lockerId: number) => {
    const locker = userPortal
      .getLockers()
      .find((locker) => locker.id === lockerId);
    if (!locker) {
      alert("Locker not found");
      return;
    }
    userPortal.rerouteParcel(parcelId, locker);
  };

  const handleMakePayment = (parcelId: number) => {
    userPortal.makePayment(parcelId);
  };

  const handleExtendRetrievalDate = (parcelId: number) => {
    userPortal.extendRetrievalDate(parcelId);
  };

  const handleDeliverToSenderLocker = (parcelId: number) => {
    const parcel = userPortal
      .getParcels()
      .find((parcel) => parcel.id === parcelId);
    if (!parcel) {
      return;
    }
    const locker = parcel.getParcelDetails().senderLocker;
    locker.userPanel.sendParcel(parcel);
  };

  const handleCollectFromSenderLocker = (parcelId: number) => {
    const parcel = userPortal
      .getParcels()
      .find((parcel) => parcel.id === parcelId);
    if (!parcel) {
      return;
    }
    const locker = parcel.getParcelDetails().senderLocker;
    locker.userPanel.retrieveParcel(parcel.id, true);
  };

  const handleDeliverToRecipientLocker = (parcelId: number) => {
    const parcel = userPortal
      .getParcels()
      .find((parcel) => parcel.id === parcelId);
    if (!parcel) {
      return;
    }
    const locker = parcel.getParcelDetails().senderLocker;
    locker.userPanel.deliverParcel(parcel);
  };

  const handlePickupFromRecipientLocker = (parcelId: number) => {
    const parcel = userPortal
      .getParcels()
      .find((parcel) => parcel.id === parcelId);
    if (!parcel) {
      return;
    }
    const locker = parcel.getParcelDetails().senderLocker;
    locker.userPanel.retrieveParcel(parcel.id, false);
  };

  return (
    <div className="card">
      <div className="flex gap-8">
        <div>
          <h1>Received Parcels</h1>
          {user.getReceivedParcels().map((el, index) => (
            <div key={index}>
              <div>Parcel Id: {el.id}</div>
              <button
                className="button"
                onClick={() => handleOpenDialog(el.id)}
              >
                Details
              </button>
            </div>
          ))}
        </div>
        <div>
          <h1>Sent Parcels</h1>

          {user.getSentParcels().map((el, index) => (
            <div key={index}>
              <div>Parcel Id: {el.id}</div>
              <button
                className="button"
                onClick={() => handleOpenDialog(el.id)}
              >
                Details
              </button>
            </div>
          ))}
        </div>
      </div>
      {parcelDetails ? (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="min-w-[25vw]">
            <DialogHeader>
              <DialogTitle>Parcel ID: {parcelDetails.id}</DialogTitle>
            </DialogHeader>
            <div className="dialog-details">
              <div>
                <div>Parcel Size</div>
                <div>{parcelDetails.size}</div>
              </div>
              <div>
                <div>Sent by</div>
                <div>
                  {"Username: " +
                    parcelDetails.sender.name +
                    ", Phone: " +
                    parcelDetails.sender.phone}
                </div>
              </div>
              <div>
                <div>Sent to </div>
                <div>
                  {"Username: " +
                    parcelDetails.recipient.name +
                    ", Phone: " +
                    parcelDetails.recipient.phone}
                </div>
              </div>
              <div>
                <div>Estimated Delivery Time</div>
                <div>
                  {parcelDetails.estimatedDeliveryTime.toLocaleString()}
                </div>
              </div>
              <div>
                <div>Guaranteed Delivery Time</div>
                <div>
                  {parcelDetails.guaranteedDeliveryTime.toLocaleString()}
                </div>
              </div>
              <div>
                <div>Actual Delivery Time</div>
                <div>
                  {parcelDetails.actualDeliveryTime
                    ? parcelDetails.actualDeliveryTime.toLocaleString()
                    : "Not yet delivered"}
                </div>
              </div>
              <div>
                <div>Actual Pickup Time</div>
                <div>
                  {parcelDetails.actualPickupTime
                    ? parcelDetails.actualPickupTime.toLocaleString()
                    : "Not yet picked up"}
                </div>
              </div>
              <div>
                <div>Is Paid For</div>
                <div>
                  {parcelDetails.isPaidFor ? "Yes" : "No"}{" "}
                  {!parcelDetails.isPaidFor ? (
                    <button
                      className="button"
                      onClick={() => handleMakePayment(parcelDetails.id)}
                    >
                      Pay
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
            <div>
              <table className="w-full border-collapse border-2">
                <thead>
                  <tr>
                    <th className="border-2">Type</th>
                    <th className="border-2">Date</th>
                    <th className="border-2">Place</th>
                  </tr>
                </thead>
                <tbody>
                  {parcelDetails.transitRecord.map(
                    (record: TransitRecord, index: number) => (
                      <tr key={index}>
                        <td className="border-2">{record.type}</td>
                        <td className="border-2">
                          {record.date.toLocaleString()}
                        </td>
                        <td className="border-2">
                          {record.place ?? "Not specified"}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
            <div>
              <h1>Actions</h1>
              <h2>Reroute Parcel</h2>
              <div className="flex items-center justify-between">
                <select
                  value={newLocker || 0}
                  onChange={(e) => {
                    const selectedLockerId = parseInt(e.target.value);
                    const locker = userPortal
                      .getLockers()
                      .find((locker) => locker.id === selectedLockerId);
                    setNewLocker(locker?.id || null);
                  }}
                  required
                >
                  {userPortal.getLockers().map((locker) => (
                    <option key={locker.id} value={locker.id}>
                      {locker.address}
                    </option>
                  ))}
                </select>
                <button
                  className="button"
                  onClick={() =>
                    handleRerouteParcel(parcelDetails.id, newLocker || 0)
                  }
                >
                  Reroute
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
export default Parcels;
