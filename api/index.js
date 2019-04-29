const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const cors = require('koa2-cors');

const app = new Koa();
const router = new Router();

const server = require('./schema');

router.get('/', async ctx => {

  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  ctx.body = {
    success: true,
  };
});


app.use(logger());
server.applyMiddleware({ app }); // /graphql

app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Listening!");
app.listen(process.env.PORT || 8080);

