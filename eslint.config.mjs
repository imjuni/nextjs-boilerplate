import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { configs, plugins, rules } from 'eslint-config-airbnb-extended';
import { rules as prettierConfigRules } from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

import {
  customEslintRule,
  customIgnore,
  customOverrideEslintRule,
  customOverrideImportXPlugin,
  customTsconfig,
  customReactRule,
  customTypescriptRule,
} from './eslint.config.custom.mjs';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const javascriptConfig = [
  // ESLint Recommended Rules
  {
    name: 'js/config',
    ...js.configs.recommended,
  },

  // Stylistic Plugin
  plugins.stylistic,

  // Import X Plugin
  plugins.importX,

  // Airbnb Base Recommended Config
  ...configs.base.recommended,

  // Strict Import Config
  rules.base.importsStrict,
  ...customEslintRule,
  ...customOverrideImportXPlugin,
];

const reactConfig = [
  // React Plugin
  plugins.react,

  // React Hooks Plugin
  plugins.reactHooks,

  // React JSX A11y Plugin
  plugins.reactA11y,

  // Next Plugin
  plugins.next,

  // Airbnb Next Recommended Config
  ...configs.next.recommended,

  // Strict React Config
  rules.react.strict,

  ...customReactRule,
];

const typescriptConfig = [
  // TypeScript ESLint Plugin
  plugins.typescriptEslint,

  // Airbnb Base TypeScript Config
  ...configs.base.typescript,

  // Strict TypeScript Config
  rules.typescript.typescriptEslintStrict,

  // Airbnb Next TypeScript Config
  ...configs.next.typescript,
  ...customTypescriptRule,
  customTsconfig,
];

const prettierConfig = [
  // Prettier Plugin
  {
    name: 'prettier/plugin/config',
    plugins: {
      prettier: prettierPlugin,
    },
  },
  // Prettier Config
  {
    name: 'prettier/config',
    rules: {
      ...prettierConfigRules,
      'prettier/prettier': 'error',
    },
  },
];

const eslintConfig = [
  ...customIgnore,
  ...javascriptConfig,
  ...reactConfig,
  ...compat.extends('next/typescript'),
  ...typescriptConfig,
  ...prettierConfig,
  ...customOverrideEslintRule,
  ...compat.extends('next/core-web-vitals'),
];

export default eslintConfig;
