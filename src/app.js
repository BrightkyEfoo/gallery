import cors from "cors";
import env from "dotenv";
import express from "express";
import morgan from "morgan";
import * as url from "url";
import apiV1Router from "./api/v1/apiV1.routes.js";
import { dbInit } from "./api/v1/db/index.js";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
// on lie le projet aux variables d'environnement
env.config();

// instanciation de l'application express
const app = express();

// les middleware
app
  .use(
    cors({
      origin: "http://localhost:1234",
    })
  )
  .use(express.json())
  .use(morgan("dev"))
  .use(express.static("frontend"))

  .use("/public", express.static("public"));

app.use("/api/v1", apiV1Router);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend/index.html"));
});
// branchement de l'application express sur le port prevu
app.listen(process.env.PORT, async () => {
  console.log(`Notre serveur tourne sur le port ${process.env.PORT}`);
  const dbMsg = await dbInit();
  if (dbMsg) console.log("Connexion a la base de donnee a reussie");
  else console.log("Connexion a la base de donnee a echouee");
});
