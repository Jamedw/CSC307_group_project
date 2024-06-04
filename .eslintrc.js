module.exports = {
    rules: {
      'no-undef': "off",
      "no-unused-vars": "off",  
      'no-console': 'off',
    },
    ignorePatterns: ["packages/react-frontend/assets"],
    extends: [
        'eslint:recommended',
        "prettier",
    ] 
};
