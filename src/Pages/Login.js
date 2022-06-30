import { Button } from "../Components/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorLoggingIn, setErrorLoggingIn] = useState(false);

  const onLogin = () => {
    console.log("in");
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("done");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorLoggingIn(true);
      });
  };

  return (
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
      <Button onClickButton={(event) => onLogin(event)} buttonText="Login" />
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
  );
};
