import env from "dotenv";
import express from "express";
import morgan from "morgan";
import apiV1Router from "./api/v1/apiV1.routes.js";
import frontendRouter from "./frontend/frontend.routes.js";
import { dbInit } from "./api/v1/db/index.js";

// on lie le projet aux variables d'environnement
env.config();

// instanciation de l'application express
const app = express();

// les middleware
app.use(express.json()).use(morgan("dev"));

app.use("/", frontendRouter);
app.use("/api/v1", apiV1Router);

// branchement de l'application express sur le port prevu
app.listen(process.env.PORT, async () => {
  console.log(`Notre serveur tourne sur le port ${process.env.PORT}`);
  const dbMsg = await dbInit();
  if (dbMsg) console.log("Connexion a la base de donnee a reussie");
  else console.log("Connexion a la base de donnee a echouee");
});
