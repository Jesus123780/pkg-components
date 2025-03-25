import type { StorybookConfig } from "@storybook/react-vite"
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "storybook-addon-next-router",
    "@storybook/addon-interactions",
    "@storybook/addon-jest",
    "storybook-css-modules",
    "@chromatic-com/storybook"
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  viteFinal: (config, { configType }) => {
    return mergeConfig(config, {
      define: { 'process.env': {} },
    });
  },

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};

export default config;
