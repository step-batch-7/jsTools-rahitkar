const filterTopFileLines = fileContent => {
  const firstTenLineContents = fileContent.split("\n").slice(0, 10);
  return firstTenLineContents.join("\n");
};

const getContents = (exists, reader, filePath) => {
  if (exists(filePath)) {
    return { content: reader(filePath, "utf8"), exists: true };
  }

  return { content: `file ${filePath} not found`, exists: false };
};

const parseArgs = (args, fileOperations) => {
  return {
    reader: fileOperations.reader,
    exists: fileOperations.exists,
    path: `${args[0]}`
  };
};

const performHeadAction = (args, fileOperations) => {
  const userArgs = parseArgs(args, fileOperations);
  const contents = getContents(userArgs.exists, userArgs.reader, userArgs.path);

  if (!contents.exists) {
    return {
      lines: new Error(`head: ${args[0]}: No such file or directory`).message,
      stream: "stderr"
    };
  }

  return { lines: filterTopFileLines(contents.content), stream: "stdout" };
};

module.exports = {
  getContents,
  filterTopFileLines,
  parseArgs,
  performHeadAction
};
