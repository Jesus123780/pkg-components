module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/.storybook/jest-setup.js'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        "^.+\\.css$": "jest-transform-stub"
    },
}