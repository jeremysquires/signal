const Router = require('koa-router');
const axios = require('axios');
const { find } = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const csvtojson = require('csvtojson');
const { dataFiles, utf8DataPath } = require('../data/canadaFoodGuide');

const router = new Router();

// cache for the canada food guide file contents
let canadaFoodGuideData;

const loadUserData = async (baseurl, login) => {
  let response;
  try {
    if (login) {
      response = await axios.get(`${baseurl}/users/${login}`);
    } else {
      response = await axios.get(`${baseurl}/users`);
    }
  } catch (error) {
    console.error(error);
    return;
  }
  return response.data;
};

const loadCanadaFoodGuideData = async (convert = false, reload = false) => {
  // return the cached canada food guide file contents
  if (canadaFoodGuideData && !reload) {
    return canadaFoodGuideData;
  }
  // if previously converted, return it
  const jsonFilePath = path.join(utf8DataPath, 'canadaFoodGuide.json');
  if (fs.existsSync(jsonFilePath) && !convert) {
    canadaFoodGuideData = await fs.readJson(jsonFilePath);
    return canadaFoodGuideData;
  }
  console.log('Fetching and converting Canada food quide data.');
  const result = {};
  const dataPromises = dataFiles.map((fileName) => {
    const csvFilePath = path.join(utf8DataPath, fileName);
    return csvtojson()
      .fromFile(csvFilePath)
      .then((fileJSON) => {
        return { fileName, contents: fileJSON };
      });
  });
  const allFiles = await Promise.all(dataPromises);
  const afterDashRe = /-.+$/;
  allFiles.forEach((file) => {
    result[file.fileName.replace(afterDashRe, '')] = file.contents;
  });
  canadaFoodGuideData = result;
  // save the results of conversion for next server start
  try {
    await fs.writeJson(jsonFilePath, result);
  } catch (err) {
    console.error(err)
  }  
  return result;
};

router.get('/', async (ctx) => {
  const { convert, reload } = ctx.query;
  const baseurl = `${ctx.protocol}://${ctx.request.header.host}${ctx.prefix}`;
  await loadCanadaFoodGuideData(convert, reload);
  const userDataJSON = await loadUserData(baseurl);
  if (!userDataJSON) {
    ctx.throw(404, 'No users found');
  }
  // TODO: add a "default" or average user?
  // OR return a menu for all users, or a random user?
  const user = find(userDataJSON, {
    "login": "Admin"
  });
  ctx.body = user;
});

router.get('/:login', async (ctx) => {
  const { login } = ctx.params;
  const { convert, reload } = ctx.query;
  const baseurl = `${ctx.protocol}://${ctx.request.header.host}${ctx.prefix}`;
  await loadCanadaFoodGuideData(convert, reload);
  const userDataJSON = await loadUserData(baseurl, login);
  if (!userDataJSON) {
    ctx.throw(404, `No user ${login} found`);
  }
  const user = find(userDataJSON, {
    "login": login
  });
  if (!user) {
    ctx.throw(404, `No user ${login} found`);
  }
  ctx.body = user;
});

module.exports = router;

