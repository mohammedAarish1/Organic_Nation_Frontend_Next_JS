import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
   {
    rules: {
      // ── TypeScript ──────────────────────────────────────────────
      // 'any' is sometimes unavoidable (RTK, external APIs, catch blocks)
      "@typescript-eslint/no-explicit-any": "warn",
      // Unused vars: warn only, and allow underscore-prefixed to be ignored
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Empty object types like {} are common in generic component props
      "@typescript-eslint/no-empty-object-type": "warn",
      // require() in .lintstagedrc.js is fine (it's a CJS config file)
      "@typescript-eslint/no-require-imports": "off",

      // ── React Hooks ──────────────────────────────────────────────
      // setState-in-effect: these are intentional derived-state patterns
      // Downgrade to warn so commits aren't blocked
      "react-hooks/set-state-in-effect": "warn",
      // Purity (Math.random in render): warn only — animation components
      // intentionally use this for random initial positions
      "react-hooks/purity": "warn",
      // Refs during render: warn only (Redux StoreProvider pattern is valid)
      "react-hooks/refs": "warn",
      // Immutability: warn only
      "react-hooks/immutability": "warn",
      // Missing deps: warn (many are intentional one-time effects)
      "react-hooks/exhaustive-deps": "warn",

      // ── React ────────────────────────────────────────────────────
      // display-name: warn only (forwardRef components often skip this)
      "react/display-name": "warn",
      // Unescaped entities: these are real JSX bugs, keep as error
      "react/no-unescaped-entities": "error",
      // Missing key prop: real bug, keep as error
      "react/jsx-key": "error",

      // ── Next.js ──────────────────────────────────────────────────
      // Using <a> instead of <Link>: real bug, keep as error
      "@next/next/no-html-link-for-pages": "error",
      // <img> instead of <Image>: warn (sometimes intentional)
      "@next/next/no-img-element": "warn",

      // ── Imports ──────────────────────────────────────────────────
      "import/no-anonymous-default-export": "warn",
    },
  },
]);

export default eslintConfig;
