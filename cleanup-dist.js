const { remove, ensureDir } = require('fs-extra');
const concat = require('concat');

async function cleanUp() {
  await remove('dist/');
  await ensureDir('dist/');
}

(async () => {
  await cleanUp();
})();

