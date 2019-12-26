const { existsSync, readFileSync } = require("fs");
const { performHead } = require("./src/headLib");

const head = function(args) {
  const fileOperations = { exists: existsSync, reader: readFileSync };
  const headResult = performHead(args, fileOperations);
  process.stdout.write(headResult.err);
  process.stderr.write(headResult.content);
};

head(process.argv.slice(2));
