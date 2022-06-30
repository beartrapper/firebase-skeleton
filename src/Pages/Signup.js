import { Button } from "../Components/Button";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthStatus } from "../Hooks/useAuthStatus";

export const Signup = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorSigningUp, setErrorSigningUp] = useState(false);
  const { checkingStatus, loggedIn } = useAuthStatus();

  const onSignup = () => {
    console.log("in");
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        //its going to be redirected automatically
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("err: ", errorMessage);
        setErrorSigningUp(true);
        // ..
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
          <Link to="/login">login?</Link>
          <br />
          <br />
          Email:{" "}
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorSigningUp(false);
            }}
          />{" "}
          <br />
          Password:{" "}
          <input
            type="password"
            onChange={(e) => {
              setErrorSigningUp(false);
              setPassword(e.target.value);
            }}
          />{" "}
          <br />
          <br />
          <Button
            onClickButton={(event) => onSignup(event)}
            buttonText="Signup"
          />
          {errorSigningUp ? (
            <>
              <br />
              <br />
              There seems to be an error signing up
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};
