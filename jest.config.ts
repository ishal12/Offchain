export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/node_modules/"
  ],
  coverageDirectory: "coverage",
  coverageThreshold: {
    "global": {
      "lines": 90,
      "statements": 90
    }
  },
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  testEnvironment: "node",
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
  }
};
