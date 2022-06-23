const { opendir } = require('fs/promises');
const ucfirst = require('./ucfirst.js');

function getNames(repoName) {
  try {
    const parts = repoName.split('-');
    const partsUcf = [];
    parts.forEach((part, index) => {
      partsUcf.push(ucfirst(part));
    });
    const name = parts.join('');
    const names = {
      rn: repoName, // repo name
      cn: partsUcf.join(''), // class name
      fn: parts[0] + partsUcf.slice(1).join(''), // function name
      lc: name.toLowerCase(), // name lower case
      uc: name.toUpperCase() // name upper case
    }

    return names;
  } catch (err) {
    console.error(err);
  }
}

module.exports = getNames;
