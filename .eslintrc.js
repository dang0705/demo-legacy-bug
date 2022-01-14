// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "Vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2020,
    sourceType: "module"
  },
  env: {
    node: true,
    browser: true,
    jest: true
  },
  // required to lint *.Vue files
  plugins: ["vue"],
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `asyncPlugin:Vue/essential` or `asyncPlugin:Vue/recommended` for stricter rules.
  extends: ["asyncPlugin:Vue/strongly-recommended"],
  // add your custom rules here
  rules: {
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
          component: "never"
        },
        svg: "always",
        math: "always"
      }
    ],
    "vue/max-attributes-per-line": 0,
    "vue/attribute-hyphenation": 0
  }
};
