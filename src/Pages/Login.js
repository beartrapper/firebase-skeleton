import { Button } from "../Components/Button";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthStatus } from "../Hooks/useAuthStatus";
import { useTranslation, Trans } from "react-i18next";
import { Languages } from "../Components/Languages.js";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorLoggingIn, setErrorLoggingIn] = useState(false);
  const { checkingStatus, loggedIn } = useAuthStatus();

  const { t, i18n } = useTranslation();

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
          <Link to="/signup">
            <Trans i18nKey="signup">{t("Signup")}?</Trans>
          </Link>
          <br />
          <br />
          <Languages />
          <br />
          <br />
          <Trans i18nKey="email">{t("Email")}: </Trans>
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorLoggingIn(false);
            }}
          />{" "}
          <br />
          <Trans i18nKey="password">{t("Password")}: </Trans>
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
            buttonText={<Trans i18nKey="login">t("Login")</Trans>}
          />
          <br />
          <br />
          <Link to="/forgot">
            <Trans i18nKey="forgotPassword">
              {t("forgot password? Fret not!")}
            </Trans>
          </Link>
          {errorLoggingIn ? (
            <>
              <br />
              <br />
              <Trans i18nKey="errLoggingIn">
                {t("There seems to be an error loggin in")}
              </Trans>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};
