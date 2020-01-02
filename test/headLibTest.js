const assert = require('chai').assert;
const {
  head,
  writeToScreen,
  filterTopFileLines,
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

      const display = function(headContent) {
        assert.deepStrictEqual(headContent, 
          {data: '1\n2\n3\n4\n5\n6\n7\n8', err: ''});
      };


      const lineNum = 8;
      writeToScreen({ display, lineNum }, err, data);
      assert.deepStrictEqual(
        { display, lineNum },
        { display, lineNum: 8 }
      );
      assert.strictEqual(err, undefined);
      assert.strictEqual(data, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12');
    });

    it('should check if err is present', () => {
      const data = undefined;
      const err = { path: 'sampleFile' };


      const display = function(headContent) {
        assert.deepStrictEqual(headContent, {data: '', 
          err: 'head: sampleFile: No such file or directory'});
      };

      const lineNum = 8;

      writeToScreen({ display, lineNum }, err, data);
      assert.deepStrictEqual(
        { display, lineNum },
        {  display, lineNum: 8 }
      );
      assert.deepStrictEqual(err, { path: 'sampleFile' });
      assert.strictEqual(data, undefined);
    });
  });

  describe('head', () => {
    it('should check if head is performing in right manner', () => {
      const display = function() {};


      const args = ['-n', '12', 'samplePath'];
      const myReader = function(path, encoding) {
        assert.strictEqual(path, 'samplePath');
        assert.strictEqual(encoding, 'utf8');
      };
      head(args, myReader, display);
    });
  });
});
