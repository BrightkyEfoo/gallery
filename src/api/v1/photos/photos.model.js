import mongoose, { Schema, model } from "mongoose";
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
    createdAt: String,
    updatedAt: String,
  }
  // ,
  // { timestamps: true }
);

var autoPopulateChildren = function (next) {
  this.populate({
    path: "comments",
    populate: {
      path: "auteur",
      model: "User",
    },
  });
  next();
};

SchemaPhotos.pre("findOne", autoPopulateChildren).pre(
  "find",
  autoPopulateChildren
);
const Photo = mongoose.model("Photo", SchemaPhotos);

export default Photo;
