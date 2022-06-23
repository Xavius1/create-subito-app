const { opendir } = require('fs/promises');
const { readFileSync, writeFileSync, rmSync, renameSync } = require('fs');
const replaceAlias = require('./replaceAlias.js');

async function setAlias(names, path) {
  try {
    const dir = await opendir(path);
    for await (const dirent of dir) {
      const origin = `${path}/${dirent.name}`;
      const dest = `${path}/${replaceAlias(dirent.name, names)}`
      if (dirent.isDirectory()) {
        renameSync(origin, dest);
        // console.log('mv ' + origin + ' to ' + dest);
        setAlias(names, dest);
      } else {
        let content = replaceAlias(
          readFileSync(origin, 'utf8'),
          names
        );
        rmSync(origin)
        writeFileSync(dest, content);
        // console.log('mv ' + origin + ' to ' + dest);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = setAlias;
