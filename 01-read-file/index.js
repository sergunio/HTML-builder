const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');

let data = '';
readStream.on('data', chunk => data += chunk);
readStream.on('end', () => console.log(data));
readStream.on('error', error => console.log('Error', error.message));