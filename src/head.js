const generateHeadMessage = fileContent => {
  const firstTenLineContents = fileContent.split("\n").slice(0, 10);
  return firstTenLineContents.join("\n");
};

exports.generateHeadMessage = generateHeadMessage;
