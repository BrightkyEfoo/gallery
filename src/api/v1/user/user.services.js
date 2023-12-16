// CRUD
import bcrypt from "bcrypt";
import User from "./user.model.js";

let usermock = {
  nom: "",
  email: "",
  motDePasse: "",
  photoDeProfil: "",
};

/**
 *
 * @param {typeof usermock} userQuery
 */
const create = async (userQuery) => {
  try {
    const tempUser = await User.create(userQuery);
    const user = { ...tempUser.toJSON() };
    delete user.motDePasse;
    return user;
  } catch (error) {
    throw new Error("your email suppose to be unique");
  }
};

/**
 *
 * @param {string} id
 * @returns
 */
const read = async (id) => {
  try {
    const tempUser = await User.findById(id).populate({
      path: "photos",
      model: "Photo",
    });
    const user = tempUser.toJSON();
    delete user.motDePasse;
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("userId does not exist!");
  }
};

/**
 *
 * @param {String} id id de the utilisatrice you vouloir update
 * @param {UserUpdateQuery} userUpdate
 * @returns
 *
 */
const update = async (id, userUpdate) => {
  try {
    const tempUser = await User.findByIdAndUpdate(id, userUpdate);
    // console.log(userUpdate);
    const user = { ...tempUser.toJSON() };
    delete user.motDePasse;
    return user;
  } catch (error) {
    throw new Error("userId does not exist!");
  }
};

/**
 *
 * @param {String} id
 * @returns
 */
const suppress = async (id) => {
  try {
    await User.findByIdAndDelete(id);
    return 0;
  } catch (error) {
    throw Error("userId does not exist!");
  }
};

/**
 *
 * @param {string} email email of attempting user
 * @param {string} motDePasse
 * @returns 2 when user was not found
 * @returns 1 when password didn't match was not found
 */
const compare = async (email, motDePasse) => {
  console.log(email, motDePasse)
  try {
    const user = await User.findOne({ email });
    console.log('user', user)
    if (!user) {
      console.log("not exist")
      return 2;
    } else if (await bcrypt.compare(motDePasse, user.motDePasse)) {
      const tempUser = { ...user.toJSON() };
      delete tempUser.motDePasse;
      return tempUser;
    } else {
      return 1;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const userService = {
  compare,
  suppress,
  update,
  read,
  create,
};

export default userService;
