const fs = require("fs");
const performHead = require("./src/headLib").performHead;

const writeToOutStream = data => process.stdout.write(data); //console.log(data);
const writeToErrorStream = data => process.stderr.write(data); //console.error(data);

const head = function(args) {
  const writer = { writeToOutStream, writeToErrorStream };
  performHead(args, fs.readFile, writer);
};

head(process.argv.slice(2));
