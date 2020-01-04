const {readFile} = require('fs');
const head = require('./src/headLib').head;

const display = (headContent, err) => {
  
  process.stdout.write(headContent);
  process.stderr.write(err);
};

const main = function() {
  const [, , ...args] = [...process.argv];
  head(args, readFile, display, process.stdin);
};

main();
