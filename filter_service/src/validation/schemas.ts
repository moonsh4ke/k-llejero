import Joi from "joi";

export const filterJoiSchema = Joi.object({
  body: Joi.object({
      name: Joi.string().required().min(1).max(30),
      description: Joi.string().required().min(10).max(30),
      keyword: Joi.array().optional(),
      active: Joi.boolean().required(),
  })
})
