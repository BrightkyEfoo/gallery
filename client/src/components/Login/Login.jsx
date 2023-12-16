import React, { useState } from "react";
import {
  connectionEmitter,
  connectionEmitterEvents,
} from "../../pages/Connection/Connection";
import "./style.scss";
import axios from "axios";

function Loging() {
  const [loginState, setLoginState] = useState({
    nom: "",
    email: "",
    reEmail: "",
    password: "",
    rePassword: "",
  });

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/api/v1/user", {
        email: loginState.email,
        photoDeProfil: "http://localhost:3000/public/4.jpeg",
        motDePasse: loginState.password,
        nom: loginState.nom,
      })
      .then((res) => {
        const user = res.data.user;
        console.log("user", user);
        if (!res.data.error) {
          console.log("create succes");
          connectionEmitter.emit(
            connectionEmitterEvents.GO_TO_LOGIN,
            undefined
          );
        }
      })
      .catch((err) => {});
  };

  const handleChangeBytagName = (e) => {
    setLoginState((prev) => {
      let temp = { ...prev };
      temp[e.target.name] = e.target.value;
      return { ...temp };
    });
  };

  return (
    <div className="login-container">
      <h2>REGISTER TO GALLERY</h2>
      <form className="login-form">
        <input
          type="text"
          name="nom"
          placeholder="Nom:"
          className="login-nom"
          value={loginState.nom}
          onChange={handleChangeBytagName}
        />
        <input
          type="email"
          name="email"
          placeholder="Email:"
          value={loginState.email}
          onChange={handleChangeBytagName}
        />
        <input
          type="email"
          name="reEmail"
          placeholder="Email:"
          value={loginState.reEmail}
          onChange={handleChangeBytagName}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginState.password}
          onChange={handleChangeBytagName}
        />
        <input
          type="password"
          name="rePassword"
          placeholder="RePassword"
          value={loginState.rePassword}
          onChange={handleChangeBytagName}
        />
        <button type="button" onClick={handleSubmit}>
          Register
        </button>
        <p>
          You have and account yet? then{" "}
          <span
            onClick={() => {
              connectionEmitter.emit(
                connectionEmitterEvents.GO_TO_LOGIN,
                undefined
              );
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Loging;
