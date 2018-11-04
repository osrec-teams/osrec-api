const Koa = require('koa');
const Router = require('koa-router');
const Joi = require('joi');

const router = new Router();

const validate = require('../utils/validation.js');
const User = require('../models/user.js');

const schema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  username: Joi.string()
    .alphanum()
    .required(),
  password: Joi.string().required(),
});

router.post('/', validate(schema), async ctx => {
  try {
    await User.forge(ctx.request.body).save();
    ctx.status = 201;
  } catch (e) {
    ctx.status = 400;
    ctx.body = e.message;
    return;
  }
});

module.exports = router;
