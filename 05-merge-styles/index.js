const fs = require('fs');
const path = require('path');
const dirFrom = path.join(__dirname, 'styles');
const dirTo = path.join(__dirname, 'project-dist', 'bundle.css');


(async () => {
  const checkDir = await fs.promises.readdir(dirFrom, { withFileTypes: true });
  const styles = [];
  for (let element of checkDir) {
    const elPath = path.join(dirFrom, element.name);
    const fileType = path.extname(elPath);

    if (fileType === '.css') {
      const readCss = await fs.promises.readFile(elPath, 'utf8');
      styles.push(`${readCss}\n`);
    }
  }

  await fs.promises.writeFile(dirTo, styles);
})();