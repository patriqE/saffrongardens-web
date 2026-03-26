import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import jsPlugin from "@eslint/js";
import aNodePlugin from "eslint-plugin-n";

const eslintConfig = defineConfig([
  ...nextVitals,
  jsPlugin.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs"],
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "prefer-const": "warn",
      "no-var": "error",
      eqeqeq: ["warn", "always"],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    ".git/**",
    "coverage/**",
    "dist/**",
  ]),
]);

export default eslintConfig;
