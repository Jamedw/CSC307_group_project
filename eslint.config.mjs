import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {languageOptions: { globals: globals.browser },  
     rules: {
    'no-undef': "off",
    "no-unused-vars": "off",  
    'no-console': 'off',
  }},
  //pluginJs.configs.recommended,
  pluginReactConfig,
];
