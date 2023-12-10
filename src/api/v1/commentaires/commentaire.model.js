import { Schema, model } from "mongoose";

const commmentaireSchema = Schema(
  {
    auteur: {
      type: Schema.ObjectId,
      ref: "User",
    },
    photo: {
      type: Schema.ObjectId,
      ref: "Photo",
    },
    commentaireId: {
      type: Schema.ObjectId,
    },
    texte: {
      type: String,
    },
    commentaire: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Commentaire = model("Commentaire", commmentaireSchema);

export default Commentaire;
