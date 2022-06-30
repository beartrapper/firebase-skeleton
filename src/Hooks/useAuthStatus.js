import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuthStatus = () => {
  // assume user to be logged out
  const [loggedIn, setLoggedIn] = useState(false);

  // keep track to display a spinner while auth status is being checked
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    // auth listener to keep track of user signing in and out
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }

      setCheckingStatus(false);
    });
  }, []);

  return { loggedIn, checkingStatus };
};
