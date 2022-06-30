import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import geofire, { geohashForLocation } from "geofire-common";
import { useAuthStatus } from "../Hooks/useAuthStatus";
import { Link, Navigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { Languages } from "../Components/Languages.js";

export const Home = () => {
  //states
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const date = new Date();
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [postSubmitted, setPostSubmitted] = useState(false);
  const [err, setErr] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { checkingStatus, loggedIn } = useAuthStatus();

  const { t, i18n } = useTranslation();

  //functions
  const submitInfo = async () => {
    //fields cannot be empty nor out of range
    if (
      latitude > 180 ||
      latitude < -180 ||
      longitude > 180 ||
      longitude < -180 ||
      id == "" ||
      name == "" ||
      latitude == 0 ||
      longitude == 0
    )
      setErr(true);
    else {
      //loading while the post is being upload
      setSubmitting(true);

      const hash = geohashForLocation([
        parseInt(latitude),
        parseInt(longitude),
      ]);
      const auth = getAuth();

      try {
        const docRef = await addDoc(collection(db, auth.currentUser.uid), {
          id,
          name,
          date: date.toString(),
          longitude,
          latitude,
          geoHash: hash,
        });
        setPostSubmitted(true);
        setSubmitting(false);
      } catch (e) {
        setErr(true);
        setSubmitting(false);
      }
    }
  };

  return (
    <>
      {checkingStatus ? (
        "loading"
      ) : !loggedIn ? (
        <Navigate to="/login" />
      ) : (
        <div>
          <Link to="/search">
            <Trans i18nKey="homePage.navigate">
              {t("Navigate to Search Page")}:{" "}
            </Trans>
          </Link>
          <br />
          <br />
          <br />
          <Languages />
          <br />
          <br />
          <h1>
            <Trans i18nKey="homePage.heading">{t("Add new Post")}: </Trans>
          </h1>
          <Trans i18nKey="homePage.ID">{t("ID")}: </Trans>
          <input
            type="text"
            onChange={(e) => {
              setPostSubmitted(false);
              setErr(false);
              setId(e.target.value);
            }}
          />
          <br />
          <Trans i18nKey="homePage.name">{t("Name")}: </Trans>
          <input
            type="text"
            onChange={(e) => {
              setPostSubmitted(false);
              setErr(false);
              setName(e.target.value);
            }}
          />
          <br />
          <Trans i18nKey="homePage.date">{t("Date")}: </Trans>
          <input type="text" value={date} readOnly />
          <br />
          <Trans i18nKey="homePage.latitude">{t("Latitude")}: </Trans>
          <input
            type="number"
            onChange={(e) => {
              setPostSubmitted(false);
              setErr(false);
              setLongitude(e.target.value);
            }}
            placeholder="b/w 180 and -180"
          />
          <br />
          <Trans i18nKey="homePage.longitude">{t("Longitude")}: </Trans>

          <input
            type="number"
            onChange={(e) => {
              setPostSubmitted(false);
              setErr(false);
              setLatitude(e.target.value);
            }}
            placeholder="b/w 180 and -180"
          />
          <br />
          <button onClick={() => submitInfo()}>
            {submitting ? (
              <Trans i18nKey="homePage.submitting">{t("Submitting")} </Trans>
            ) : (
              <Trans i18nKey="homePage.submit">{t("Submit")} </Trans>
            )}
          </button>
          {/* err for post not submitted */}
          {err ? (
            <p>
              <Trans i18nKey="homePage.err">
                {t("Error submitting post, check values please")}
              </Trans>
            </p>
          ) : (
            <></>
          )}
          {/* message for post submitted */}
          {postSubmitted ? (
            <p>
              <Trans i18nKey="homePage.success">
                {t("POST SUBMITTED SUCCESSFULLY")}
              </Trans>
            </p>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};
