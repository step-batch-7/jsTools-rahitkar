const {parseArgs} = require('./parseArgs');

const filterTopFileLines = function(fileContent, end) {
  
  const startFrom = 0;
  const topLineContents = 
  fileContent.split('\n').slice(startFrom, end);

  return topLineContents.join('\n');
};

const writeToScreen = function(writeEquipment, error, data) {
  
  const display = writeEquipment.display;
  const lineNum = writeEquipment.lineNum;

  if (data) {
    const fileContent = filterTopFileLines(data, lineNum);
    const err = '';
    display(fileContent, err);
  } else {
    const fileContent = '';
    const err = `head: ${error.path}: No such file or directory`;
    display(fileContent, err);
  }
};

const workOnStandardInput = function(stdin, display, lineNum) {
  stdin.setEncoding('utf8');
  
  stdin.on('data', data => {
    
    display({data: filterTopFileLines(data, lineNum), err: ''});
  });
};

const head = function(args, reader, display, stdin) {
  const userArgs = parseArgs(args);
  
  const lineNum = userArgs.lineNum;
  
  if (userArgs.err) {

    return display('', userArgs.err); 
  }
  if (!userArgs.path) {
    workOnStandardInput(stdin, display, lineNum);
    return;
  }

  const encoding = 'utf8';
  reader(userArgs.path, encoding, 
    writeToScreen.bind(null, {display, lineNum}));
};

module.exports = {
  head,
  writeToScreen,
  filterTopFileLines,
  workOnStandardInput
};
