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

function copyPackages(appPath, corePath, projectPath) {
  const appPackageFilePath = `${appPath}/package.json`;
  const appPackageLockFilePath = `${appPath}/package-lock.json`;
  const corePackageFilePath = `${corePath}/package.json`;
  const corePackageLockFilePath = `${corePath}/package-lock.json`;
  const projectPackageFilePath = `${projectPath}/package.json`;
  const projectPackageLockFilePath = `${projectPath}/package-lock.json`;
  rmSync(projectPackageFilePath);
  rmSync(projectPackageLockFilePath);

  appPackageFileContent = JSON.parse(readFileSync(appPackageFilePath, 'utf8'));
  corePackageFileContent = JSON.parse(readFileSync(corePackageFilePath, 'utf8'));
  const packageContent = JSON.stringify(mergeDeep(corePackageFileContent, appPackageFileContent), null, 2);
  
  appPackageLockFileContent = JSON.parse(readFileSync(appPackageLockFilePath, 'utf8'));
  corePackageLockFileContent = JSON.parse(readFileSync(corePackageLockFilePath, 'utf8'));
  const packageLockContent = JSON.stringify(mergeDeep(corePackageLockFileContent, appPackageLockFileContent), null, 2);
  
  writeFileSync(projectPackageFilePath, packageContent);
  writeFileSync(projectPackageLockFilePath, packageLockContent);
}

module.exports = copyPackages;
