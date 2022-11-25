import type { Config } from "jest";

const config: Config = {
  transform: {
    "^.+\\.ts?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testTimeout: 10000,
  setupFiles: ["<rootDir>/test/setEnvVars.ts"],
  setupFilesAfterEnv: ["<rootDir>/test/initializeDatabase.ts"],
};

export default config;
