import "./style.scss";
import Photo from "../photo/Photo";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  useEffect(() => {
    const tempUser = JSON.parse(localStorage.getItem("User"));
    axios
      .get(`https://gallery-0cb9.onrender.com/api/v1/user/${tempUser._id}`)
      .then((res) => {
        console.log("res.data", res.data);
        setUser(res.data.user);
      });

    return () => {};
  }, []);

  const handleLogout = (e) => {
    localStorage.clear();
    navigate(0);
  };

  return (
    user && (
      <div className="dashboard-profil right-container">
        <h2>Welcome {user.nom}</h2>
        <p>Vos photos : {user.photos.length}</p>
        <img
          className="pp"
          src={user.photoDeProfil}
          title="logout"
          onClick={handleLogout}
        />
        <div className="dashboard-profil-photo-container">
          {user.photos?.map((el, idx) => {
            return (
              <Photo
                key={idx}
                date={el.createdAt}
                desc={el.description}
                id={el._id}
                image={el.lien}
                name={user.nom}
              />
            );
          })}
        </div>
      </div>
    )
  );
};

export default MainDashboard;
