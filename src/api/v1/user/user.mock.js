import User from "./user.model.js";

export const userInitializer = async () => {
  const user = {
    nom: "johndoe",
    email: "johndoe@exemple.com",
    photoDeProfil:
      "https://gallery-0cb9.onrender.com/api/images/johndoe/photoDeProfil.png",
    motDePasse: "azerty",
  };
  await User.create(user);
};
