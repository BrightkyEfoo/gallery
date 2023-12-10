import { Router } from "express";
import photoController from "./photos.controller.js";
import { authToken } from "../../../auth/auth.js";
const photosRouter = Router();

// route pour enregistrer une photo
photosRouter
  .route("/")
  .get(ErrorHandlePhotos)
  .post(authToken, photoController.create);

// routes (modification, supprimer, lecture)
photosRouter
  .route("/:id")
  .get(authToken, photoController.read)
  .put(authToken, photoController.update)
  .delete(authToken, photoController.remove);

photosRouter.route("/test-comments").post(photoController.comment);

function ErrorHandlePhotos(req, res) {
  return res.sendStatus(401);
}

export default photosRouter;
