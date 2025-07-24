// jest.config.js
export default {
  preset: "ts-jest",

  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/*.(test|spec).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{ts,tsx}",
  ],
  // Добавьте настройки для ts-jest
  globals: {
    "ts-jest": {
      tsconfig: {
        resolveJsonModule: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    },
  },
};
