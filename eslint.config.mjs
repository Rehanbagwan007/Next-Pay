import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
     


      // React hooks
    "react-hooks/rules-of-hooks": "off",
    "react-hooks/exhaustive-deps": "off",

    // Unused variables and expressions
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-unused-expressions": "off",

    // Next.js and React
    '@next/next/no-page-custom-font': 'off',
    'react/no-unescaped-entities': 'off',
    // Add more rules as needed
    },
  },
  
];

export default eslintConfig;
