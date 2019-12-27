const assert = require("chai").assert;
const {
  performHead,
  writeToScreen,
  filterTopFileLines
} = require("../src/headLib");

describe("head", () => {
  describe("filterTopFileLines", () => {
    it("should give 10 lines of given file", () => {
      const fileContent = `1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n`;
      const actual = filterTopFileLines(fileContent);
      const expected = `1\n2\n3\n4\n5\n6\n7\n8\n9\n10`;
      assert.strictEqual(actual, expected);
    });
  });

  describe("writeToScreen", () => {
    it("should check if data is present", () => {
      const data = `1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12`;
      const err = undefined;

      const writeToOutStream = function(data) {
        assert.strictEqual(data, "1\n2\n3\n4\n5\n6\n7\n8\n9\n10");
      };

      const writeToErrorStream = function() {};

      const writer = { writeToOutStream, writeToErrorStream };

      writeToScreen.call(writer, err, data);
      assert.deepStrictEqual(writer, { writeToOutStream, writeToErrorStream });
      assert.strictEqual(err, undefined);
      assert.strictEqual(data, "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12");
    });

    it("should check if err is present", () => {
      const data = undefined;
      const err = { path: "sampleFile" };

      const writeToOutStream = function() {};

      const writeToErrorStream = function(err) {
        assert.strictEqual(err, "head: sampleFile: No such file or directory");
      };

      const writer = { writeToOutStream, writeToErrorStream };

      writeToScreen.call(writer, err, data);
      assert.deepStrictEqual(writer, {
        writeToOutStream,
        writeToErrorStream
      });
      assert.deepStrictEqual(err, { path: "sampleFile" });
      assert.strictEqual(data, undefined);
    });
  });

  describe("performHead", () => {
    it("should check is performHead is performing in a right manner or not", () => {
      const writeToOutStream = function(data) {};

      const writeToErrorStream = function() {};

      const path = "samplePath";
      const writer = { writeToOutStream, writeToErrorStream };
      const myReader = function(path, encoding) {
        assert.strictEqual(path, "samplePath");
        assert.strictEqual(encoding, "utf8");
      };
      performHead(path, myReader, writer);
    });
  });
});
