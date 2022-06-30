import { useState } from "react";
import { Button } from "../Components/Button";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const Forgot = () => {
  const [email, setEmail] = useState("");

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
    <div>
      <br />
      Email: <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />{" "}
      <br />
      <br />
      <Button onClickButton={(event) => onForgot(event)} buttonText="Forgot" />
    </div>
  );
};
