import { Button } from "../Components/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const Signup = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorSigningUp, setErrorSigningUp] = useState(false);

  const onSignup = () => {
    console.log("in");
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("err: ", errorMessage);
        setErrorSigningUp(true);
        // ..
      });
  };

  return (
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
      <Button onClickButton={(event) => onSignup(event)} buttonText="Signup" />
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
  );
};
