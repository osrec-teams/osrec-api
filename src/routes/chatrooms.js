const Router = require('koa-router');
const Joi = require('joi');

const validate = require('../utils/validation.js');

const schema = require('../schemas/chatroom.js');
const ChatRoom = require('../models/chatroom.js');

const router = new Router();

const bodyValidatorIndex = Joi.object().keys({
  name: Joi.string().lowercase(),
});

router.get('/', validate(bodyValidatorIndex), async ctx => {
  try {
    const chatrooms = await ChatRoom.forge(ctx.request.body).fetch();
    ctx.status = 200;
    ctx.body = chatrooms;
  } catch (e) {
    ctx.status = 404;
  }
});

router.post('/', validate(schema), async ctx => {
  try {
    await ChatRoom.forge(ctx.request.body).save();
    ctx.status = 201;
  } catch (e) {
    ctx.status = /Key .* already exists\./.test(e.detail) ? 409 : 400;
    ctx.body = { message: e.detail };
  }
});

module.exports = router;
