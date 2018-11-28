const Joi = require('joi');

module.exports = Joi.object().keys({
  name: Joi.string()
    .lowercase()
    .regex(/^[a-z]+$/)
    .max(20)
    .required(),
  description: Joi.string(),
});
