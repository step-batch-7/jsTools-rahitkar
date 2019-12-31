const assert = require('chai').assert;
const {
  performHead,
  writeToScreen,
  filterTopFileLines,
  parseArgs
} = require('../src/headLib');

describe('head', () => {
  describe('filterTopFileLines', () => {
    it('should give 8 lines of given file', () => {
      const fileContent = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n';
      const lineNum = 8;
      const actual = filterTopFileLines(fileContent, lineNum);
      const expected = '1\n2\n3\n4\n5\n6\n7\n8';
      assert.strictEqual(actual, expected);
    });
  });

  describe('writeToScreen', () => {
    it('should check if data is present', () => {
      const data = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12';
      const err = undefined;

      const writeToOutStream = function(data) {
        assert.strictEqual(data, '1\n2\n3\n4\n5\n6\n7\n8');
      };

      const writeToErrorStream = function() {};

      const writer = { writeToOutStream, writeToErrorStream };
      const lineNum = 8;
      writeToScreen({ writer, lineNum }, err, data);
      assert.deepStrictEqual(
        { writer, lineNum },
        { writer: { writeToOutStream, writeToErrorStream }, lineNum: 8 }
      );
      assert.strictEqual(err, undefined);
      assert.strictEqual(data, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12');
    });

    it('should check if err is present', () => {
      const data = undefined;
      const err = { path: 'sampleFile' };

      const writeToOutStream = function() {};

      const writeToErrorStream = function(err) {
        assert.strictEqual(err, 'head: sampleFile: No such file or directory');
      };

      const writer = { writeToOutStream, writeToErrorStream };
      const lineNum = 8;

      writeToScreen({ writer, lineNum }, err, data);
      assert.deepStrictEqual(
        { writer, lineNum },
        { writer: { writeToOutStream, writeToErrorStream }, lineNum: 8 }
      );
      assert.deepStrictEqual(err, { path: 'sampleFile' });
      assert.strictEqual(data, undefined);
    });
  });

  describe('performHead', () => {
    it('should check if performHead is performing in right manner', () => {
      const writeToOutStream = function() {};

      const writeToErrorStream = function() {};

      const args = ['-n', '12', 'samplePath'];
      const writer = { writeToOutStream, writeToErrorStream };
      const myReader = function(path, encoding) {
        assert.strictEqual(path, 'samplePath');
        assert.strictEqual(encoding, 'utf8');
      };
      performHead(args, myReader, writer);
    });
  });

  describe('parseArgs', () => {
    it('should give line number and file path if option "-n" is given', () => {
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
  });
});
