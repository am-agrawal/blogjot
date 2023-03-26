import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apis/api";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      //! Remove this 'if' and handle error of api call
      if (localStorage.getItem("id") && localStorage.getItem('username')) {
        let fetchedUser = null;
        try {
          const response = await api.get(
            `/users/${localStorage.getItem("id")}`
          );

          fetchedUser = response.data;
        } catch (error) {
          console.error(error.message);
        }

        // check whether user is logged in or not [Present in Localstorage or not?]
        if (
          fetchedUser &&
          fetchedUser.email &&
          fetchedUser.email === localStorage.getItem("username")
        ) {
          localStorage.setItem('isLoggedIn', true);
        }
      }

      if (localStorage.getItem('isLoggedIn') === true) {
        navigate("/blogs");
      } else {
        navigate("/login");
      }
    })();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Main;
