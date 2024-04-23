import { useState } from "react";
import { ParcelSize } from "../enums/ParcelSize";
import { Parcel } from "../classes/parcel";
import { User } from "../classes/user";
import { useSystemStore } from "../stores/store";
import { Locker } from "../classes/locker";

const RegisterParcel: React.FC = () => {
  const [recipientPhone, setRecipientPhone] = useState<number>();
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState<Date>();
  const [guaranteedDeliveryTime, setGuaranteedDeliveryTime] = useState<Date>();
  const [parcelSize, setParcelSize] = useState<ParcelSize>(ParcelSize.SMALL);
  const [selectedRecipientLocker, setSelectedRecipientLocker] =
    useState<Locker | null>(null);
  const [selectedSenderLocker, setSelectedSenderLocker] =
    useState<Locker | null>(null);

  const store = useSystemStore();

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!store.currentUser) return;

    const sender = store.getUserByName(store.currentUser!);

    if (!sender) {
      alert("Please sign in");
      return;
    }

    if (!recipientPhone) {
      alert("Provide recipient's phone number");
      return;
    }
    const recipient = store.getUserByPhone(recipientPhone);
    if (!recipient) {
      alert("No user of given phone number found");
      return;
    }
    const highestId = store.parcels.reduce((maxId, user) => {
      return user.id > maxId ? user.id : maxId;
    }, 0);

    const newParcel: Parcel = new Parcel(
      highestId ? highestId + 1 : 1,
      sender!,
      recipient,
      selectedRecipientLocker!,
      selectedSenderLocker!,
      estimatedDeliveryTime!,
      guaranteedDeliveryTime!,
      parcelSize,
    );

    sender.addParcelToAccount(newParcel, true);
    recipient.addParcelToAccount(newParcel, false);
    store.addParcel(newParcel);
    console.log("New Parcel:", newParcel);
    console.log(store.parcels);
  };

  return (
    <div className="card">
      <h1>Register new Parcel</h1>
      <form className="flex flex-col" onSubmit={handleFormSubmit}>
        <input
          type="number"
          placeholder="Recipient's Phone"
          value={recipientPhone}
          onChange={(e) => setRecipientPhone(parseInt(e.target.value))}
          required
        />
        <input
          type="datetime-local"
          placeholder="Estimated Delivery Time"
          value={estimatedDeliveryTime?.toISOString().slice(0, -8)}
          onChange={(e) => setEstimatedDeliveryTime(new Date(e.target.value))}
          required
        />
        <input
          type="datetime-local"
          placeholder="Guaranteed Delivery Time"
          value={guaranteedDeliveryTime?.toISOString().slice(0, -8)}
          onChange={(e) => setGuaranteedDeliveryTime(new Date(e.target.value))}
          required
        />
        <select
          value={parcelSize}
          onChange={(e) => setParcelSize(e.target.value as ParcelSize)}
          required
        >
          {Object.values(ParcelSize).map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <label>Sender's locker</label>
        <select
          value={selectedSenderLocker?.id}
          onChange={(e) => {
            const selectedLockerId = parseInt(e.target.value);
            const locker = store.lockers.find(
              (locker) => locker.id === selectedLockerId,
            );
            setSelectedSenderLocker(locker || null);
          }}
          required
        >
          {store.lockers.map((locker) => (
            <option key={locker.id} value={locker.id}>
              {locker.address}
            </option>
          ))}
        </select>
        <label>Recipient's locker</label>
        <select
          value={selectedRecipientLocker?.id}
          onChange={(e) => {
            const selectedLockerId = parseInt(e.target.value);
            const locker = store.lockers.find(
              (locker) => locker.id === selectedLockerId,
            );
            setSelectedRecipientLocker(locker || null);
          }}
          required
        >
          {store.lockers.map((locker) => (
            <option key={locker.id} value={locker.id}>
              {locker.address}
            </option>
          ))}
        </select>
        <button className="button" type="submit">
          Register Parcel
        </button>
      </form>
    </div>
  );
};
export default RegisterParcel;
