const Router = require('koa-router');
const axios = require('axios');
const { find } = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const csvtojson = require('csvtojson');
const jmespath = require('jmespath');
const { dataFiles, utf8DataPath, genderMap, getAgeRange } = require('../helpers/canadaFoodGuide');
const { paramTruth } = require('../helpers/utils');

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
    // TODO: add try catch here
    canadaFoodGuideData = await fs.readJson(jsonFilePath);
    return canadaFoodGuideData;
  }
  console.log('Fetching and converting Canada food quide data.');
  // load the data files in parallel (could be large)
  // TODO: load latest from web site
  const dataPromises = dataFiles.map((fileName) => {
    const csvFilePath = path.join(utf8DataPath, fileName);
    return csvtojson()
      .fromFile(csvFilePath)
      .then((fileJSON) => {
        return { fileName, contents: fileJSON };
      });
  });
  // reap the data
  const allFiles = await Promise.all(dataPromises);
  // shorten the JSON structure indexes
  // TODO: get the lang attribute from the filename for L10N (example: en)
  const afterDashRe = /-.+$/;
  const result = {};
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

// return a menu for a "default" or average user
router.get('/', async (ctx) => {
  const { convert, reload } = ctx.query;
  const baseurl = `${ctx.protocol}://${ctx.request.header.host}${ctx.prefix}`;
  await loadCanadaFoodGuideData(paramTruth(convert), paramTruth(reload));
  const userDataJSON = await loadUserData(baseurl);
  if (!userDataJSON) {
    ctx.throw(404, 'No users found');
  }
  const defaultLogin = 'Admin';
  const user = jmespath.search(userDataJSON, `[?login=='${defaultLogin}'] | [0]`);
  if (!user) {
    ctx.throw(404, 'No default user found');
  }
  ctx.body = user;
});

// TODO: add ?family
router.get('/:login', async (ctx) => {
  const { login } = ctx.params;
  const { convert, reload } = ctx.query;
  const baseurl = `${ctx.protocol}://${ctx.request.header.host}${ctx.prefix}`;
  await loadCanadaFoodGuideData(paramTruth(convert), paramTruth(reload));
  const user = await loadUserData(baseurl, login);
  if (!user) {
    ctx.throw(404, `No user ${login} found`);
  }
  const mappedGender = genderMap[user.gender];
  const ageRange = getAgeRange(user.age);
  const servingsPerDay = jmespath.search(canadaFoodGuideData,
    `servings_per_day[?gender=='${mappedGender}' && ages=='${ageRange}']`);
  // TODO: replace fgid with food group name
  ctx.body = servingsPerDay;
});

module.exports = router;

