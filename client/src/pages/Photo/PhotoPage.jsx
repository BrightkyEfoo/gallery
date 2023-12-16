import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  useEffect,
  useRef,
  useState
} from "react";
import { useParams } from "react-router-dom";
import Emitter from "../../utils/eventEmitters";
import "./styles.scss";
import axios from "axios";


const photoEmitter = new Emitter();

const photoEvents = {
  RELOAD: "RELOAD",
};

const PhotoPage = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [reload, setReload] = useState(false);
  photoEmitter.on(photoEvents.RELOAD, () => {
    setReload(!reload);
  });
  useEffect(() => {
    const v = async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/photo/" + id
      );
      console.log(data.photo);
      setPhoto(data.photo);
      localStorage.setItem("photoId", JSON.stringify(data.photo._id));
      localStorage.setItem("userId", JSON.stringify(data.photo.auteur._id));
    };
    v();
    return () => {};
  }, [photo?.comments?.length, reload]);
  return photo ? (
      <div className="photo-page right-container">
        <img src={photo.lien} alt={photo.name} />
        <div>
          <span>{photo.auteur.nom}</span>
          <span>{photo.createdAt}</span>
          <p>{photo.description}</p>
        </div>
        <CommentsBlock photo={photo} />
      </div>
  ) : (
    <div>Loading</div>
  );
};

const CommentsBlock = ({ photo }) => {
  return (
    <div>
      <CommentForm
        locationArray={[]}
        commentLength={photo.comments.length}
        photo={photo}
      />
      <Comment
        comments={photo.comments}
        locationArray={[]}
      />
    </div>
  );
};

const CommentForm = ({ locationArray, commentLength, close }) => {
  const handleClick = async () => {
    const photoId = JSON.parse(localStorage.getItem("photoId"));
    const userId = JSON.parse(localStorage.getItem("userId"));
    console.log("locationArray", locationArray);
    const a = await axios.post(
      "http://localhost:3000/api/v1/photo/test-comments",
      {
        id: photoId,
        pos: [...locationArray, commentLength],
        value: inputRef.current?.value,
        auteurId: userId,
      }
    );
    inputRef.current.value = "";
    if (close) close();
    photoEmitter.emit(photoEvents.RELOAD);
  };
  const inputRef = useRef(null);
  return (
    <div className="comment-form">
      <input type="text" ref={inputRef} />
      <button type="button" title="comment" onClick={handleClick}>
        <FontAwesomeIcon icon={faPaperPlane} fade color="white" />
      </button>
    </div>
  );
};

const Comment = ({ comments, locationArray }) => {
  return (
    <div
      className="comment-block"
      style={{
        paddingLeft: 15,
      }}
    >
      {Array.isArray(comments) &&
        comments.length > 0 &&
        comments.map((el, idx) => {
          const lo = locationArray.join("") + idx;
          return (
            <CommentSub
              lo={lo}
              key={lo}
              el={el}
              locationArray={[...locationArray, idx]}
            />
          );
        })}
    </div>
  );
};

const CommentSub = ({ lo, el, locationArray }) => {
  const [myVisibility, setMyVisibility] = useState(false);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  return (
    <div className="comment-sub-block" key={lo}>
      <span>{el.comment}</span>
      <span>{el.date}</span>
      {Array.isArray(el.comments) && el.comments.length > 0 && (
        <>
          <span>
            {el.comments.length} commentaire
            {el.comments.length > 1 && "s"}
          </span>
          <span
            onClick={() => {
              setMyVisibility((prev) => !prev);
            }}
            style={{
              color: myVisibility ? "red" : "white",
            }}
          >
            {myVisibility ? "masquer" : "Afficher"}
          </span>
        </>
      )}
      <button
        type="button"
        onClick={() => {
          setIsCommentFormVisible((prev) => !prev);
        }}
      >
        {isCommentFormVisible ? "Annuler" : "repondre"}
      </button>
      {isCommentFormVisible && (
        <CommentForm
          locationArray={locationArray}
          commentLength={el.comments.length}
          close={() => {
            setIsCommentFormVisible(false);
          }}
        />
      )}

      {myVisibility && Array.isArray(el.comments) && el.comments.length > 0 && (
        <Comment
          key={lo}
          locationArray={[...locationArray]}
          comments={el.comments}
        />
      )}
    </div>
  );
};

export default PhotoPage;
