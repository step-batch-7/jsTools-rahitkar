const fs = require("fs");
const performHead = require("./src/headLib").performHead;

const writeToOutStream = data => console.log(data);
const writeToErrorStream = data => console.error(data);

const head = function(args) {
  const writer = { writeToOutStream, writeToErrorStream };
  performHead(args[0], fs.readFile, writer);
};

head(process.argv.slice(2));
