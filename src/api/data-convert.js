const toutf8 = require('to-utf-8');
const fs = require('fs');
const path = require('path');

const files = [
  'foods-en_ONPP_rev.csv',
  'fg_directional_satements-en_ONPP.csv',
  'foodgroups-en_ONPP.csv',
  'servings_per_day-en_ONPP.csv'
];
const rawDataPath = '../../data';
const utf8DataPath = '../../data/utf8';

files.forEach((file) => {
  const source = path.join(rawDataPath, file);
  const target = path.join(utf8DataPath, file);
  if (fs.existsSync(source)) {
    const reader = fs.createReadStream(source);
    const writer = fs.createWriteStream(target);
    // NOTE: not passing it an encoding causes an error in peek()
    const converter = toutf8('cp1252'); // cp1252 or iso-8859-1
    reader
      .pipe(converter)
      .pipe(writer);
  } else {
    console.log(`${source} does not exist`);
  }
});

