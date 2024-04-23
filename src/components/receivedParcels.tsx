import { useSystemStore } from "../stores/systemStore";
import { useUserStore } from "../stores/userStore";

const ReceivedParcels: React.FC = () => {
  const systemStore = useSystemStore();
  const userStore = useUserStore();
  const currentUser = systemStore.currentUser;
  if (!currentUser) {
    return null;
  }
  const user = userStore.getUserByName(currentUser);
  if (!user) {
    return null;
  }
  return (
    <div className="card">
      <h1>Received Parcels</h1>
      {user.getReceivedParcels().map((el, index) => (
        <div key={index}>
          <div>Parcel Id: {el.id}</div>
        </div>
      ))}
    </div>
  );
};
export default ReceivedParcels;
