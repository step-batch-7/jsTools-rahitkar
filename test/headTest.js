const assert = require("chai").assert;
const generateHeadMessage = require("../src/headLib").generateHeadMessage;
const getContents = require("../src/headLib").getContents;
const parseArgs = require("../src/headLib").parseArgs;
const performHeadAction = require("../src/headLib").performHeadAction;

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

      const myReader = function(path) {
        assert.strictEqual(path, "./samplePath.json");
        return "hello";
      };

      const actual = getContents(exists, myReader, "./samplePath.json");
      const expected = { content: "hello", flag: 1 };

      assert.deepStrictEqual(actual, expected);
    });

    it("should give file not found message along with flag 0", () => {
      const exists = function(path) {
        assert.strictEqual(path, "./samplePathOfNotExistedFile.json");
        return false;
      };
      const myReader = path => {};
      const actual = getContents(
        exists,
        myReader,
        "./samplePathOfNotExistedFile.json"
      );
      const expected = { content: "not found", flag: 0 };
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
        path: "./sampleFile.txt"
      };

      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("performHeadAction", () => {
    it("should give first 10 lines of given existing file", () => {
      const exists = function(path) {
        assert.strictEqual(path, "./sampleFile.json");
        return true;
      };

      const myReader = function(path) {
        assert.strictEqual(path, "./sampleFile.json");
        return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n";
      };

      const args = ["sampleFile.json"];
      const helper = { exists: exists, reader: myReader };
      const actual = performHeadAction(args, helper);
      const expected = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
      assert.strictEqual(actual, expected);
    });

    it("should give file not found message for given not existing file", () => {
      const exists = function(path) {
        assert.strictEqual(path, "./samplePathOfNotExistedFile.json");
        return false;
      };
      const myReader = path => {};

      const args = ["samplePathOfNotExistedFile.json"];
      const helper = { exists: exists, reader: myReader };
      const actual = performHeadAction(args, helper);
      const expected = `file ${args[0]} not found`;
      assert.strictEqual(actual, expected);
    });
  });
});
