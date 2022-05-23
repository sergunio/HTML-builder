const fs = require('fs');
const path = require('path');

const dirFrom = path.join(__dirname, 'files');
const dirTo = path.join(__dirname, 'files-copy');

async function copyDir(fromDir, toDir) {
  await fs.promises.rm(toDir, { force: true, recursive: true });
  await fs.promises.mkdir(toDir, { recursive: true });

  const checkDir = await fs.promises.readdir(fromDir, { withFileTypes: true });

  for (let element of checkDir) {
    const elPath = path.join(fromDir, element.name);
    const elPathToCopy = path.join(toDir, element.name);

    if (element.isDirectory()) {
      await fs.promises.mkdir(elPathToCopy, { recursive: true });
      await copyDir(elPath, elPathToCopy);
    } else if (element.isFile()) {
      await fs.promises.copyFile(elPath, elPathToCopy);
    }
  }
}

copyDir(dirFrom, dirTo);
