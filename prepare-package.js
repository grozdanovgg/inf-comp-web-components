const { ensureDir, copy, outputJson } = require('fs-extra');
const packageJson = require('./package.json');
const klawSync = require('klaw-sync');

async function prepareFolders() {
  await ensureDir('dist/package/');
}

async function copyPackageRequisits() {

  const exportableWebComponents = klawSync('dist/build', { nofile: true })
    .map(folders => folders.path.split('/').pop());

  await Promise
    .all(exportableWebComponents.map(customElementName => {
      return new Promise((resolve, reject) => {
        const path = `dist/build/${customElementName}/main.js`;

        copy(path, `dist/package/${customElementName}.js`)
          .then(() => resolve())
          .catch(() => reject());
      });
    }))
    .catch(err => {
      console.log(err);
    });

  await copy('README.md', 'dist/package/README.md');
  await outputJson('dist/package/package.json', getSimplifiedPackageJson(packageJson));
}

function getSimplifiedPackageJson({ name, version, description, repository }) {
  return {
    name,
    version,
    description,
    repository
  };
}

(async () => {
  await prepareFolders();
  await copyPackageRequisits();
})();

