import { Button } from "../Components/Button";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthStatus } from "../Hooks/useAuthStatus";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorLoggingIn, setErrorLoggingIn] = useState(false);
  const { checkingStatus, loggedIn } = useAuthStatus();

  const onLogin = () => {
    console.log("in");
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorLoggingIn(true);
      });
  };

  return (
    <>
      {checkingStatus ? (
        "loading"
      ) : loggedIn ? (
        <Navigate to="/" />
      ) : (
        <div>
          <Link to="/signup">Signup?</Link>
          <br />
          <br />
          Email:{" "}
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorLoggingIn(false);
            }}
          />{" "}
          <br />
          Password:{" "}
          <input
            type="password"
            onChange={(e) => {
              setErrorLoggingIn(false);
              setPassword(e.target.value);
            }}
          />{" "}
          <br />
          <br />
          <Button
            onClickButton={(event) => onLogin(event)}
            buttonText="Login"
          />
          <br />
          <br />
          <Link to="/forgot">forgot password? Fret not!</Link>
          {errorLoggingIn ? (
            <>
              <br />
              <br />
              There seems to be an error loggin in
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};
