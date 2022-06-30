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
  const { checkingStatus, loggedIn } = useAuthStatus();

  //functions
  const submitInfo = async () => {
    const hash = geohashForLocation([parseInt(latitude), parseInt(longitude)]);
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
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
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
          ID: <input type="text" onChange={(e) => setId(e.target.value)} />
          <br />
          Name: <input type="text" onChange={(e) => setName(e.target.value)} />
          <br />
          Date: <input type="text" value={date} readOnly />
          <br />
          Latitude:{" "}
          <input type="number" onChange={(e) => setLongitude(e.target.value)} />
          <br />
          Longitude:{" "}
          <input type="number" onChange={(e) => setLatitude(e.target.value)} />
          <br />
          <button onClick={() => submitInfo()}>Submit</button>
        </div>
      )}
    </>
  );
};
