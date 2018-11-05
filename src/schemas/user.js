const Joi = require('joi');

module.exports = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  username: Joi.string()
    .alphanum()
    .required(),
  password: Joi.string().required(),
});
