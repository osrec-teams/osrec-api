const Router = require('koa-router');
const jwt = require('../middlewares/jwt.js');

const router = new Router();

router.post('/', async ctx => {
  if (ctx.request.body.password === 'password') {
    ctx.status = 200;
    ctx.body = {
      token: jwt.sign({ role: 'user' }, 'Grab my terryfold'),
      message: 'Successfully logged in!',
    };
  } else {
    // console.log(ctx.request.body);
    ctx.status = 401;
    ctx.body = {
      message: 'Authentication failed',
    };
  }
  return ctx;
});

module.exports = router;
