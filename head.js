const { existsSync, readFileSync } = require("fs");
const { performHead } = require("./src/headLib");

const head = args => {
  const fileOperations = { exists: existsSync, reader: readFileSync };

  const streams = { out: console.log, err: console.error };

  const stream = streams[performHead(args, fileOperations).stream];
  const content = performHead(args, fileOperations).lines;
  stream(content);
};

head(process.argv.slice(2));
