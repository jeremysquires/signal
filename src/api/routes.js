const Router = require('koa-router');
const fs = require('fs-extra');
const path = require('path');
const { find } = require('lodash');

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
  // TODO: append user data from other source
  ctx.body = userDefaultDataJSON;
});

router.get('/users/:login', async (ctx) => {
  const { login } = ctx.params;
  await loadUserDefaultData();
  if (!userDefaultDataJSON) {
    ctx.throw(404, 'No default users found');
  }
  // TODO: append user data from other source
  const user = find(userDefaultDataJSON, {
    "login": login
  });
  if (!user) {
    ctx.throw(404, `No user ${login} found`);
  }
  ctx.body = user;
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

