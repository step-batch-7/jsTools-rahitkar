const assert = require("chai").assert;
const generateHeadMessage = require("../src/headLib").generateHeadMessage;
const getContents = require("../src/headLib").getContents;

describe("head", () => {
  describe("generateHeadMessage", () => {
    it("should give 10 lines of given file", () => {
      const fileContent = `1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n`;
      const actual = generateHeadMessage(fileContent);
      const expected = `1\n2\n3\n4\n5\n6\n7\n8\n9\n10`;
      assert.strictEqual(actual, expected);
    });
  });

  describe("getContents", () => {
    it("should give contents of a given file along with flag 1", () => {
      const exists = function(path) {
        assert.strictEqual(path, "./samplePath.json");
        return true;
      };

      const MyReader = function(path) {
        assert.strictEqual(path, "./samplePath.json");
        return "hello";
      };

      const actual = getContents(exists, MyReader, "./samplePath.json");
      const expected = { content: "hello", flag: 1 };

      assert.deepStrictEqual(actual, expected);
    });

    it("should give file not found message along with flag 0", () => {
      const exists = function(path) {
        assert.strictEqual(path, "./samplePathOfNotExistedFile.json");
        return false;
      };
      const MyReader = path => {};
      const actual = getContents(
        exists,
        MyReader,
        "./samplePathOfNotExistedFile.json"
      );
      const expected = { content: "not found", flag: 0 };
      assert.deepStrictEqual(actual, expected);
    });
  });
});
