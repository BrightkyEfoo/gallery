import React, { useEffect, useState } from "react";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import "./style.scss";
import MainDashboard from "../../components/MainDashboard/MainDashboard";
import Emitter from "../../utils/eventEmitters";

export const connectionEmitter = new Emitter();

export const connectionEmitterEvents = {
  GO_TO_LOGIN: "GO_TO_LOGIN",
  GO_TO_REGISTER: "GO_TO_REGISTER",
  SET_USER: "SET_USER",
};

export default function Connection() {
  const [user, setUser] = useState();

  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    const tempU = JSON.parse(localStorage.getItem("User"));
    setUser(tempU);
  }, []);

  // HANDLE EVENTS
  // SET_USER
  connectionEmitter.on(connectionEmitterEvents.SET_USER, (userData) => {
    setUser((prev) => userData);
  });

  // GO_TO_LOGIN
  connectionEmitter.on(connectionEmitterEvents.GO_TO_LOGIN, () => {
    setIsLogin((prev) => true);
  });

  // GO_TO_REGISTER
  connectionEmitter.on(connectionEmitterEvents.GO_TO_REGISTER, () => {
    setIsLogin((prev) => false);
  });

  return (
    <div className="dashboard-container">
      {user ? <MainDashboard /> : isLogin ? <Register /> : <Login />}
    </div>
  );
}
