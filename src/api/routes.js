const Router = require('koa-router');
const fs = require('fs-extra');
const path = require('path');

const { name, description, version } = require('./package.json');

const router = new Router({
  prefix: '/api/v1',
});

const userDefaultFile = path.resolve('./data/userDefault.json');
// cache users test data, undefined, not {}, as it controls data loading
let userDefaultDataJSON;

const loadUserDefaultData = async (reload = false) => {
  // only load if not loaded or reload called, otherwise return existing JSON
  if (userDefaultDataJSON && !reload) {
    return userDefaultDataJSON;
  }
  userDefaultDataJSON = await fs.readJSON(userDefaultFile);
  return userDefaultDataJSON;
};

router.get('/users', async (ctx) => {
  await loadUserDefaultData();
  if (!userDefaultDataJSON) {
    ctx.throw(404, 'No default users found');
  }
  // TODO: append user data from DB
  ctx.body = userDefaultDataJSON;
});

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

