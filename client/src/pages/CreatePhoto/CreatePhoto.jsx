import React, { useEffect, useState } from "react";
import "./style.scss";
import Photo from "../../components/photo/Photo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePhoto() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("User"));
  const navigate = useNavigate();
  const [photos, setPhoto] = useState({
    description: "",
    auteur: user?.nom,
    updatedAt: "*/*/*",
    _id: user?._id,
    lien: "http://localhost:3000/public/paysage1.png",
  });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState();

  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", photos._id);
    formData.append("description", photos.description);
    formData.append("lien", photos.lien);
    console.log(file, photos._id, photos.description);
    axios
      .post("http://localhost:3000/api/v1/photo", formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("res", res);
        navigate(`/photo/${res.data.photo._id}`);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleChange = (e) => {
    setPhoto((prev) => {
      const date = new Date()
        .toLocaleString(undefined, { dateStyle: "full" })
        .toString();
      const time = new Date().toLocaleTimeString().toString();
      let tempPhoto = { ...prev };
      tempPhoto["description"] = e.target.value;
      tempPhoto["updatedAt"] = date + " " + time;
      return { ...tempPhoto };
    });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const a = URL.createObjectURL(e.target.files[0]);
    console.log("URL.createObjectURL(e.target.file)", a);
    setPreview(a);
  };

  useEffect(() => {
    if (!user?._id) {
      navigate("/connection");
    }
  }, [user?._id]);
  return (
    user?._id && (
      <div className="createPhoto-contain">
        <h2>AJOUTER UNE PHOTO A VOTRE GALLERY</h2>
        <form className="createPhoto-form">
          <textarea
            cols="30"
            rows="5"
            placeholder="commentaire..."
            onChange={handleChange}
            value={photos.description}
          ></textarea>
          <input type="file" onChange={handleFileChange} />
          <button type="button" onClick={upload}>
            ajouter
          </button>
        </form>
        <div className="createPhoto-trait"></div>
        <h3>Apercu</h3>

        <Photo
          image={preview || photos.lien}
          id={photos._id}
          desc={photos.description}
          name={photos.auteur}
          date={photos.updatedAt}
        />
      </div>
    )
  );
}

export default CreatePhoto;
