const assert = require('chai').assert;
const {parseArgs} = require('../src/parseArgs');

describe('parseArgs', () => {
  it('should give line number if option "-n" is given', () => {
    const args = ['-n', '12', 'samplePath'];
    const actual = parseArgs(args);
    const expected = { lineNum: 12, path: 'samplePath', err: '' };
    assert.deepStrictEqual(actual, expected);
  });

  it('should give line number as 10 and file path if is not given', () => {
    const args = ['samplePath'];
    const actual = parseArgs(args);
    const expected = { lineNum: 10, path: 'samplePath', err: ''};
    assert.deepStrictEqual(actual, expected);
  });

  it('should give line number and file path if "-nNumber" given', () => {
    const args = ['-n8', 'samplePath'];
    const actual = parseArgs(args);
    const expected = { lineNum: 8, path: 'samplePath', err: ''};
    assert.deepStrictEqual(actual, expected);
  });
  it('should give error for given wrong option', () => {
    const args = ['-j8', 'samplePath'];
    const actual = parseArgs(args);
    const expected =  {lineNum: '', path: '',
      err: `head: illegal option -- j
    usage: head [-n lines | -c bytes] [file ...]`};

    assert.deepStrictEqual(actual, expected);
  });
  it('should give lineNum for standard input if line number is given', () => {
    const args = ['-n', '12'];
    const actual =  parseArgs(args);
    const expected =  {path: '', lineNum: 12, err: ''};
    assert.deepStrictEqual(actual, expected);
  });
  it('should give 10as lineNum for standardInput for not given lineNum', () => {
    const args = [];
    const actual =  parseArgs(args);
    const expected =  {path: '', lineNum: 10, err: ''};
    assert.deepStrictEqual(actual, expected);
  });
});
