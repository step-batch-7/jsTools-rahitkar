const {readFile} = require('fs');
const head = require('./src/headLib').head;

const display = headContent => {
  
  process.stdout.write(headContent.data);
  process.stderr.write(headContent.err);
};

const main = function() {
  const [, , ...args] = [...process.argv];
  head(args, readFile, display, process.stdin);
};

main();
