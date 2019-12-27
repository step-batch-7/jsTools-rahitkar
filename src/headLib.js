"use strict";
const filterTopFileLines = function(fileContent, lineNum) {
  const firstTenLineContents = fileContent.split("\n").slice(0, lineNum);
  return firstTenLineContents.join("\n");
};

const writeToScreen = function(err, data) {
  if (data) {
    this.writer.writeToOutStream(filterTopFileLines(data, this.lineNum));
  } else {
    this.writer.writeToErrorStream(
      `head: ${err.path}: No such file or directory`
    );
  }
};

const parseArgs = function(args) {
  if (args.includes("-n")) {
    return {
      lineNum: +args[args.lastIndexOf("-n") + 1],
      path: args.slice(-1)[0]
    };
  }
  return { lineNum: 10, path: args.slice(-1)[0] };
};

const performHead = function(args, reader, writer) {
  const userArgs = parseArgs(args);

  const lineNum = userArgs.lineNum;
  const encoding = "utf8";
  reader(userArgs.path, encoding, writeToScreen.bind({ writer, lineNum }));
};

module.exports = {
  performHead,
  writeToScreen,
  filterTopFileLines,
  parseArgs
};
