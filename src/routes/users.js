const Router = require('koa-router');

const validate = require('../utils/validation.js');

const schema = require('../schemas/user.js');
const User = require('../models/user.js');

const router = new Router();

router.post('/', validate(schema), async ctx => {
  try {
    await User.forge(ctx.request.body).save();
    ctx.status = 201;
  } catch (e) {
    ctx.status = /Key .* already exists\./.test(e.detail) ? 409 : 400;
    ctx.body = { message: e.detail };
  }
});

module.exports = router;
