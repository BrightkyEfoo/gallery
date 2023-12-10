import { Router } from "express";
import userRouter from "./user/user.routes.js";
import { json } from "express";
import photosRouter from "./photos/photos.routes.js";
import commentaireRouter from "./commentaires/commentaire.routes.js";

const apiV1Router = Router();

apiV1Router.get("/", (req, res) => {
  res.send("apiV1");
});

apiV1Router.use("/user", userRouter);
apiV1Router.use("/photo", photosRouter);
apiV1Router.use("/commentaire", commentaireRouter);

// routes register login dashboard

export default apiV1Router;