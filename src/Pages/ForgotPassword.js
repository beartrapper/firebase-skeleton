import { useState } from "react";
import { Button } from "../Components/Button";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useAuthStatus } from "../Hooks/useAuthStatus";
import { Navigate } from "react-router-dom";

export const Forgot = () => {
  const [email, setEmail] = useState("");
  const { checkingStatus, loggedIn } = useAuthStatus();

  const onForgot = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log("done");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
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
          <br />
          Email:{" "}
          <input type="text" onChange={(e) => setEmail(e.target.value)} />{" "}
          <br />
          <br />
          <Button
            onClickButton={(event) => onForgot(event)}
            buttonText="Forgot"
          />
        </div>
      )}
    </>
  );
};
