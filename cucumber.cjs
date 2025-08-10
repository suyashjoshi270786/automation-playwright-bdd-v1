// cucumber.js
const path = require("path");
const r = (...p) => path.join(__dirname, ...p);

module.exports = {
  default: {
    // Where the .feature files live
    paths: [r("src", "features")],

    // Load TS + .env
    requireModule: ["ts-node/register/transpile-only", "dotenv/config"],



    // Glue code
    require: [
      r("src", "support", "hooks.ts"),
      r("src", "support", "world.ts"),
      r("src", "step-definitions", "**", "*.ts"),
    ],

    // Parallel execution
    parallel: 4,

    // Tag filtering (run everything except @wip)
    tags: "not @wip",

    // Pretty console + JSON for external reporters
    format: [
      "@cucumber/pretty-formatter",
      "json:results/cucumber-report.json"
    ],

    publishQuiet: true,
  },
};
