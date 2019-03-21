const toutf8 = require('to-utf-8');
const fs = require('fs-extra');
const path = require('path');
const { dataFiles, rawDataPath, utf8DataPath } = require('../helpers/canadaFoodGuide');

dataFiles.forEach((file) => {
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
    console.log(`${source} does not exist`); // eslint-disable-line no-console
  }
});

