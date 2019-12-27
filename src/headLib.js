"use strict";
const filterTopFileLines = function(fileContent) {
  const firstTenLineContents = fileContent.split("\n").slice(0, 10);
  return firstTenLineContents.join("\n");
};

const writeToScreen = function(err, data) {
  if (data) {
    this.writeToOutStream(filterTopFileLines(data));
  } else {
    this.writeToErrorStream(`head: ${err.path}: No such file or directory`);
  }
};

const performHead = function(path = "", reader, writer) {
  const encoding = "utf8";
  reader(path, encoding, writeToScreen.bind(writer));
};

module.exports = {
  performHead,
  writeToScreen,
  filterTopFileLines
};
