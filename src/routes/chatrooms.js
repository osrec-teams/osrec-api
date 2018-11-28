const Router = require('koa-router');
const Joi = require('joi');

const { validateBody, validateQuery } = require('../utils/validation.js');

const schema = require('../schemas/chatroom.js');
const ChatRoom = require('../models/chatroom.js');

const router = new Router();

const bodyValidatorIndex = Joi.object().keys({
  name: Joi.string().lowercase(),
});

router.get('/', validateQuery(bodyValidatorIndex), async ctx => {
  const chatrooms = await ChatRoom.forge(ctx.request.query).fetch();
  if (chatrooms === null) {
    ctx.status = 404;
    return;
  }
  ctx.status = 200;
  ctx.body = chatrooms;
});

router.get('/:id', async ctx => {
  const chatroom = await ChatRoom.forge({ id: ctx.params.id }).fetch();
  if (chatroom === null) {
    ctx.status = 404;
    return;
  }
  ctx.status = 200;
  ctx.body = chatroom;
});

router.post('/', validateBody(schema), async ctx => {
  try {
    await ChatRoom.forge(ctx.request.body).save();
    ctx.status = 201;
  } catch (e) {
    ctx.status = /Key .* already exists\./.test(e.detail) ? 409 : 400;
    ctx.body = { message: e.detail };
  }
});

module.exports = router;
