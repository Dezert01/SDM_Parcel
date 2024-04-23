import { useEffect, useRef, useState } from "react";
import { User } from "./classes/user";
import { useSystemStore } from "./stores/systemStore";
import RegisterParcel from "./components/registerParcel";
import SentParcels from "./components/sentParcels";
import ReceivedParcels from "./components/receivedParcels";
import { useUserStore } from "./stores/userStore";
import { useMockParcels } from "./mock-data/parcels";
import { useParcelStore } from "./stores/parcelStore";
import { Parcel } from "./classes/parcel";

function App() {
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const systemStore = useSystemStore();
  const userStore = useUserStore();
  const parcelStore = useParcelStore();

  const mockParcels = useMockParcels();

  useEffect(() => {
    parcelStore.setParcels(mockParcels);
    mockParcels.forEach((el) => {
      const sender = el.getSender().name;
      const recipient = el.getRecipient().name;
      userStore.getUserByName(sender)?.addParcelToAccount(el, true);
      userStore.getUserByName(recipient)?.addParcelToAccount(el, false);
    });
  }, []);

  const handleSigning = () => {
    if (
      !usernameRef ||
      !usernameRef.current ||
      !passwordRef.current ||
      !passwordRef.current
    ) {
      alert("Something went wrong");
      return;
    }
    if (isSigningUp) {
      // New Account
      if (!phoneRef || !phoneRef.current) return;
      let user = userStore.getUserByName(usernameRef.current?.value);
      if (user) {
        alert("User of given username already exists");
        return;
      }
      user = userStore.getUserByPhone(Number(phoneRef.current?.value));
      if (user) {
        alert("Given phone number is already assigned to existing account");
        return;
      }
      if (passwordRef.current?.value.length < 5) {
        alert("Password has to be at least 5 character length");
        return;
      }
      const highestId = userStore.users.reduce((maxId, user) => {
        return user.id > maxId ? user.id : maxId;
      }, 0);
      const newUser = new User(
        usernameRef.current?.value,
        highestId ? highestId + 1 : 1,
        passwordRef.current?.value,
        Number(phoneRef.current?.value),
      );
      userStore.addUser(newUser);
      alert("You created new account. You can sign in Now");
      setIsSigningUp(false);
    } else {
      // Login In
      const user = userStore.getUserByName(usernameRef.current?.value);
      const confirmPassword = user?.password === passwordRef.current?.value;
      if (user && confirmPassword) {
        systemStore.setCurrentUser(user.name);
        alert(`Sucessful sign in as ${user.name}`);
      } else {
        alert("Wrong username or password");
      }
    }
  };
  if (!systemStore.currentUser)
    return (
      <div className="card">
        <h1>{isSigningUp ? "Sign Up" : "Sign In"}</h1>
        <input placeholder="Username" type="login" ref={usernameRef} />
        <input placeholder="password" type="password" ref={passwordRef} />
        {isSigningUp ? (
          <input placeholder="phone number" type="tel" ref={phoneRef} />
        ) : null}
        <button
          onClick={() => setIsSigningUp((prev) => !prev)}
          className="mb-2 text-xs text-blue-500 hover:underline"
        >
          {isSigningUp
            ? "Sign in using existing account"
            : "Create new account"}
        </button>
        <button onClick={handleSigning} className="button">
          {isSigningUp ? "Sign Up" : "Sign In"}
        </button>
      </div>
    );

  return (
    <div className="flex h-full w-full flex-wrap gap-2">
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
      <SentParcels />
      <ReceivedParcels />
    </div>
  );
}

export default App;
