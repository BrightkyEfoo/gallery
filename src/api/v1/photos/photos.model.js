import mongoose, { Schema } from "mongoose";
const SchemaPhotos = new mongoose.Schema(
  {
    auteur: {
      type: Schema.ObjectId,
      ref: "User",
    },
    lien: {
      type: String,
      require: false,
    },
    description: String,
    commentaires: [Schema.Types.ObjectId],
    comments: [
      {
        comment: String,
        date: Date,
        auteur: Schema.Types.ObjectId,
        comments: Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true }
);

const Photo = mongoose.model("Photo", SchemaPhotos);

export default Photo;
