import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Next 16 removed `next lint`; ESLint runs directly with the flat config from eslint-config-next.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // New React Compiler rules (eslint-plugin-react-hooks 7) flag code that predates them.
    // Kept as warnings so they stay visible without blocking lint; fix and raise to "error".
    rules: {
      "react-hooks/purity": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
