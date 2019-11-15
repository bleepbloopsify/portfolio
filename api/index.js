const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const cors = require('koa2-cors');

const app = new Koa();
const router = new Router();

const server = require('./schema');

const { verifyToken } = require('./controllers/Accounts');

router.get('/', async ctx => {

  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  ctx.body = {
    success: true,
  };
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.use(logger());
app.use(cors({ origin: process.env.CLIENT_HOST || 'http://localhost:3000', credentials: true }));

// app.use(async (ctx, next) => {

//   await new Promise(resolve => {
//     setTimeout(resolve, 1000);
//   });

//   await next();
// });

app.use(async (ctx, next) => {
  const jwt = ctx.cookies.get('jwt');
  if (jwt) {
    try {
      const { id, is_admin } = await verifyToken(jwt);
      // eslint-disable-next-line require-atomic-updates
      ctx.account = { id, is_admin };
    } catch (err){
      ctx.app.emit('error', err);
    }
  }

  await next();
});

server.applyMiddleware({ app }); // /graphql

app.use(router.routes());
app.use(router.allowedMethods());

console.log('Listening!');

app.on('error', err => {
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
  */

  console.log(err);
});

app.proxy = true;
app.listen(process.env.PORT || 8080);

