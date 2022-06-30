import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import geofire, { geohashForLocation } from "geofire-common";
import { useAuthStatus } from "../Hooks/useAuthStatus";
import { Link, Navigate } from "react-router-dom";

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
          <Link to="/search">Navigate to Search Page</Link>
          <br />
          <br />
          <br />
          <h1>Add new Post</h1>
          ID:{" "}
          <input
            type="text"
            onChange={(e) => {
              setPostSubmitted(false);
              setErr(false);
              setId(e.target.value);
            }}
          />
          <br />
          Name:{" "}
          <input
            type="text"
            onChange={(e) => {
              setPostSubmitted(false);
              setErr(false);
              setName(e.target.value);
            }}
          />
          <br />
          Date: <input type="text" value={date} readOnly />
          <br />
          Latitude:{" "}
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
          Longitude:{" "}
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
            {submitting ? "Submitting" : "Submit"}
          </button>
          {/* err for post not submitted */}
          {err ? <p>Error submitting post, check values please</p> : <></>}
          {/* message for post submitted */}
          {postSubmitted ? <p>POST SUBMITTED SUCCESSFULLY</p> : <></>}
        </div>
      )}
    </>
  );
};
