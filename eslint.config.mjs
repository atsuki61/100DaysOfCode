import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  eslintConfigPrettier,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // TypeScript関連のルール
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      
      // React関連のルール
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "warn",
      
      // 一般的なルール（開発時はconsole.logを許可）
      "no-console": "off",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  {
    ignores: [
      ".next/**",
      "out/**",
      "dist/**",
      "node_modules/**",
      ".vercel/**",
      "*.config.js",
      "*.config.mjs",
      "public/**",
      "*.d.ts"
    ]
  }
];

export default eslintConfig;
