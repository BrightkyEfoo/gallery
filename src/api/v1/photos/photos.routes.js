import { Router } from "express";
import { authToken } from "../../../auth/auth.js";
import photoController from "./photos.controller.js";
import upload from "../../../utils/imageStarage/imageStarage.js";
const photosRouter = Router();

// route pour enregistrer une photo
photosRouter
  .route("/")
  .get(photoController.getPhotos)
  .post(authToken, upload.single("file"), photoController.create);

// routes (modification, supprimer, lecture)
photosRouter
  .route("/:id")
  .get(photoController.read)
  .put(authToken, photoController.update)
  .delete(authToken, photoController.remove);

photosRouter.route("/test-comments").post(photoController.comment);

function ErrorHandlePhotos(req, res) {
  return res.sendStatus(401);
}

export default photosRouter;
