const assert = require("chai").assert;
const {
  getContents,
  filterTopFileLines,
  parseArgs,
  performHead
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

  describe("getContents", () => {
    it("should give contents of a given file along with file existence indicator", () => {
      const exists = function(path) {
        assert.strictEqual(path, "./samplePath.json");
        return true;
      };

      const myReader = function(path) {
        assert.strictEqual(path, "./samplePath.json");
        return "hello";
      };

      const actual = getContents(exists, myReader, "./samplePath.json");
      const expected = { content: "hello", err: "" };

      assert.deepStrictEqual(actual, expected);
    });

    it("should give file not found message along with exists 0", () => {
      const exists = function(path) {
        assert.strictEqual(path, "samplePathOfNotExistedFile.json");
        return false;
      };
      const myReader = path => {};
      const actual = getContents(
        exists,
        myReader,
        "samplePathOfNotExistedFile.json"
      );
      const expected = {
        content: "",
        err: new Error(
          "head: samplePathOfNotExistedFile.json: No such file or directory"
        ).message
      };
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("parseArgs", () => {
    it("should give a object with reader and file path", () => {
      const args = ["sampleFile.txt"];
      const helper = { reader: "myReader", exists: "exists" };
      const actual = parseArgs(args, helper);
      const expected = {
        exists: "exists",
        reader: "myReader",
        path: "sampleFile.txt"
      };

      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("performHeadAction", () => {
    it("should give first 10 lines of given existing file", () => {
      const exists = function(path) {
        assert.strictEqual(path, "sampleFile.json");
        return true;
      };

      const myReader = function(path) {
        assert.strictEqual(path, "sampleFile.json");
        return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n";
      };

      const args = ["sampleFile.json"];
      const helper = { exists: exists, reader: myReader };
      const actual = performHead(args, helper);
      const expected = {
        content: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
        err: ""
      };
      assert.deepStrictEqual(actual, expected);
    });

    it("should give file not found message for given not existing file", () => {
      const exists = function(path) {
        assert.strictEqual(path, "samplePathOfNotExistedFile.json");
        return false;
      };
      const myReader = path => {};

      const args = ["samplePathOfNotExistedFile.json"];
      const helper = { exists: exists, reader: myReader };
      const actual = performHead(args, helper);
      const expected = {
        content: "",
        err: new Error(`head: ${args[0]}: No such file or directory`).message
      };
      assert.deepStrictEqual(actual, expected);
    });
  });
});
