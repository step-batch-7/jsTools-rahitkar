const filterTopFileLines = function(fileContent, end) {
  const startFrom = 0;
  const firstTenLineContents = 
  fileContent.split('\n').slice(startFrom, end);

  return firstTenLineContents.join('\n');
};

const writeToScreen = function(writeEquipment, err, data) {
  
  const writer = writeEquipment.writer;
  const lineNum = writeEquipment.lineNum;
  if (data) {
    writer.writeToOutStream(filterTopFileLines(data, lineNum));
  } else {
    writer.writeToErrorStream(`head: ${err.path}: No such file or directory`);
  }
};

const creatUserArgs = function(option, lineNum, filePath) {
  const defaultNumOfLines = 10;
  const lastIndx = -1;
  let userArgs = {path: filePath, lineNum: defaultNumOfLines, err: ''};
  if (Number.isInteger(+lineNum)) {
    userArgs = {path: filePath, lineNum: +lineNum, err: ''};
  }

  if(Number.isInteger(+option.slice(lastIndx))) {
    userArgs = {path: filePath, lineNum: +option.slice(lastIndx), err: '' };
  }
  return userArgs;
};

const getFilePath = function(list, element) {
  
  if(!element.includes('-') && !Number.isInteger(+element)) {
    list.push(element);
  }
  return list;
};

const parseArgs = function(args) {
  
  const [option, lineNum] = [...args];
  const [filePath] = args.reduce(getFilePath, []);

  if (!filePath) {
    return {path: '', lineNum: '', err: ''};
  }
  
  if(option[0] ==='-' && !(option[1] ==='n')){
    return {path: '', lineNum: '', 
      err: `head: illegal option -- ${option[1]}
    usage: head [-n lines | -c bytes] [file ...]` };
  }

  const userArgs = creatUserArgs(option, lineNum, filePath);
  return userArgs;
};

const workOnStandardInput = function(process, writeToOutStream) {
  const defaultNumOfLines = 10;
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', data => {
    writeToOutStream(filterTopFileLines(data, defaultNumOfLines));
  });
  
};

const performHead = function(args, reader, writer, process) {
  const userArgs = parseArgs(args);

  if (userArgs.err) {
    return writer.writeToErrorStream(userArgs.err);
  }
  if(!userArgs.path) {
    workOnStandardInput(process, writer.writeToOutStream);
    return;
  }

  
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
