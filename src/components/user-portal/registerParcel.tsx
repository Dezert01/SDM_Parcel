import { useState } from "react";
import { ParcelSize } from "../../enums/ParcelSize";
import { useSystemStore } from "../../stores/systemStore";
import { Locker } from "../../classes/locker";
import { useUserPortal } from "../../stores/useUserPortal";
import { AdditionalServices } from "@/enums/AdditionalServices";

const RegisterParcel: React.FC = () => {
  const userPortal = useUserPortal;
  const [recipientPhone, setRecipientPhone] = useState<number>();
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState<Date>();
  const [guaranteedDeliveryTime, setGuaranteedDeliveryTime] = useState<Date>();
  const [parcelSize, setParcelSize] = useState<ParcelSize>(ParcelSize.SMALL);
  const [selectedRecipientLocker, setSelectedRecipientLocker] =
    useState<Locker | null>(userPortal.getLockers()[0] || null);
  const [selectedSenderLocker, setSelectedSenderLocker] =
    useState<Locker | null>(userPortal.getLockers()[0] || null);
  const [selectedServices, setSelectedServices] = useState({
    fast: false,
    weekends: false,
    insurance: false,
  });

  const systemStore = useSystemStore();

  const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedServices({
      ...selectedServices,
      [event.target.name]: event.target.checked,
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!systemStore.currentUser) return;

    const sender = userPortal.getUserByName(systemStore.currentUser);

    if (!sender) {
      alert("Please sign in");
      return;
    }

    if (!recipientPhone) {
      alert("Provide recipient's phone number");
      return;
    }
    const recipient = userPortal.getUserByPhone(recipientPhone);
    if (!recipient) {
      alert("No user of given phone number found");
      return;
    }

    //@ts-expect-error - TS doesn't know that selectedServices is a valid object
    const additionalServices: AdditionalServices[] =
      Object.entries(selectedServices)
        .filter(([, value]) => value)
        .map(([key]) => {
          if (key === "fast") return AdditionalServices.FAST_DELIVERY;
          if (key === "weekends")
            return AdditionalServices.DELIVERY_ON_WEEKENDS;
          if (key === "insurance") return AdditionalServices.INSURANCE;
        }) || [];

    userPortal.registerParcel(
      sender.id,
      recipient.id,
      selectedRecipientLocker?.id || 0,
      selectedSenderLocker?.id || 0,
      parcelSize,
      additionalServices,
    );
  };

  return (
    <div className="card">
      <h1>Register new Parcel</h1>
      <form className="flex flex-col" onSubmit={handleFormSubmit}>
        <label>Recipient's Phone</label>
        <input
          type="number"
          placeholder="Recipient's Phone"
          value={recipientPhone}
          onChange={(e) => setRecipientPhone(parseInt(e.target.value))}
          required
        />
        <label>Estimated Delivery Time</label>
        <input
          type="datetime-local"
          placeholder="Estimated Delivery Time"
          value={estimatedDeliveryTime?.toISOString().slice(0, -8)}
          onChange={(e) => setEstimatedDeliveryTime(new Date(e.target.value))}
          required
        />
        <label>Guaranteed Delivery Time</label>
        <input
          type="datetime-local"
          placeholder="Guaranteed Delivery Time"
          value={guaranteedDeliveryTime?.toISOString().slice(0, -8)}
          onChange={(e) => setGuaranteedDeliveryTime(new Date(e.target.value))}
          required
        />
        <label>Parcel Size</label>
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
            const locker = userPortal
              .getLockers()
              .find((locker) => locker.id === selectedLockerId);
            setSelectedSenderLocker(locker || null);
          }}
          required
        >
          {userPortal.getLockers().map((locker) => (
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
            const locker = userPortal
              .getLockers()
              .find((locker) => locker.id === selectedLockerId);
            setSelectedRecipientLocker(locker || null);
          }}
          required
        >
          {userPortal.getLockers().map((locker) => (
            <option key={locker.id} value={locker.id}>
              {locker.address}
            </option>
          ))}
        </select>
        <label>Fast Delivery</label>
        <input
          type="checkbox"
          id="fast"
          name="fast"
          checked={selectedServices.fast}
          onChange={handleServiceChange}
        />
        <label>Delivery on Weeekends</label>
        <input
          type="checkbox"
          id="weekends"
          name="weekends"
          checked={selectedServices.weekends}
          onChange={handleServiceChange}
        />
        <label>Insurance</label>
        <input
          type="checkbox"
          id="insurance"
          name="insurance"
          checked={selectedServices.insurance}
          onChange={handleServiceChange}
        />
        <button className="button mt-4" type="submit">
          Register Parcel
        </button>
      </form>
    </div>
  );
};
export default RegisterParcel;
