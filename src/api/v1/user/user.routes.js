import { Router } from "express";
import userController from "./user.controller.js";

const userRouter = Router();

userRouter.route("/").get(Error400Handler)
.post(userController.createUserHandler);

// userRouter.post("/",userController.createUserHandler);

userRouter
  .route("/:id")
  .get(userController.readUserHandler)
  .delete(userController.deleteUserHandler)
  .put(userController.updateUserHandler);

userRouter.post("/login", userController.loginUserHandler);

export default userRouter;

function Error400Handler(req, res) {
  return res.sendStatus(401);
}
