'use strict';
const filterTopFileLines = function(fileContent, end) {
  const startFrom = 0;
  const firstTenLineContents = 
  fileContent.split('\n').slice(startFrom, end);

  return firstTenLineContents.join('\n');
};

const writeToScreen = function(writeScreenEquipment, err, data) {
  
  const writer = writeScreenEquipment.writer;
  const lineNum = writeScreenEquipment.lineNum;
  if (data) {
    writer.writeToOutStream(filterTopFileLines(data, lineNum));
  } else {
    writer.writeToErrorStream(`head: ${err.path}: No such file or directory`);
  }
};


const parseArgs = function(args) {
  const defaultNumOfLines = 10;
  const lastIndx = -1;
  const [filePath] = args.slice(lastIndx);
  const [option, lineNum] = [...args];

  if (!option.includes('-n')) {
    return {path: filePath, lineNum: defaultNumOfLines};
  }

  if(Number.isInteger(+lineNum)) {
    return { path: filePath, lineNum: +lineNum};
  }

  if(Number.isInteger(+option.slice(lastIndx))) {
    return {path: filePath, lineNum: +option.slice(lastIndx) };
  }
};
  

const performHead = function(args, reader, writer) {
  const userArgs = parseArgs(args);

  const lineNum = userArgs.lineNum;
  const encoding = 'utf8';
  reader(userArgs.path, encoding, 
    writeToScreen.bind(null, { writer, lineNum }));
};

module.exports = {
  performHead,
  writeToScreen,
  filterTopFileLines,
  parseArgs
};
