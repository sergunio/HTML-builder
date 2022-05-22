const fs = require('fs');
const path = require('path');

const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir((pathToFolder), {withFileTypes: true}, (err, file) => {
  if (err) console.log(err);
  file.forEach(element => {
    if(element.isFile()) {
      fs.stat(path.join(pathToFolder, element.name), (err, stats) =>{
        if (err) console.log(err); 
        const ext = path.extname(element.name); 
        const name = element.name.slice(0, -ext.length); 
        // console.log('${name}' - '${ext}' - '${stats.size}'); 
        console.log(`${name} - ${ext.slice(1)} - ${stats.size}b`);
      });
    }
  });
});