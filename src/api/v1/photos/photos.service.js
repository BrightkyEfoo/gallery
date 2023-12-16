import { Schema, Types } from "mongoose";
import userService from "../user/user.services.js";
import Photo from "./photos.model.js";

/**
 * create photo
 * @param {queryobject} dataPhoto
 */
const create = async (dataPhoto) => {
  try {
    const photo = await Photo.create(dataPhoto);
    await userService.update(dataPhoto.auteur, {
      $push: {
        photos: photo._id,
      },
    });
    return photo;
  } catch (error) {
    throw new Error("userId does not exist!");
  }
};

// read photo
const read = async (id) => {
  try {
    const photo = await Photo.findOne({ _id: id }).populate({
      path: "auteur",
      populate: {
        path: "photos",
        model: "Photo",
      },
    });
    const tempPhoto = photo.toJSON();
    delete tempPhoto.auteur.motDePasse;
    delete tempPhoto.auteur.repeat_password;
    return tempPhoto;
  } catch (error) {
    throw new Error("photoId does not exist!");
  }
};

// Update photo
const update = async (id, dataSet) => {
  try {
    const photo = await Photo.findByIdAndUpdate(id, dataSet);
    return photo;
  } catch (error) {
    throw new Error("photoId does not exist!");
  }
};

/**
 *
 * @param {string} id c'est l'id de la photo
 * @param {number[]} pos c'est la position du nouveau commentaire
 * @param {string} value c'est la valeur du commentaire
 * @param {string} auteurId c'est l'identifiant de l'auteur qui commente
 */
const comment = async (id, pos, value, auteurId) => {
  try {
    console.log(pos);
    console.log(id);
    console.log(value);
    console.log(auteurId);

    let photo = await read(id);
    const auteur = await userService.read(auteurId);
    const newComment = {
      auteur: new Types.ObjectId(auteurId),
      date: new Date(),
      comment: value,
      comments: [],
    };
    let profondeur = pos.length;
    let strToEval = "";
    for (let i = 0; i < profondeur; i++) {
      strToEval += `.comments[${pos[i]}]`;
    }
    eval(`photo${strToEval}`);
    strToEval = `photo${strToEval} = newComment`;
    let a = eval(strToEval);
    console.log("e", photo);
    const newPhoto = await Photo.findByIdAndUpdate(id, photo);
    return newPhoto.toJSON();
  } catch (error) {
    console.log("error", error);
  }
};

// delete photo
const remove = async (id) => {
  try {
    const photo = await Photo.findByIdAndDelete(id);
    return photo;
  } catch (error) {
    throw new Error("photoId does not exist!");
  }
};

const getPhotos = async () => {
  const photos = await Photo.find().populate("auteur");
  return photos;
};

const photoService = {
  create,
  read,
  update,
  remove,
  comment,
  getPhotos,
};

export default photoService;
