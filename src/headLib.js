const generateHeadMessage = fileContent => {
  const firstTenLineContents = fileContent.split("\n").slice(0, 10);
  return firstTenLineContents.join("\n");
};

const getContents = (exists, reader, filePath) => {
  if (exists(filePath)) {
    return { content: reader(filePath, "utf8"), flag: 1 };
  }

  return { content: "not found", flag: 0 };
};

const parseArgs = (args, helper) => {
  return { reader: helper.reader, exists: helper.exists, path: `./${args[0]}` };
};

const performHeadAction = (args, helper) => {
  const userArgs = parseArgs(args, helper);
  const contents = getContents(userArgs.exists, userArgs.reader, userArgs.path);
  if (contents.flag === 0) return `file ${args[0]} not found`;
  return generateHeadMessage(contents.content);
};

exports.getContents = getContents;
exports.generateHeadMessage = generateHeadMessage;
exports.parseArgs = parseArgs;
exports.performHeadAction = performHeadAction;
