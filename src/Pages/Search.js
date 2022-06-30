import { useEffect, useState } from "react";
import { Button } from "../Components/Button";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { geohashForLocation } from "geofire-common";
import { useAuthStatus } from "../Hooks/useAuthStatus";
import { Link, Navigate } from "react-router-dom";

export const Search = () => {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [name, setName] = useState("");
  const [searchByName, setSearchByName] = useState(false);
  const [foundEntries, setFoundEntries] = useState([]);
  const [foundEntriesID, setFoundEntriesID] = useState([]);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState(false);
  const { checkingStatus, loggedIn } = useAuthStatus();

  //query posts
  const searchPosts = async () => {
    setSearching(true);

    let tempEntries = [];
    let tempEntriesID = [];
    const auth = await getAuth();

    //create a ref for the user's specific posts
    const userPostCollection = collection(db, auth.currentUser.uid);

    if (searchByName) {
      //search by name
      const q = query(userPostCollection, where("name", "==", name));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        tempEntriesID.push(doc.id);
        tempEntries.push(doc.data());
      });
    } else {
      //search by location

      try {
        const hash = geohashForLocation([parseInt(lat), parseInt(long)]);
        const q = query(userPostCollection, where("geoHash", "==", hash));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          tempEntriesID.push(doc.id);
          tempEntries.push(doc.data());
        });
      } catch (err) {
        setSearching(false);
        setMessage(true);
      }
    }

    if (tempEntries.length == 0) setMessage("Nothing found");

    setFoundEntries(tempEntries);
    setFoundEntriesID(tempEntriesID);

    setSearching(false);
  };

  //delete entry
  const deleteEntry = async (id, index) => {
    const auth = await getAuth();

    console.log(id);
    await deleteDoc(doc(db, auth.currentUser.uid, id));

    //to make splice work you have to create another array
    //not just another reference to the array
    const tempArray = [...foundEntries];
    const tempArrayID = [...foundEntriesID];

    //remove from local array
    if (foundEntries.length == 1) {
      setFoundEntries([]);
      setFoundEntriesID([]);
    } else {
      tempArray.splice(index, 1);
      tempArrayID.splice(index, 1);
      console.log(tempArray);
      console.log(tempArrayID);

      setFoundEntries(tempArray);
      setFoundEntriesID(tempArrayID);
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
          <Link to="/">back to post creation?</Link>
          <br />
          <br />
          <br />
          <h1>Query data</h1>
          <hr />
          <button onClick={() => setSearchByName(!searchByName)}>
            {searchByName ? "Search by location" : "Search by name"}
          </button>
          <br />
          <br />

          {/* seperating the queries to simplify the UX a bit */}
          {searchByName ? (
            <input
              type="text"
              placeholder="input name"
              onChange={(e) => {
                setFoundEntries([]);
                setMessage(false);
                setName(e.target.value);
              }}
            />
          ) : (
            <>
              <input
                type="number"
                placeholder="input longitude"
                onChange={(e) => {
                  setFoundEntries([]);
                  setMessage(false);
                  setLong(e.target.value);
                }}
              />
              <input
                type="number"
                placeholder="input latitude"
                onChange={(e) => {
                  setFoundEntries([]);
                  setMessage(false);
                  setLat(e.target.value);
                }}
              />
            </>
          )}

          <br />
          <Button
            onClickButton={(event) => searchPosts(event)}
            buttonText={searching ? "Searching" : "Search"}
          />
          <br />
          <hr />

          {foundEntries.length != 0 ? (
            <table>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>lat</th>
                <th>long</th>
                <th>date</th>
                <th>action</th>
              </tr>
              {foundEntries.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{item.id}</th>
                    <th>{item.name}</th>
                    <th>{item.latitude}</th>
                    <th>{item.longitude}</th>
                    <th>{item.date}</th>
                    <th>
                      <button
                        onClick={() =>
                          deleteEntry(foundEntriesID[index], index)
                        }
                      >
                        X
                      </button>
                    </th>
                  </tr>
                );
              })}
            </table>
          ) : (
            <></>
          )}

          <br />
          <br />

          {message ? "Nothing found" : <></>}
        </div>
      )}
    </>
  );
};
