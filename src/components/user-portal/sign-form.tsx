import { useSystemStore } from "@/stores/systemStore";
import { useUserPortal } from "@/stores/useUserPortal";
import { useRef, useState } from "react";

const SignForm: React.FC = () => {
  const userPortal = useUserPortal;
  const systemStore = useSystemStore();
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleSignIn = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !usernameRef ||
      !usernameRef.current ||
      !passwordRef.current ||
      !passwordRef.current
    ) {
      alert("Something went wrong");
      return;
    }
    // Login In
    const user = userPortal.getUserByName(usernameRef.current?.value);
    const confirmPassword = user?.password === passwordRef.current?.value;
    if (user && confirmPassword) {
      systemStore.setCurrentUser(user.name);
    } else {
      alert("Wrong username or password");
    }
  };

  const handleSignUp = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !usernameRef ||
      !usernameRef.current ||
      !passwordRef.current ||
      !passwordRef.current ||
      !phoneRef ||
      !phoneRef.current
    ) {
      alert("Something went wrong");
      return;
    }
    // New Account
    if (!phoneRef || !phoneRef.current) return;
    let user = userPortal.getUserByName(usernameRef.current.value);
    if (user) {
      alert("User of given username already exists");
      return;
    }
    user = userPortal.getUserByPhone(Number(phoneRef.current.value));
    if (user) {
      alert("Given phone number is already assigned to existing account");
      return;
    }
    if (passwordRef.current.value.length < 5) {
      alert("Password has to be at least 5 character length");
      return;
    }
    userPortal.registerUser(
      usernameRef.current.value,
      passwordRef.current.value,
      Number(phoneRef.current.value),
    );
    alert("You created new account. You can sign in Now");
    setIsSigningUp(false);
  };
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center">
      {isSigningUp ? (
        <form className="card" onSubmit={handleSignUp}>
          <h1>{"Sign Up"}</h1>
          <input
            placeholder="Username"
            type="login"
            ref={usernameRef}
            required
          />
          <input
            placeholder="password"
            type="password"
            ref={passwordRef}
            required
          />
          <input placeholder="phone number" type="tel" ref={phoneRef} />
          <a
            onClick={() => setIsSigningUp((prev) => !prev)}
            className="mb-2 text-center text-xs text-blue-500 hover:underline"
          >
            Sign in using existing account
          </a>
          <button className="button" type="submit">
            Sign Up
          </button>
        </form>
      ) : (
        <form className="card" onSubmit={handleSignIn}>
          <h1>{"Sign In"}</h1>
          <input
            placeholder="Username"
            type="login"
            ref={usernameRef}
            required
          />
          <input
            placeholder="password"
            type="password"
            ref={passwordRef}
            required
          />
          <a
            onClick={() => setIsSigningUp((prev) => !prev)}
            className="mb-2 text-center text-xs text-blue-500 hover:underline"
          >
            Create new account
          </a>
          <button className="button" type="submit">
            Sign In
          </button>
        </form>
      )}
    </div>
  );
};
export default SignForm;
