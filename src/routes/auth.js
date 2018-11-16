const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const {
  auth: { secret },
} = require('../config.js');

const User = require('../models/user.js');

const router = new Router();

router.post('/', async ctx => {
  const user = await User.where('username', ctx.request.body.username).fetch();
  const passwordValid = await user.comparePassword(ctx.request.body.password);

  if (!passwordValid) {
    ctx.status = 401;
    ctx.body = { message: 'Bad credentials' };
    return;
  }
  ctx.status = 200;
  ctx.body = {
    id: user.get('id'),
    token: jwt.sign({ id: user.get('id') }, secret),
    message: 'Successfully logged in',
  };
});

module.exports = router;
