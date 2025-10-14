// eslint.config.js
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginPreact from 'eslint-config-preact';
import eslintConfigPrettier from 'eslint-config-prettier';
import { render } from 'preact-render-to-string';

const preactVersion = render.toString().match(/10\.\d+\.\d+/)?.[0] || '10.19';

export default [
    {
        ignores: ['dist/**', 'node_modules/**', '**/*.cjs', '**/*.js'],
    },

    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                projectService: {
                    tsconfigRootDir: import.meta.dirname,
                    project: './tsconfig.json',
                },
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            react: eslintPluginReact,
        },
        settings: {
            react: {
                version: preactVersion,
                pragma: 'h',
                pragmaFrag: 'Fragment',
            },
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            ...eslintPluginReact.configs.recommended.rules,
            ...eslintPluginPreact.rules,
            'react/react-in-jsx-scope': 'off',
            'react/no-unknown-property': ['error', { ignore: ['class'] }],
            '@typescript-eslint/no-non-null-assertion': 'warn',
        },
    },

    eslintConfigPrettier,
];
