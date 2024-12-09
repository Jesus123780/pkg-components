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
    "overrides": [
        {
            // Configuración específica para archivos de historias
            "files": ["*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
            "rules": {
                "storybook/hierarchy-separator": "error",
                "storybook/default-exports": "off"
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
        'storybook/hierarchy-separator': 'off',
        "react/prop-types": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "no-unused-vars": "error", // Para detectar variables sin usar en JavaScript
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                "args": "after-used", // Detecta parámetros no usados
                "argsIgnorePattern": "^_", // Permite parámetros que inicien con "_"
                "vars": "all", // Detecta todas las variables no usadas
                "varsIgnorePattern": "^_" // Permite variables que inicien con "_"
            }
        ],
        "semi": ["error", "never"],
        "@typescript-eslint/no-confusing-void-expression": "off"
    }
}
