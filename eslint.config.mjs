import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import _import from "eslint-plugin-import";
import { defineConfig } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: fixupConfigRules(compat.extends("eslint:recommended", "plugin:import/errors", "prettier")),

    plugins: {
        import: fixupPluginRules(_import),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {
        "no-unused-vars": [1, {
            argsIgnorePattern: "res|next|^err",
        }],

        "arrow-body-style": [2, "as-needed"],

        "no-param-reassign": [2, {
            props: false,
        }],

        "no-console": 1,

        quotes: ["error", "double", {
            allowTemplateLiterals: true,
        }],

        "func-names": 0,
        "space-unary-ops": 2,
        "space-in-parens": "error",
        "space-infix-ops": "error",
        "comma-dangle": 0,
        "max-len": 0,
        "import/extensions": 0,
        "no-underscore-dangle": 0,
        "consistent-return": 0,
        radix: 0,

        "no-shadow": [2, {
            hoist: "all",
            allow: ["resolve", "reject", "done", "next", "err", "error"],
        }],

        "no-unused-expressions": "off",
    },
}]);
