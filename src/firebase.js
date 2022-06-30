// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm7pvq9vKr99IkesrdBbUPIM9GmMeCN20",
  authDomain: "upwork-react-test-bedd9.firebaseapp.com",
  projectId: "upwork-react-test-bedd9",
  storageBucket: "upwork-react-test-bedd9.appspot.com",
  messagingSenderId: "860242695500",
  appId: "1:860242695500:web:01ec24b827e600a4856be9",
  measurementId: "G-57MZWZBG67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const analytics = getAnalytics(app);

console.log("auht: ", auth);

export { auth, db, app };
