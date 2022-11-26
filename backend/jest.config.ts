import type { Config } from "jest";

const config: Config = {
  transform: {
    "^.+\\.ts?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};

export default config;
