import Joi  from "joi";


export const userSingupSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const userSinginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const loginWithGoogleOAuthSchema = Joi.object({
code: Joi.string().required(),
});