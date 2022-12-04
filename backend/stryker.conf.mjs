// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress"],
  testRunner: "jest",
  jest: {
    projectType: "custom",
    configFile: "jest.config.ts",
    enableFindRelatedTests: false,
  },
  coverageAnalysis: "perTest",
  mutate: ["./src/service/user.ts"],
  timeoutMS: 60000,
};
export default config;
