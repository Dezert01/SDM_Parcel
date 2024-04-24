import RegisterParcel from "./components/user-portal/registerParcel";
import Parcels from "./components/user-portal/parcels";
import { useSystemStore } from "./stores/systemStore";
import SignForm from "./components/user-portal/sign-form";
import AllParcels from "./components/admin-panel/allParcels";
import AllLockers from "./components/user-panel/lockers";
function App() {
  const systemStore = useSystemStore();

  if (!systemStore.currentUser) return <SignForm />;

  return (
    <div className="flex h-full w-full flex-wrap gap-2 p-4">
      <div className="card gap-2 !border-2 !p-4">
        <h1>User Portal</h1>
        <div className="card">
          <h1>Currently logged in as:</h1>
          <h2 className="font-bold">{systemStore.currentUser}</h2>
          <button
            className="button"
            onClick={() => systemStore.setCurrentUser(undefined)}
          >
            Sign out
          </button>
        </div>

        <RegisterParcel />
        <Parcels />
      </div>
      <div className="card !border-2 !p-4">
        <h1>Locker User Panels - (simulator)</h1>
        <AllLockers />
      </div>
      <div className="card !border-2 !p-4">
        <h1>Admin Panel - (simulator)</h1>
        <AllParcels />
      </div>
    </div>
  );
}

export default App;
