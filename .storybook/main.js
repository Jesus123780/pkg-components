module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-next-router",
    "@storybook/addon-jest",
    // "@storybook/preset-create-react-app",
    "storybook-css-modules",
  ],

  // Modify webpackFinal to use your custom webpack configuration
  webpackFinal: async (config) => {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test(".svg")
    );
    // Sobrescribe la regla para excluir archivos SVG
    if (fileLoaderRule) {
      // Sobrescribe la regla para excluir archivos SVG
      fileLoaderRule.exclude = /\.svg$/;
    } else {
      // Si no encuentra la regla, crea una nueva
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
    }
    config.module.rules.push({
      test: /\.js$/,
      include: /@storybook\/addon-jest/,
      type: "javascript/auto",
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    });
    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
                publicPath: "/", // Ajusta según tus necesidades
                context: "public", // Ajusta según tus necesidades
              },
            },
          ],
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
        {
          test: /\.(js|jsx|ts|tsx|mjs)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-runtime",
              ],
            },
          },
        },
      ],
    };

    return config;
  },
  features: {
    postcss: false,
  },
  framework: "@storybook/react",
};
