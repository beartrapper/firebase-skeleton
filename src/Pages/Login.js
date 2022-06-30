import { Button } from "../Components/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const onLogin = () => {};
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <Link to="/signup">Signup?</Link>
      <br />
      <br />
      Email: <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />{" "}
      <br />
      Password:{" "}
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <br />
      <br />
      <Button onClick={onLogin()} buttonText="Login" />
      <br />
      <br />
      <Link to="/forgot">forgot password? Fret not!</Link>
    </div>
  );
};
