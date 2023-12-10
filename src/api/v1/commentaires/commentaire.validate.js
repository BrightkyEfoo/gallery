import Joi from "joi";

const commentaireValidate = Joi.object({
  auteur: Joi.string().required(),
  photo: Joi.string().required(),
  commentaireId: Joi.string(),
  texte: Joi.string().required()
});

export default commentaireValidate