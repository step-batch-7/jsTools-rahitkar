const assert = require("chai").assert;

const generateHeadMessage = require("../src/head").generateHeadMessage;

describe("generateHeadMessage", () => {
  it("should give 10 lines of given file", () => {
    const fileContent = `1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n`;
    const actual = generateHeadMessage(fileContent);
    const expected = `1\n2\n3\n4\n5\n6\n7\n8\n9\n10`;
    assert.strictEqual(actual, expected);
  });
});
