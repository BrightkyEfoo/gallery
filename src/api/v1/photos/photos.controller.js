import photoValidate from "./photo.Validate.js";
import photoService from "./photos.service.js";
import mongoose from "mongoose";

// creation d'une photo
const create = async (req, res) => {
  const { userId, lien, description } = req.body;

  try {
    const { error } = photoValidate.validate({
      auteur: userId,
      lien,
      description,
    });
    if (!error) {
      let photo = await photoService.create({
        description,
        lien,
        auteur: new mongoose.Types.ObjectId(userId),
      });
      photo = await photo.populate("auteur");
      const msg = "success create photo";
      return res.json({ msg, photo: photo.toJSON() });
    } else {
      return res.json({
        msg: "error when create photo",
        error: error.details[0].message,
      });
    }
  } catch (error) {
    const msg = "error when create photo";
    return res.json({ msg, error: error.message });
  }
};

// lecture d'une photo
const read = async (req, res) => {
  const id = req.params.id;

  try {
    const photo = await photoService.read(id);
    if (photo === null) {
      const msg = "photo not found";
      return res.json({ msg });
    } else {
      const msg = "success read photo";
      return res.json({ msg, photo: photo });
    }
  } catch (error) {
    const msg = "error when read photo!";
    return res.json({ msg, error: error.message });
  }
};

// Modification d'une photo
const update = async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  let updateUser;
  if (description) {
    updateUser = {
      description,
    };
  } else {
    const msg = "please enter the data avaible to update!";
    return res.json({ msg });
  }

  try {
    const photo = await photoService.update(id, updateUser);
    const msg = "success update photo";
    return res.json({ msg, photo: photo.toJSON() });
  } catch (error) {
    const msg = "error when update photo!";
    return res.json({ msg, error: error.message });
  }
};

// delet d'une photo
const remove = async (req, res) => {
  const id = req.params.id;
  const userIdToken = req.user.userId; // userId in token
  const { userId } = req.body; // userId in token
  try {
    const photo = await photoService.remove(id);
    if (photo !== null) {
      const msg = "success delete photo";
      return res.json({ msg, photo: photo });
    } else {
      const msg = "photo not found";
      return res.json({ msg });
    }
  } catch (error) {
    const msg = "error when delete photo!";
    return res.json({ msg, error: error.message });
  }
};

const comment = async (req, res) => {
  const { id, pos, value, auteurId } = req.body;
  const photo = await photoService.comment(id, pos, value, auteurId);
  res.json({ photo });
};

const photoController = {
  create,
  read,
  update,
  remove,
  comment,
};

export default photoController;
