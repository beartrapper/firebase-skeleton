import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import geofire, { geohashForLocation } from "geofire-common";

export const Home = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  //   const [date, setDate] = useState("");
  const date = new Date();
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  const submitInfo = async () => {
    const hash = geohashForLocation([parseInt(latitude), parseInt(longitude)]);
    const auth = getAuth();

    try {
      const docRef = await addDoc(collection(db, auth.currentUser.uid), {
        id,
        name,
        date,
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
  );
};
