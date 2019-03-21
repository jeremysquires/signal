const dataFiles = [
  'foods-en_ONPP_rev.csv',
  'fg_directional_satements-en_ONPP.csv',
  'foodgroups-en_ONPP.csv',
  'servings_per_day-en_ONPP.csv'
];

const rawDataPath = '../../data';
const utf8DataPath = '../../data/utf8';

const genderMap = {
  f: 'Female',
  m: 'Male',
  n: 'Female'
};

// given an age number, translate it to the corresponding valid CFG range
// TODO: make this adaptive to changes in range - read the guide for ranges, then define
const getAgeRange = (age) => {
  let ages = 'Undefined';
  if (!age) {
    return ages;
  }
  if (age >= 0 && age < 2) {
    ages = '0 to 2'; // invalid, will not return data
  } else if (age >= 2 && age < 4) {
    ages = '2 to 3';
  } else if (age >= 4 && age < 9) {
    ages = '4 to 8';
  } else if (age >= 9 && age < 14) {
    ages = '9 to 13';
  } else if (age >= 14 && age < 19) {
    ages = '14 to 18';
  } else if (age >= 19 && age < 31) {
    ages = '19 to 30';
  } else if (age >= 31 && age < 51) {
    ages = '31 to 50';
  } else if (age >= 51 && age < 71) {
    ages = '51 to 70';
  } else if (age >= 71) {
    ages = '71+';
  }
  return ages;
};

module.exports = {
  dataFiles,
  rawDataPath,
  utf8DataPath,
  genderMap,
  getAgeRange
};