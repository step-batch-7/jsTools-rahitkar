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

exports.getContents = getContents;
exports.generateHeadMessage = generateHeadMessage;
