import jwt from "jsonwebtoken";
import { privateKey } from "./private_key.js";

export const authToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    const message = "veillez generer un jeton d'authentification.";
    return res.status(401).json({ message });
  }

  const token = authorizationHeader.split(" ")[1];
  jwt.verify(token, privateKey, (error, decodedtoken) => {
    if (error) {
      const message =
        "l'utilisateur n'est pas autorisé à acceder à la ressouce.";
      return res.status(401).json({ message });
    }

    const { email, userId } = decodedtoken;
    console.log(userId)
    console.log(req.body.userId)

    if (
      (req.body.email && req.body.email !== email) ||
      (req.body.userId && req.body.userId !== userId) ||
      (req.query.userId && req.query.userId !== userId)
    ) {
      const message = "l'identifiant de l'utilisateur est invalide";
      res.status(401).json({ message });
    } else {
      req.user = {
        ...decodedtoken,
      };
      next();
    }
  });
};
