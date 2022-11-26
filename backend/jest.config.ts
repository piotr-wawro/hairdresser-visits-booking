import type { Config } from "jest";

const config: Config = {
  transform: {
    "^.+\\.ts?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  setupFiles: ["<rootDir>/test/setEnvVars.ts"],
  testTimeout: 10000,
  verbose: true,
  collectCoverage: true,
};

export default config;
