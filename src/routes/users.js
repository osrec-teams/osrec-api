const Koa = require('koa');
const Router = require('koa-router');

const router = new Router();

const User = require('../models/user.js');

router.post('/', async ctx => {
  try {
    await User.forge(ctx.request.body).save();
    ctx.status = 201;
  } catch {
    ctx.status = 400;
    return;
  }
});

module.exports = router;
