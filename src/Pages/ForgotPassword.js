import { useState } from "react";
import { Button } from "../Components/Button";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useAuthStatus } from "../Hooks/useAuthStatus";
import { Link, Navigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { Languages } from "../Components/Languages.js";

export const Forgot = () => {
  const [email, setEmail] = useState("");
  const { checkingStatus, loggedIn } = useAuthStatus();

  const { t, i18n } = useTranslation();

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
          <Link to="/login">
            <Trans i18nKey="login">{t("Back to Login")}</Trans>
          </Link>
          <br />
          <br />
          <Languages />
          <br />
          <br />
          <Trans i18nKey="email">{t("Email")}: </Trans>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />{" "}
          <br />
          <br />
          <Button
            onClickButton={(event) => onForgot(event)}
            buttonText={<Trans i18nKey="forgotPassword">{t("forgot")}</Trans>}
          />
        </div>
      )}
    </>
  );
};
