const { existsSync, readFileSync } = require("fs");
const { performHeadAction } = require("./src/headLib");

const head = args => {
  const fileOperations = { exists: existsSync, reader: readFileSync };

  const streams = { stdout: console.log, stderr: console.error };
  
  const stream = streams[performHeadAction(args, fileOperations).stream];
  const content = performHeadAction(args, fileOperations).lines;
  stream(content);
};

head(process.argv.slice(2));
