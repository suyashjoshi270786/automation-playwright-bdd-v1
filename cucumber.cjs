// cucumber.js
module.exports = {
  default: {
    paths: ["src/features/**/*.feature"],

    requireModule: ["ts-node/register/transpile-only", "dotenv/config"],

    require: [
      "src/support/hooks.ts",
      "src/support/world.ts",
      "src/step-definitions/**/*.ts",
    ],

    parallel: 4,
    tags: "not @wip",

    format: [
      "@cucumber/pretty-formatter",
      "json:results/cucumber-report.json",
      "allure-cucumberjs/reporter",
    ],
    formatOptions: { resultsDir: "allure-results" },

    publishQuiet: true,
  },
};
