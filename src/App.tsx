import { useRef, useState } from "react";
import { Parcel } from "./classes/parcel";
import { User } from "./classes/user";
import { MockUsers } from "./mock-data/users";

function App() {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [users, setUsers] = useState<User[]>(MockUsers);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

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
      let user = users.find((el) => el.name === usernameRef.current?.value);
      if (user) {
        alert("User of given username already exists");
        return;
      }
      user = users.find((el) => String(el.phone) === phoneRef.current?.value);
      if (user) {
        alert("Given phone number is already assigned to existing account");
        return;
      }
      if (passwordRef.current?.value.length < 5) {
        alert("Password has to be at least 5 character length");
        return;
      }
      const highestId = users.reduce((maxId, user) => {
        return user.id > maxId ? user.id : maxId;
      }, 0);
      const newUser = new User(
        usernameRef.current?.value,
        highestId + 1,
        passwordRef.current?.value,
        Number(phoneRef.current?.value),
      );
      setUsers((prev) => [...prev, newUser]);
      alert("You created new account. You can sign in Now");
      setIsSigningUp(false);
    } else {
      // Login In
      const user = users.find((el) => el.name === usernameRef.current?.value);
      const confirmPassword = user?.password === passwordRef.current?.value;
      if (user && confirmPassword) {
        setCurrentUser(user);
        alert(`Sucessful sign in as ${user.name}`);
      } else {
        alert("Wrong username or password");
      }
    }
  };

  return (
    <div className="flex h-full w-full flex-wrap gap-2">
      {currentUser ? (
        <div className="card">
          <h1>Currently logged in as:</h1>
          <h2 className="font-bold">{currentUser.name}</h2>
          <button className="button" onClick={() => setCurrentUser(undefined)}>
            Sign out
          </button>
        </div>
      ) : (
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
      )}
      <div className="card">
        <h1>Nadaj Paczkę</h1>
      </div>
    </div>
  );
}

export default App;
