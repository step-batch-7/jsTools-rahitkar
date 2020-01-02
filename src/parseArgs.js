const creatUserArgs = function(lineNum, option = '') {
  
  const defaultNumOfLines = 10;
  const from = 2;
  
  if (Number.isInteger(+lineNum)) {
    
    return {lineNum: +lineNum, err: ''};
  }

  if (Number.isInteger(+option.slice(from)) && option !== '') {
    
    return {lineNum: +option.slice(from), err: ''};
  }

  return {lineNum: defaultNumOfLines, err: ''};
};

const getFilePath = function(list, element) {
  
  if (!element.includes('-') && !Number.isInteger(+element)) {
    list.push(element);
  }
  return list;
};

const parseArgs = function(args) {
  
  
  const [option, lineNum] = [...args];
  const [filePath] = args.reduce(getFilePath, []);
  
  if (!filePath) {
    return {path: '', 
      lineNum: creatUserArgs(lineNum, option).lineNum, err: ''};
  }
  
  const zeroedIndex = 0, firstIndex = 1;
  if (option[zeroedIndex] ==='-' && !(option[firstIndex] ==='n')) { 
    
    return {path: '', lineNum: '', 
      err: `head: illegal option -- ${option[firstIndex]}
    usage: head [-n lines | -c bytes] [file ...]` };
  }
  
  
  const userArgs = creatUserArgs(lineNum, option);
  
  userArgs.path = filePath;
  return userArgs;
};

module.exports = {parseArgs} ;
