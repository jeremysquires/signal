const Router = require('koa-router');

const { name, description, version } = require('./package.json');
const users = require('./routes/users');
const menu = require('./routes/menu');

const router = new Router({
  prefix: '/api/v1',
});

router.use('/users', users.routes(), users.allowedMethods());
router.use('/menu', menu.routes(), menu.allowedMethods());

// affordances
router.get('/', (ctx) => {
  ctx.body = {
    name,
    description,
    version,
    endpoints: router.stack.map(({ path: p }) => p),
  };
});

module.exports = router;

