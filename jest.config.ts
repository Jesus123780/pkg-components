module.exports = {
  preset: 'react-scripts',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/.storybook/jest-setup.ts'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.css$': 'jest-transform-stub'
  }
}