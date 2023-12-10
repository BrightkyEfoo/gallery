import User from "./user.model.js";

export const userInitializer = async () => {
  const user = {
    nom: "johndoe",
    email: "johndoe@exemple.com",
    photoDeProfil:
      "http://localhost:3000/api/images/johndoe/photoDeProfil.png",
    motDePasse: "azerty",
  };
  await User.create(user);
};
