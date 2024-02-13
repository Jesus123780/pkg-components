module.exports = {
  module: {
    rules: [
      {
        test: /\.pdf$/,
        use: 'file-loader'
      },
      {
        test: /\.(js|jsx|ts|tsx|mjs)$/,
        exclude: /node_modules/,
        type: 'javascript/auto', // Corregido: Utilizar 'javascript/esm'
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },
      {
        test: /\.js$/,
        include: /@storybook\/addon-jest/,
        type: 'javascript/auto',
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
}
