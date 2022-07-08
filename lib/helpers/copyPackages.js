const { readFileSync, writeFileSync, rmSync } = require('fs');

const isObject = (item) => {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {
          [key]: {}
        });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key]
        });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

function copyPackages(appPath, variantPath, corePath, projectPath) {
  let appPackageFilePath = `${appPath}/package.json`;
  let appPackageLockFilePath = `${appPath}/package-lock.json`;
  let variantPackageFilePath = variantPath ? `${appPath}/package.json` : null;
  let variantPackageLockFilePath = variantPath ?`${appPath}/package-lock.json` : null;
  let corePackageFilePath = `${corePath}/package.json`;
  let corePackageLockFilePath = `${corePath}/package-lock.json`;
  let projectPackageFilePath = `${projectPath}/package.json`;
  let projectPackageLockFilePath = `${projectPath}/package-lock.json`;
  rmSync(projectPackageFilePath);
  rmSync(projectPackageLockFilePath);

  const appPackageFileContent = JSON.parse(readFileSync(appPackageFilePath, 'utf8'));
  const variantPackageFileContent = variantPath ? JSON.parse(readFileSync(appPackageFilePath, 'utf8')) : {};
  const corePackageFileContent = JSON.parse(readFileSync(corePackageFilePath, 'utf8'));
  const packageContent = JSON.stringify(mergeDeep(corePackageFileContent, appPackageFileContent, variantPackageFileContent), null, 2);
  
  const appPackageLockFileContent = JSON.parse(readFileSync(appPackageLockFilePath, 'utf8'));
  const variantPackageLockFileContent = variantPath ? JSON.parse(readFileSync(appPackageLockFilePath, 'utf8')) : {};
  const corePackageLockFileContent = JSON.parse(readFileSync(corePackageLockFilePath, 'utf8'));
  const packageLockContent = JSON.stringify(mergeDeep(corePackageLockFileContent, appPackageLockFileContent, variantPackageLockFileContent), null, 2);
  
  writeFileSync(projectPackageFilePath, packageContent);
  writeFileSync(projectPackageLockFilePath, packageLockContent);
}

module.exports = copyPackages;
