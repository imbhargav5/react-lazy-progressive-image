module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react"
  ],
  plugins: ["react", "prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    "browser": true,
    "node":true,
    "es6":true,
    "jest":true
  },
  parser : "babel-eslint",
  rules: {
    "prettier/prettier": "error"
  }
};

