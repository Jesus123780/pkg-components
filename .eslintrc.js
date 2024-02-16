module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    // "overrides": [
    //     {
    //         "env": {
    //             "node": true
    //         },
    //         "files": [
    //             "*.stories.@(ts|tsx|js|jsx|mjs|cjs)"
    //         ],
    //         "parserOptions": {
    //             "sourceType": "script"
    //         }
    //     }
    // ],
        "overrides": [
          {
            // or whatever matches stories specified in .storybook/main.js
            "files": ['*/.@(ts|tsx|js|jsx|mjs|cjs)'],
            "rules": {
              // example of overriding a rule
              'storybook/hierarchy-separator': 'error',
              // example of disabling a rule
              'storybook/default-exports': 'off',
            }
          }
        ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "semi": ["error", "never"]

    },

}
