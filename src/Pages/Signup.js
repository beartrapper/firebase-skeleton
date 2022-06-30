import { Button } from "../Components/Button";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthStatus } from "../Hooks/useAuthStatus";
import { useTranslation, Trans } from "react-i18next";
import { Languages } from "../Components/Languages.js";

export const Signup = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorSigningUp, setErrorSigningUp] = useState(false);
  const { checkingStatus, loggedIn } = useAuthStatus();

  const { t, i18n } = useTranslation();

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
          <Link to="/login">
            <Trans i18nKey="login">{t("login")}?</Trans>
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
              setErrorSigningUp(false);
            }}
          />{" "}
          <br />
          <Trans i18nKey="password">{t("Password")}: </Trans>
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
            buttonText={<Trans i18nKey="signup">t("Signup")</Trans>}
          />
          {errorSigningUp ? (
            <>
              <br />
              <br />
              <Trans i18nKey="errLoggingIn">
                {t("There seems to be an error signing up")}
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
