const Joi = require('joi');

module.exports = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().required(),
});
