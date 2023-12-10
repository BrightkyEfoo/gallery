import userService from "./user.services.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { privateKey } from "../../../auth/private_key.js";
import userValidate from "./user.Validate.js";

const createUserHandler = async (req, res) => {
  // on suppose que l'on a verifie tous les parametres de la requetes
  const { nom, email, motDePasse, photoDeProfil, repeat_password } = req.body;

  bcrypt
    .hash(motDePasse, 10)
    .then(async (passwordCrypt) => {
      const { error, value } = userValidate.validate({
        nom,
        email,
        motDePasse,
        photoDeProfil,
        repeat_password,
      });
      const userToCreate = {
        nom,
        email,
        motDePasse: passwordCrypt,
        photoDeProfil,
        repeat_password,
      };
      console.log("userToCreate", userToCreate);
      if (!error) {
        const newUser = await userService.create(userToCreate);
        return res.json({ msg: "success create user", user: newUser });
      } else {
        return res.json({
          msg: "error when create user",
          error: error.details[0].message,
        });
      }
    })
    .catch((error) => {
      const msg = "error When creating a new user!";
      return res.json({ msg, error: error.message });
    });
};

const readUserHandler = async (req, res) => {
  // on suppose que l'on a verifie tous les parametres de la requetes
  const id = req.params.id;
  try {
    const user = await userService.read(id);
    return res.json({ msg: "success find user", user });
  } catch (error) {
    const msg = "error When find a user";
    return res.json({ msg, error: error.message });
  }
};

const deleteUserHandler = async (req, res) => {
  const id = req.params.id; // photoId

  try {
    const userBeforDelete = await userService.read(id);
    const user = await userService.suppress(id);
    if (user === 0) {
      return res.json({
        msg: "utilisateur supprimé avec succès",
        userDeleted: userBeforDelete,
      });
    }
  } catch (error) {
    const msg = "error when delete a user!";
    return res.json({ msg, error: error.message });
  }
};

const updateUserHandler = (req, res) => {
  const id = req.params.id;
  const setData = req.body;
  console.log(id, setData);
  const user = userService.update(id, setData);
  user
    .then((user) => {
      return res.json({ mesg: "user update succcesfuly", dataUpdate: user });
    })
    .catch((error) => {
      const msg = "error when update a user: ";
      return res.json({ msg, error: error.message });
    });
};

const loginUserHandler = async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    const user = await userService.compare(email, motDePasse);
    if (user === 2 || user === 1) {
      return res.json({ msg: "Something went wrong", user });
    } else {
      // creation du jwt
      const token = jwt.sign(
        {
          nom: user.nom,
          email,
          userId: user._id,
        },
        privateKey,
        { expiresIn: "24h" }
      );
      return res.json({ msg: `Hello ${user.nom}!`, token });
    }
  } catch (error) {
    console.log("error: when connect a user: ", error);
    return res.sendStatus(400);
  }
};

const userController = {
  createUserHandler,
  readUserHandler,
  deleteUserHandler,
  updateUserHandler,
  loginUserHandler,
};

export default userController;
