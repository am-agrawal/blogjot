import { useEffect, useState } from "react";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    if (true) { // check whether user is logged in [Present in Localstorage or not?]
      setLoggedIn(true);
    }
    setCheckingStatus(false);
  }, []);
  return { loggedIn, checkingStatus };
};
