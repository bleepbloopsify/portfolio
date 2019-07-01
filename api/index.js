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

app.use(logger());
app.use(cors({ origin: '*' }));

// app.use(async (ctx, next) => {

//   await new Promise(resolve => {
//     setTimeout(resolve, 1000);
//   });

//   await next();
// });

app.use(async (ctx, next) => {
  if (ctx.headers.authorization) {
    const token = ctx.headers.authorization.split(' ')[1];
    try {
      const { id, is_admin } = await verifyToken(token);
      ctx.account = { id, is_admin };
    } catch {}
  }

  await next();
});

server.applyMiddleware({ app }); // /graphql

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Listening!");
app.listen(process.env.PORT || 8080);

