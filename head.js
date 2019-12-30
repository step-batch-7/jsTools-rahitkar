const fs = require('fs');
const performHead = require('./src/headLib').performHead;

const writeToOutStream = data => process.stdout.write(data);
const writeToErrorStream = data => process.stderr.write(data);

const head = function(args) {
  const writer = { writeToOutStream, writeToErrorStream };
  performHead(args, fs.readFile, writer);
};

const unwantedSection = 2;
head(process.argv.slice(unwantedSection));
