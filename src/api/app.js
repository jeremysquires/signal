const Koa = require('koa');
const error = require('koa-json-error');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const app = new Koa();
const router = require('./routes');

app.use(error(err => ({
  error: {
    message: err.message,
    name: err.name,
    status: err.status || 500,
  },
})));

app.use(bodyParser());
app.use(cors({
  // allow requests from local microservices: http://localhost:8081
  // TODO: make this a function of ctx to white/blacklist via rules
  // TODO: change origin to reflect origins in amazonaws once deployed
  // TODO: set to true to check ORIGIN headers
  origin: '*',
}));

app.use(router.routes()).use(router.allowedMethods());

// track the base router prefix through the app.context => ctx
app.context.prefix = router.opts.prefix;

module.exports = app;
