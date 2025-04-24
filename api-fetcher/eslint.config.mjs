export default [
    {
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      rules: {
        "no-console": "off", // Allow console logs for CLI
        "no-unused-vars": ["error", { vars: "all", args: "after-used" }],
      },
    },
  ];