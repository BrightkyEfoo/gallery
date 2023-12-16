import { Router } from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendRouter = Router();

frontendRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "/client/public/index.html"));
});

// routes register login dashboard

export default frontendRouter;
