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
import { Parcel } from "@/classes/parcel";
const AllParcels: React.FC = () => {
  const userPortal = useUserPortal;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [parcel, setParcel] = useState<Parcel | any>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [newLocker, setNewLocker] = useState<number | null>(
    userPortal.getLockers()[0].id || null,
  );
  const systemStore = useSystemStore();
  const currentUser = systemStore.currentUser;
  if (!currentUser) {
    return null;
  }

  const handleOpenDialog = (id: number) => {
    const parcel = userPortal
      .getParcels()
      .find((parcel) => parcel.id === id)
      ?.getParcelDetails();
    setParcel(parcel);
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
      <div className="flex flex-col gap-2">
        <h1>All parcels</h1>
        {userPortal.getParcels().map((el, index) => (
          <div key={index}>
            <div>Parcel Id: {el.id}</div>
            <button className="button" onClick={() => handleOpenDialog(el.id)}>
              Details
            </button>
          </div>
        ))}
      </div>
      {parcel ? (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-h-[80vh] min-w-[25vw] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Parcel ID: {parcel.id}</DialogTitle>
            </DialogHeader>
            <div className="dialog-details">
              <div>
                <div>Parcel Size</div>
                <div>{parcel.parcelSize}</div>
              </div>
              <div>
                <div>Sent by</div>
                <div>
                  {"Username: " +
                    parcel.sender.name +
                    ", Phone: " +
                    parcel.sender.phone}
                </div>
              </div>
              <div>
                <div>Sent to </div>
                <div>
                  {"Username: " +
                    parcel.recipient.name +
                    ", Phone: " +
                    parcel.recipient.phone}
                </div>
              </div>
              <div>
                <div>Sent from locker</div>
                <div>
                  {"ID: " +
                    parcel.senderLocker.id +
                    ", Address: " +
                    parcel.senderLocker.address}
                </div>
              </div>
              <div>
                <div>Sent to locker</div>
                <div>
                  {"ID: " +
                    parcel.recipientLocker.id +
                    ", Address: " +
                    parcel.recipientLocker.address}
                </div>
              </div>
              <div>
                <div>Estimated Delivery Time</div>
                <div>{parcel.estimatedDeliveryTime.toLocaleString()}</div>
              </div>
              <div>
                <div>Actual Delivery Time</div>
                <div>
                  {parcel.actualDeliveryTime
                    ? parcel.actualDeliveryTime.toLocaleString()
                    : "Not yet delivered"}
                </div>
              </div>
              <div>
                <div>Guaranteed Delivery Time</div>
                <div>{parcel.guaranteedDeliveryTime.toLocaleString()}</div>
              </div>
              <div>
                <div>Actual Pickup Time</div>
                <div>
                  {parcel.actualPickupTime
                    ? parcel.actualPickupTime.toLocaleString()
                    : "Not yet picked up"}
                </div>
              </div>
              <div>
                <div>Price</div>
                <div>{parcel.payment?.calculateCost()}</div>
              </div>
              <div>
                <div>Is Paid For</div>
                <div>
                  {parcel.isPaidFor ? "Yes" : "No"}{" "}
                  {!parcel.isPaidFor ? (
                    <button
                      className="button"
                      onClick={() => handleMakePayment(parcel.id)}
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
                  {parcel.recordOfTransit.map(
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
                  onClick={() => handleRerouteParcel(parcel.id, newLocker || 0)}
                >
                  Reroute
                </button>
              </div>
              <h2>Extend Retrieval Date</h2>
              <button
                className="button"
                onClick={() => handleExtendRetrievalDate(parcel.id)}
              >
                Extend
              </button>
              <h2>Deliver to sender's locker</h2>
              <button
                className="button"
                onClick={() => handleDeliverToSenderLocker(parcel.id)}
              >
                Deliver
              </button>
              <h2>Collect from Sender's locker</h2>
              <button
                className="button"
                onClick={() => handleCollectFromSenderLocker(parcel.id)}
              >
                Collect
              </button>
              <h2>Deliver to Recipient's locker</h2>
              <button
                className="button"
                onClick={() => handleDeliverToRecipientLocker(parcel.id)}
              >
                Deliver
              </button>
              <h2>Pickup to Recipient's locker</h2>
              <button
                className="button"
                onClick={() => handlePickupFromRecipientLocker(parcel.id)}
              >
                Pick-up
              </button>
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
export default AllParcels;
