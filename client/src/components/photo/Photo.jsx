import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const Photo = ({ id, image, desc, name, date }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/photo/" + id);
  };
  return (
    <div className="photo-container" onClick={handleClick}>
      <img src={image} alt={name} />
      <div>
        <span>{name}</span>
        <span style={{fontSize:12}}>{date}</span>
        <p className="photo-description">{desc}</p>
      </div>
    </div>
  );
};

export default Photo;
