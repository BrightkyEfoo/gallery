import { Router } from "express";

const frontendRouter = Router();

frontendRouter.get("/", (req, res) => {
  res.send("frontend");
});

// routes register login dashboard

export default frontendRouter;
