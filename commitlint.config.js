module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["fix", "feat", "hotfix"]],
    'header-max-length': [2, 'always', 72]
  },
  
};
