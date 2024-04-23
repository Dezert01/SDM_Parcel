import { useState } from "react";
import { useSystemStore } from "../stores/systemStore";
import { useUserPortal } from "../stores/useUserPortal";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TransitRecord } from "@/classes/transitRecord";
const Parcels: React.FC = () => {
  const userPortal = useUserPortal;
  const [parcel, setParcel] = useState<any>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [newLocker, setNewLocker] = useState<number | null>(
    userPortal.getLockers()[0].id || null,
  );
  const systemStore = useSystemStore();
  const currentUser = systemStore.currentUser;
  if (!currentUser) {
    return null;
  }
  const user = userPortal.getUserByName(currentUser);
  if (!user) {
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
      {parcel ? (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="min-w-[25vw]">
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
              <h1>Reroute Locker</h1>
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
              <h1>Extend Retrieval Date</h1>
              <button
                className="button"
                onClick={() => handleExtendRetrievalDate(parcel.id)}
              >
                Extend
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
export default Parcels;
