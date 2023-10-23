module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: 100
        }
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator'
  ]
}