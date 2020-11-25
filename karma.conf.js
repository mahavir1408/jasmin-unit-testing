module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "jasmine-matchers"],
    preprocessors: {
      "scripts/*.js": ["coverage"],
      "specs/*spec.js": ["coverage"],
    },
    files: ["scripts/custom-matchers.js", "scripts/*.js", "specs/*spec.js"],
    plugins: [
      "karma-jasmine",
      "karma-jasmine-matchers",
      "karma-chrome-launcher",
      "karma-coverage",
    ],
    reporters: ["dots", "coverage"],
    color: true,
    browsers: ["ChromeHeadless"],
    singleRun: true,
    coverageReporter: {
      dir: "coverage/",
      reporters: [{ type: "html", subdir: "html" }],
    },
  });
};
