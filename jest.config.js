/* eslint-disable @typescript-eslint/no-var-requires */
const { defaults: tsjPreset } = require("ts-jest/presets"),
    { pathsToModuleNameMapper } = require('ts-jest/utils'),
    { compilerOptions } = require("./tsconfig.json")

module.exports = {
    moduleNameMapper: pathsToModuleNameMapper((compilerOptions.paths || []), {
        prefix: __dirname + "/"
    }),
    transform: {
        ...tsjPreset.transform,
    },
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
    ],
    rootDir: "test",
    testRegex: ".spec.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    coverageDirectory: "coverage",
    testEnvironment: "node",
    testTimeout: 10000
}