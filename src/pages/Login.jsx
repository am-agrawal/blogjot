import api from "../apis/api";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const passwordRef = useRef();

  const isError = () => {
    if (userRef.current.value.trim() === "") {
      return true;
    } else if (passwordRef.current.value.trim() === "") {
      return true;
    }
    return false;
  };

  const submit = (event) => {
    event.preventDefault();
    if (isError()) {
      alert("Please fill all fields");
      return;
    }

    (async () => {
      let fetchedUser = null;
      const response = await api.get(`/users/${passwordRef.current.value}`);

      fetchedUser = response.data && response.data;

      if (
        fetchedUser &&
        fetchedUser.email &&
        fetchedUser.email === userRef.current.value
      ) {
        localStorage.setItem("username", fetchedUser.email);
        localStorage.setItem("id", fetchedUser.id);
        localStorage.setItem("name", fetchedUser.name);

        localStorage.setItem('isLoggedIn', true);
        navigate("/blogs", { replace: true});
      } else {
        alert("Entered details are invalid");
      }
    })();
  };

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn')) {
      navigate("/blogs", { replace: true});
    }
  }, [navigate]);

  return (
    <div className={style.container}>
      <h1>Welcome to BlogJot</h1>
      <form className={style.formCard} onSubmit={submit}>
        <label htmlFor="username">Username</label>
        <input
          type="email"
          name="username"
          placeholder="Username"
          autoComplete="off"
          ref={userRef}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          ref={passwordRef}
        />

        <button type="submit" className={style.btnLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
