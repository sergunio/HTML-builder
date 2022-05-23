const fs = require('fs');
const path = require('path');

const createDir = path.join(__dirname, 'project-dist');
const createAssets = path.join(createDir, 'assets');
const createCss = path.join(createDir, 'style.css');
const createHtml = path.join(createDir, 'index.html');

const dirComp = path.join(__dirname, 'components');
const dirAssets = path.join(__dirname, 'assets');
const dirCss = path.join(__dirname, 'styles');
const dirHtml = path.join(__dirname, 'template.html');

async function createNewDir(input) {
  fs.access(createDir, (error) => {
    if (error) {
      fs.promises.mkdir(input);
    }
  });
}

async function mergeStyles() {
  const checkDir = await fs.promises.readdir(dirCss, { withFileTypes: true });
  const styles = [];
  for (let element of checkDir) {
    const elPath = path.join(dirCss, element.name);
    const fileType = path.extname(elPath);
    
    if (fileType === '.css') {
      const readCss = await fs.promises.readFile(elPath, 'utf8');
      styles.push(`${readCss}\n\n`);
    }
  }
    
  await fs.promises.writeFile(createCss, styles);
    
}

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

async function insertData(){
  let newHtml = await fs.promises.readFile(dirHtml, 'utf-8');
  const checkDir = await fs.promises.readdir(dirComp, { withFileTypes: true });

  for (let element of checkDir){
    const existHtml = await fs.promises.readFile(path.join(dirComp, `${element.name}`), 'utf8');
    newHtml = newHtml.replace(`{{${(element.name).split('.')[0]}}}`, existHtml);
  }
  await fs.promises.writeFile(createHtml, newHtml);
}

async function createPage(){
  createNewDir(createDir);
  mergeStyles();
  copyDir(dirAssets, createAssets);
  insertData();
}

createPage();