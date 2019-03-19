const Koa = require('koa');
const Router = require('koa-router');
const error = require('koa-json-error');
const bodyParser = require('koa-bodyparser');

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

app.use(router.routes()).use(router.allowedMethods());

module.exports = app;