import { useEffect, useState } from "react";
import { Button } from "../Components/Button";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { geohashForLocation } from "geofire-common";

export const Search = () => {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [name, setName] = useState("");
  const [searchByName, setSearchByName] = useState(false);
  const [userAuth, setUserAuth] = useState("");
  const [foundEntries, setFoundEntries] = useState([]);

  //query posts
  const searchPosts = async () => {
    console.log(searchByName);
    let tempEntries = [];
    const auth = await getAuth();

    //create a ref for the user's specific posts
    const userPostCollection = collection(db, auth.currentUser.uid);

    if (searchByName) {
      //search by name
      const q = query(userPostCollection, where("name", "==", name));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        tempEntries.push(doc.data());
      });
      setFoundEntries(tempEntries);
    } else {
      //search by location

      const hash = geohashForLocation([parseInt(lat), parseInt(long)]);
      const q = query(userPostCollection, where("geoHash", "==", hash));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        tempEntries.push(doc.data());
      });
      setFoundEntries(tempEntries);
    }
  };

  //delete entryy

  return (
    <div>
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
            setName(e.target.value);
          }}
        />
      ) : (
        <>
          <input
            type="number"
            placeholder="input latitude"
            onChange={(e) => {
              setFoundEntries([]);
              setLat(e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="input longitude"
            onChange={(e) => {
              setFoundEntries([]);
              setLong(e.target.value);
            }}
          />
        </>
      )}

      <br />
      <Button
        onClickButton={(event) => searchPosts(event)}
        buttonText="Search"
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
            //date obj cant be diplayed directly
            let tempDate = new Date(item.date.seconds);

            return (
              <tr key={index}>
                <th>{item.id}</th>
                <th>{item.name}</th>
                <th>{item.latitude}</th>
                <th>{item.longitude}</th>
                <th>{tempDate.toString()}</th>
                <th>
                  <button>X</button>
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
    </div>
  );
};
