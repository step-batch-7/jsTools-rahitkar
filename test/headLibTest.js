const assert = require('chai').assert;
const sinon = require('sinon');
const {
  head,
  writeToScreen,
  filterTopFileLines,
  workOnStandardInput
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

      const display = function(headContent, err) {
        assert.strictEqual( headContent, '1\n2\n3\n4\n5\n6\n7\n8');
        assert.strictEqual(err, '');
      };

      const lineNum = 8;
      writeToScreen({display, lineNum}, err, data);
      assert.deepStrictEqual(
        {display, lineNum},
        {display, lineNum: 8}
      );
      assert.strictEqual(err, undefined);
      assert.strictEqual(data, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12');
    });

    it('should check if err is present', () => {
      const data = undefined;
      const err = {path: 'sampleFile'};

      const display = function(headContent, err) {
        assert.strictEqual(headContent, ''); 
        assert.strictEqual(err, 'head: sampleFile: No such file or directory');
      };
      const lineNum = 8;

      writeToScreen({display, lineNum}, err, data);
      assert.deepStrictEqual(
        {display, lineNum},
        {display, lineNum: 8}
      );
      assert.deepStrictEqual(err, {path: 'sampleFile'});
      assert.strictEqual(data, undefined);
    });
  });

  describe('head', () => {
    it('should check if reader is getting called with right arguments', () => {
      
      const stdin = { };
      
      const args = ['-n', '12', 'samplePath'];

      const display = () => {};

      const myReader = function(path, encoding) {
        assert.strictEqual(path, 'samplePath');
        assert.strictEqual(encoding, 'utf8');
      };
      head(args, myReader, display, stdin);
    });

    it('should check if display is getting called with right argument for err', () => {
      const args = ['-j', '8', 'someFile'];
      const display = (fileContent, err) => {
        assert.strictEqual(fileContent, '');
        assert.strictEqual(err, 'head: illegal option -- j\n    usage: head [-n lines | -c bytes] [file ...]');
      };    
      const myReader = function() {};

      const stdin = { };

      head(args, myReader, display, stdin);
    });

  });

  describe('workOnStandardInput', () => {
    it('should check if the flow is correct', () => {
      const stdin = {setEncoding: sinon.fake(), on: sinon.fake()};

      const lineNum = 12;
      const display = (fileContent) => {
        assert.strictEqual(fileContent.data, 'abc');
        assert.strictEqual(fileContent.err, '');
      };    

      workOnStandardInput(stdin, display, lineNum);
      assert(stdin.setEncoding.calledWith('utf8'));
      assert.strictEqual(stdin.on.firstCall.args[0], 'data');
      assert.strictEqual(stdin.on.callCount, 1);
      stdin.on.firstCall.args[1]('abc');
    
    });
  });
});
