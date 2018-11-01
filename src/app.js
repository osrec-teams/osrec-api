const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 8080;

router.get('/', async ctx => {
  ctx.body = 'Hello World';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port);
