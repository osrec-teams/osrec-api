const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const validate = require('../utils/validation');

const {
  auth: { secret },
} = require('../config.js');

const schema = require('../schemas/auth.js');
const User = require('../models/user.js');

const router = new Router();

const badCredentials = ctx => {
  ctx.status = 401;
  ctx.body = { message: 'Bad credentials' };
};

router.post('/', validate(schema), async ctx => {
  const user = await User.where('username', ctx.request.body.login).fetch();
  if (user === null) {
    return badCredentials(ctx);
  }
  const passwordValid = await user.comparePassword(ctx.request.body.password);
  if (!passwordValid) {
    return badCredentials(ctx);
  }
  ctx.status = 200;
  ctx.body = {
    id: user.get('id'),
    token: jwt.sign({ id: user.get('id') }, secret),
    message: 'Successfully logged in',
  };
  return ctx;
});

module.exports = router;
