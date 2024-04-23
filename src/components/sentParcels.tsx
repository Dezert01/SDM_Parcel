import { useSystemStore } from "../stores/systemStore";

import { useUserPortal } from "../stores/useUserPortal";
const SentParcels: React.FC = () => {
  const userPortal = useUserPortal;
  const systemStore = useSystemStore();
  const currentUser = systemStore.currentUser;
  if (!currentUser) {
    return null;
  }
  const user = userPortal.getUserByName(currentUser);
  if (!user) {
    return null;
  }
  return (
    <div className="card">
      <h1>Sent Parcels</h1>
      {user.getSentParcels().map((el, index) => (
        <div key={index}>
          <div>Parcel Id: {el.id}</div>
          <button className="button">Details</button>
        </div>
      ))}
    </div>
  );
};
export default SentParcels;
