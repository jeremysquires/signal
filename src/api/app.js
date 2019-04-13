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
  // allow requests from services, white/blacklisted via origin rules
  origin: (request) => {
    const origin = request.header.origin || request.header.host;
    if (origin.match(/localhost(:\d+)?$|\.amazonaws\.com(:\d+)?$/)) {
      return '*';
    }
    return false;
  },
}));

app.use(router.routes()).use(router.allowedMethods());

// track the base router prefix through the app.context => ctx
app.context.prefix = router.opts.prefix;

module.exports = app;
