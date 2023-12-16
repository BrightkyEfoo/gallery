import Joi from "joi";

const photoValidate = Joi.object({
  auteur: Joi.string().required(),
  lien: Joi.string().required()
    .required()
    .pattern(new RegExp(/.(jpg|jpeg|png|gif|bmp)$/i)),
  description: Joi.string()
});

export default photoValidate