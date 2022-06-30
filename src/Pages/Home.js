import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const Home = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  //   const [date, setDate] = useState("");
  const date = new Date();
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [userAuth, setUserAuth] = useState("");

  useEffect(() => {
    const auth = getAuth();
    setUserAuth(auth);
    console.log(auth.currentUser.uid);
    // console.log(firebase.database.ServerValue.TIMESTAMP);
  }, []);

  const submitInfo = async () => {
    try {
      const docRef = await addDoc(collection(db, userAuth.currentUser.uid), {
        id,
        name,
        date,
        longitude,
        latitude,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log(userAuth);
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
      <input type="text" onChange={(e) => setLongitude(e.target.value)} />
      <br />
      Longitude:{" "}
      <input type="text" onChange={(e) => setLatitude(e.target.value)} />
      <br />
      <button onClick={() => submitInfo()}>Submit</button>
    </div>
  );
};
