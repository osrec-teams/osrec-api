const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 8080;

const users = require('./routes/users.js');

app.use(bodyParser());

router.use('/users', users.routes()), users.use(users.allowedMethods());

app.use(router.routes(), router.allowedMethods());

app.listen(port);
