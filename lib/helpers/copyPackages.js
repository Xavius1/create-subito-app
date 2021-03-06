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
  const appPackageFilePath = `${appPath}/package.json`;
  const appPackageLockFilePath = `${appPath}/package-lock.json`;
  const variantPackageFilePath = variantPath ? `${variantPath}/package.json` : null;
  const variantPackageLockFilePath = variantPath ? `${variantPath}/package-lock.json` : null;
  const corePackageFilePath = `${corePath}/package.json`;
  const corePackageLockFilePath = `${corePath}/package-lock.json`;
  const projectPackageFilePath = `${projectPath}/package.json`;
  const projectPackageLockFilePath = `${projectPath}/package-lock.json`;
  rmSync(projectPackageFilePath);
  rmSync(projectPackageLockFilePath);

  const appPackageFileContent = JSON.parse(readFileSync(appPackageFilePath, 'utf8'));
  const variantPackageFileContent = variantPath ? JSON.parse(readFileSync(variantPackageFilePath, 'utf8')) : {};
  const corePackageFileContent = JSON.parse(readFileSync(corePackageFilePath, 'utf8'));
  let mergedPC = mergeDeep(corePackageFileContent, appPackageFileContent);
  mergedPC = mergeDeep(mergedPC, variantPackageFileContent);
  const packageContent = JSON.stringify(mergedPC, null, 2);
  
  // const appPackageLockFileContent = JSON.parse(readFileSync(appPackageLockFilePath, 'utf8'));
  // const variantPackageLockFileContent = variantPath ? JSON.parse(readFileSync(variantPackageLockFilePath, 'utf8')) : {};
  // const corePackageLockFileContent = JSON.parse(readFileSync(corePackageLockFilePath, 'utf8'));
  // let mergedPLC = mergeDeep(corePackageLockFileContent, appPackageLockFileContent);
  // mergedPLC = mergeDeep(mergedPLC, variantPackageLockFileContent);
  // const packageLockContent = JSON.stringify(mergedPLC, null, 2);
  
  writeFileSync(projectPackageFilePath, packageContent);
  // writeFileSync(projectPackageLockFilePath, packageLockContent);
}

module.exports = copyPackages;
