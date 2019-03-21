const Router = require('koa-router');
const fs = require('fs-extra');
const path = require('path');
const jmespath = require('jmespath');

const router = new Router();

const userDefaultFile = path.resolve('./data/userDefault.json');
// cache users test data, undefined, not {}, as it controls data loading
let userDefaultDataJSON;
let userDataJSON;

const loadUserDefaultData = async (reload = false) => {
  // only load if not loaded or reload called, otherwise return existing JSON
  if (userDefaultDataJSON && !reload) {
    return userDefaultDataJSON;
  }
  userDefaultDataJSON = await fs.readJSON(userDefaultFile);
  return userDefaultDataJSON;
};

const loadUserData = async (reload = false) => {
  // only load if not loaded or reload called, otherwise return existing JSON
  if (userDataJSON && !reload) {
    return userDataJSON;
  }
  // TODO: append user data from other source
  userDataJSON = userDefaultDataJSON;
  return userDataJSON;
};

router.get('/', async (ctx) => {
  await loadUserDefaultData();
  if (!userDefaultDataJSON) {
    ctx.throw(404, 'No default users found');
  }
  await loadUserData();
  ctx.body = userDataJSON;
});

router.get('/:login', async (ctx) => {
  const { login } = ctx.params;
  // TODO: verify login against authentication server
  // store login in ctx state for downstream use
  ctx.state.login = login;
  await loadUserDefaultData();
  if (!userDefaultDataJSON) {
    ctx.throw(404, 'No default users found');
  }
  await loadUserData();
  const user = jmespath.search(userDataJSON, `[?login=='${login}'] | [0]`);
  if (!user) {
    ctx.throw(404, `No user ${login} found`);
  }
  ctx.body = user;
});

module.exports = router;

