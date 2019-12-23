const fs = require("fs");
const performHeadAction = require("./src/headLib").performHeadAction;

const head = args => {
  const helper = { exists: fs.existsSync, reader: fs.readFileSync };
  console.log(performHeadAction(args, helper));
};

head(process.argv.slice(2));
