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
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Keep hooks strict to avoid runtime bugs
      "react-hooks/rules-of-hooks": "error",
      // Reduce noise from strict typing while codebase matures
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Allow quotes in text content without escaping
      "react/no-unescaped-entities": "off",
      // Prefer Image but don't fail CI if <img> is used
      "@next/next/no-img-element": "warn",
    },
  },
];

export default eslintConfig;
