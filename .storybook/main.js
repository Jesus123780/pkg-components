module.exports = {
  stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "storybook-addon-next-router"],
  webpackFinal: async (config) => {
    return config;
  },
  babel: async options => ({
    ...options,
    presets: [["@babel/preset-env", {
      targets: {
        chrome: 100
      }
    }], "@babel/preset-react", "@babel/preset-typescript"],
    plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"]
  }),
  framework: "@storybook/react"
};