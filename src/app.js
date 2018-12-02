const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const Io = require('koa-socket-2');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();
const io = new Io();

const port = process.env.PORT || 8080;

const auth = require('./routes/auth.js');
const users = require('./routes/users.js');
const chatrooms = require('./routes/chatrooms.js');

app.use(cors());
app.use(bodyParser());

app.use(async (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  await next();
});

if (process.env.NODE_ENV === 'development') app.use(logger());

router.use('/users', users.routes(), users.allowedMethods());
router.use('/auth', auth.routes(), auth.allowedMethods());
router.use('/chatrooms', chatrooms.routes(), chatrooms.allowedMethods());

app.use(router.routes(), router.allowedMethods());

io.attach(app);
require('./socket.js')(app._io);

module.exports = app.listen(port);
