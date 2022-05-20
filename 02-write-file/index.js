const fs = require('fs');
const path = require('path');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
rl.write('Please, enter something\n');
rl.on('line', (line) => {
  writeStream.write(`${line}\n`, error =>{
    if (error) throw error;
  });
  if (line === 'exit') rl.close();
});

rl.on('close', () => {
  rl.write('thanks for checking the code!');
  process.exit();
});

process.on('SIGINT', () =>{
  console.log('thanks for checking the code!');
  process.exit();
});

