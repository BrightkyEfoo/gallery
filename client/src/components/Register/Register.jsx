import React, { useState } from "react";
import "./style.scss";
import {
  connectionEmitter,
  connectionEmitterEvents,
} from "../../pages/Connection/Connection";
import axios from "axios";

function Register() {
  const [registerState, setregisterState] = useState({
    email: "",
    passWord: "",
  });

  const [user, setUser] = useState();
  const handleClick = () => {
    axios
      .post("http://localhost:3000/api/v1/user/login", {
        email: registerState.email,
        motDePasse: registerState.passWord,
      })
      .then((res) => {
        console.log("res", res);
        setUser(res.data.user);
        localStorage.setItem("User", JSON.stringify(res.data.user));
        localStorage.setItem("token", "Bearer " + res.data.token);

        connectionEmitter.emit(connectionEmitterEvents.SET_USER, res.data.user);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const handleChange = (e) => {
    setregisterState((prev) => {
      let tempRegiter = { ...prev };
      tempRegiter[e.target.name] = e.target.value;
      return { ...tempRegiter };
    });
  };
  return (
    <div className="register-container">
      <h2>WELCOME TO GALLERY</h2>
      <form className="register-form">
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          // value={registerState.pmail}
        />
        <input
          type="password"
          name="passWord"
          placeholder="password"
          onChange={handleChange}
          // value={registerState.passWord}
        />
        <button type="button" onClick={handleClick}>
          Login
        </button>
        <p>
          You don't have and account yet? then{" "}
          <span
            onClick={() => {
              connectionEmitter.emit(
                connectionEmitterEvents.GO_TO_REGISTER,
                undefined
              );
            }}
          >
            register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
