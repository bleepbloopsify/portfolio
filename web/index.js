const path = require('path');

const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const Static = require('koa-static');
const views = require('koa-views');
const mount = require('koa-mount');
const cors = require('koa2-cors');
const helmet = require('koa-helmet');

const app = new Koa();
const router = new Router();

router.get('/', async ctx => {
  await ctx.render('layout.html');
});

const static = Static(path.join(__dirname, 'dist'));

app.use(logger());
app.use(mount('/static', static));

app.use(cors());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: [
      "'self'", 
    ],
    styleSrc: [
      "'self'", 
      'maxcdn.bootstrapcdn.com', 
      'fonts.googleapis.com', 
      "'unsafe-inline'"],
    scriptSrc: [
      "'self'",
      process.env.NODE_ENV == 'development' ? "'unsafe-eval'" : "",
      'code.jquery.com',
      'cdnjs.cloudflare.com',
      'stackpath.bootstrapcdn.com',
    ],
    fontSrc: [
      'fonts.gstatic.com',
    ],
    connectSrc: [
      process.env.APIHOST || 'https://api.localhost',
    ],
  }
}));
app.use(views(path.join(__dirname, 'views')));
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Listening!");
app.listen(process.env.PORT || 8080);