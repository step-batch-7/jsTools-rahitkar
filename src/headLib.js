const filterTopFileLines = function(fileContent) {
  const firstTenLineContents = fileContent.split("\n").slice(0, 10);
  return firstTenLineContents.join("\n");
};

const getContents = function(exists, reader, filePath) {
  if (exists(filePath)) {
    return { content: reader(filePath, "utf8"), err: "" };
  }

  const error = new Error(`head: ${filePath}: No such file or directory`)
    .message;

  return { content: "", err: error };
};

const parseArgs = function(args, fileOperations) {
  return {
    reader: fileOperations.reader,
    exists: fileOperations.exists,
    path: `${args[0]}`
  };
};

const performHead = function(args, fileOperations) {
  const userArgs = parseArgs(args, fileOperations);
  const contents = getContents(userArgs.exists, userArgs.reader, userArgs.path);

  if (contents.err) return contents;

  return { content: filterTopFileLines(contents.content), err: "" };
};

module.exports = {
  getContents,
  filterTopFileLines,
  parseArgs,
  performHead: performHead
};
