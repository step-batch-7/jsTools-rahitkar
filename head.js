const {readFile} = require('fs');
const performHead = require('./src/headLib').performHead;

const writeToOutStream = data => process.stdout.write(data);
const writeToErrorStream = data => process.stderr.write(data);

const head = function(args) {
  const writer = { writeToOutStream, writeToErrorStream };
  performHead(args, readFile, writer, process);
};

const unwantedSection = 2;
head(process.argv.slice(unwantedSection));
