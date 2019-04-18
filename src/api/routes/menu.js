const Router = require('koa-router');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const csvtojson = require('csvtojson');
const jmespath = require('jmespath');
const { uniqBy, sampleSize } = require('lodash');
const { innerJoin } = require("json-function");
const { dataFiles, utf8DataPath, genderMap, getAgeRange } = require('../helpers/canadaFoodGuide');
const { paramTruth } = require('../helpers/utils');

const router = new Router();

// cache for the canada food guide file contents
let canadaFoodGuideData;
let extraFoodGuideData;

const loadUserData = async (baseurl, login) => {
  let response;
  try {
    if (login) {
      response = await axios.get(`${baseurl}/users/${login}`);
    } else {
      response = await axios.get(`${baseurl}/users`);
    }
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    return;
  }
  return response.data;
};

const getExtraFoodGuideData = () => {
  // TODO: cache this data, store to external file, etc.
  const foodGroups = uniqBy(
    jmespath.search(canadaFoodGuideData, `foodgroups[*].{fgid: fgid, foodgroup: foodgroup}`),
    JSON.stringify
  );
  // change directional-statement keyname to allow jmespath to address a query
  const statementsCleaned = canadaFoodGuideData.fg_directional_satements.map((obj) => {
    return { "fgid": obj.fgid, "statement": obj['directional-statement'] };
  });
  const foodGroupsCodes = uniqBy(
    jmespath.search(canadaFoodGuideData, `foodgroups[*].fgid`),
    JSON.stringify
  );
  // return an array of statements per food group
  const statementsMapped = foodGroupsCodes.map((fgid) => {
    return {
      fgid,
      statements: jmespath.search(statementsCleaned, `[?fgid=='${fgid}'].statement`),
    };
  });
  // add the food group names
  const foodGroupsJoined = innerJoin(canadaFoodGuideData.foods, foodGroups, "fgid", "fgid");
  // add the food category names
  const foodCategoryJoined = innerJoin(foodGroupsJoined, canadaFoodGuideData.foodgroups, "fgcat_id", "fgcat_id");
  const foodChoices = foodCategoryJoined.reduce((previous, current) => {
    // foodGroup: { foodCategory: [ { food: blah, servingSize: blah } ] }
    if (!previous[current.foodgroup]) {
      previous[current.foodgroup] = {};
    }
    if (!previous[current.foodgroup][current.fgcat]) {
      previous[current.foodgroup][current.fgcat] = [];
    }
    previous[current.foodgroup][current.fgcat].push({
      food: current.food,
      servingSize: current.srvg_sz,
      foodGroup: current.foodgroup,
      foodCategory: current.fgcat,
    });
    return previous;
  }, {});
  extraFoodGuideData = {
    foodGroups,
    statementsMapped,
    foodChoices,
  };
  return extraFoodGuideData;
};

const loadCanadaFoodGuideData = async (convert = false, reload = false) => {
  // return the cached canada food guide file contents
  if (canadaFoodGuideData && !reload) {
    if (!extraFoodGuideData) {
      getExtraFoodGuideData();
    }
    return canadaFoodGuideData;
  }
  // if previously converted, return it
  const jsonFilePath = path.join(utf8DataPath, 'canadaFoodGuide.json');
  if (fs.existsSync(jsonFilePath) && !convert) {
    // TODO: add try catch here
    canadaFoodGuideData = await fs.readJson(jsonFilePath);
    if (!extraFoodGuideData) {
      getExtraFoodGuideData();
    }
    return canadaFoodGuideData;
  }
  console.log('Fetching and converting Canada food quide data.'); // eslint-disable-line no-console
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
  getExtraFoodGuideData();
  // save the results of conversion for next server start
  try {
    await fs.writeJson(jsonFilePath, result);
  } catch (err) {
    console.error(err);  // eslint-disable-line no-console
  }  
  return result;
};

const maxServings = (servingRange) => {
  const servingRe = /to (\d+)/i;
  const found = servingRange.match(servingRe);
  if (found && found.length > 1) {
    return parseInt(found[1], 10);
  }
  return parseInt(servingRange);
};

const getMenu = (user) => {
  // retrieve extra generated structures
  const {
    foodGroups,
    statementsMapped,
    foodChoices,
  } = extraFoodGuideData;

  // extract servings relevant to user's age and gender
  const mappedGender = genderMap[user.gender];
  const ageRange = getAgeRange(user.age);
  const servingsPerDay = jmespath
    .search(canadaFoodGuideData,
    `servings_per_day[?gender=='${mappedGender}' && ages=='${ageRange}']`);

  // add food group name using SQL like join on fgid
  const servingsJoined = innerJoin(servingsPerDay, foodGroups, "fgid", "fgid");

  // add directional statements per food group
  const statementsJoined = innerJoin(servingsJoined, statementsMapped, "fgid", "fgid");
  const servingsPerFoodGroup = statementsJoined.map((obj) => {
    return {
      foodGroup: obj.foodgroup,
      servings: obj.servings,
      statements: obj.statements,
      maxServings: maxServings(obj.servings)
    }
  });

  // create a list of food choices to potentially include in the menu
  const foodSelections = servingsPerFoodGroup.reduce((previous, current) => {
    // flatten the food categories into a blended array
    const foodsArray = jmespath.search(foodChoices[current.foodGroup], '*[][]');
    // limit the number of food choices, making the choices randomly
    const randomChoices = sampleSize(foodsArray, current.maxServings);
    previous.push({
      foodGroup: current.foodGroup,
      foods: randomChoices,
    });
    return previous;
  }, []);

  // TODO: save the results to ensure the next use has variation

  const result = {
    login: user.login,
    servingsPerFoodGroup,
    foodSelections,
  };
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
  const result = getMenu(user);
  ctx.body = result;
});

router.get('/:login', async (ctx) => {
  const { login } = ctx.params;
  const { convert, reload, family } = ctx.query;
  const baseurl = `${ctx.protocol}://${ctx.request.header.host}${ctx.prefix}`;
  await loadCanadaFoodGuideData(paramTruth(convert), paramTruth(reload));
  const user = await loadUserData(baseurl, login);
  if (!user) {
    ctx.throw(404, `No user ${login} found`);
  }
  let result = getMenu(user);
  if (paramTruth(family)) {
    // returns array of menus
    result = [ result ];
    const dataPromises = user.family.map(async (memberLogin) => {
      const familyMember = await loadUserData(baseurl, memberLogin);
      return getMenu(familyMember);
    });
    // reap the data
    const familyMenus = await Promise.all(dataPromises);
    result.push(...familyMenus);
  }
  ctx.body = result;
});

module.exports = router;

