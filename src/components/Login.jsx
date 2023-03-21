import React from "react";
import style from "./Login.module.css";

const Login = () => {
  return (
    <div className={style.container}>
      <h1>Welcome to BlogJot</h1>
      <form
        className={style.formCard}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="username">Username</label>
        <input type="email" name="username" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
