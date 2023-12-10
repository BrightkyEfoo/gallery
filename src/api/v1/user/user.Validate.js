import Joi from "joi";

const userValidate = Joi.object({
  nom: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  motDePasse: Joi.string().min(7)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  repeat_password: Joi.ref("motDePasse"),
  photoDeProfil: Joi.string()
    .pattern(new RegExp(/.(jpg|jpeg|png|gif|bmp)$/i)),
});

export default userValidate;
