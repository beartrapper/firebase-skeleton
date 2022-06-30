import { useState } from "react";
import { Button } from "../Components/Button";

export const Forgot = () => {
  const [email, setEmail] = useState("");

  const onForgot = () => {};

  return (
    <div>
      <br />
      Email: <input
        type="text"
        onChange={(e) => setEmail(e.target.value)()}
      />{" "}
      <br />
      <br />
      <Button onClick={onForgot()} buttonText="Forgot" />
    </div>
  );
};
