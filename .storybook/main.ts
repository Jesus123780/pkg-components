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
    "@storybook/addon-interactions",
    "@storybook/addon-jest",
    "storybook-css-modules"
  ],
  viteFinal: (config, { configType }) => {
    return mergeConfig(config, {
      define: { 'process.env': {} },
    });
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  }
};

export default config;
