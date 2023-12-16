import { useEffect, useState } from "react";
import Photo from "../../components/photo/Photo";
import "./style.scss";
import axios from "axios";

const Home = () => {
  const [photos, setPhotos] = useState();
  useEffect(() => {
    axios.get("https://gallery-0cb9.onrender.com/api/v1/photo").then((res) => {
      console.log("res.data", res.data);
      setPhotos(res.data.photos);
    });

    return () => {};
  }, []);

  return (
    photos && (
      <div className="home right-container">
        {photos.map((el) => (
          <Photo
            image={el.lien}
            id={el._id}
            desc={el.description}
            name={el.auteur.nom}
            date={el.updatedAt}
          />
        ))}
      </div>
    )
  );
};

export { Home };
