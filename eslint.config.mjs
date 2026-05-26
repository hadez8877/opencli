import { defineConfig } from 'eslint/config';
import common from 'eslint-config-neon/common';
import node from 'eslint-config-neon/node';
import prettier from 'eslint-config-neon/prettier';
import typescript from 'eslint-config-neon/typescript';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import merge from 'lodash.merge';

const commonFiles = '{js,mjs,cjs,ts,mts,cts,jsx,tsx}';

const commonRuleset = merge(...common, { files: [`**/*${commonFiles}`] });

const nodeRuleset = merge(...node, { files: [`**/*${commonFiles}`] });

const typeScriptRuleset = merge(...typescript, {
	files: [`**/*${commonFiles}`],
	ignores: [`packages/opencli/**/*.{js,mjs,cjs}`],
	languageOptions: {
		parserOptions: {
			warnOnUnsupportedTypeScriptVersion: false,
			allowAutomaticSingleRunInference: true,
			project: ['tsconfig.eslint.json', 'website/tsconfig.eslint.json', 'packages/*/tsconfig.eslint.json'],
		},
	},
	rules: {
		'@typescript-eslint/consistent-type-definitions': [2, 'interface'],
		'@typescript-eslint/naming-convention': [
			2,
			{
				selector: 'typeParameter',
				format: ['PascalCase'],
				custom: {
					regex: '^\\w{3,}',
					match: true,
				},
			},
		],
	},
	settings: {
		'import-x/resolver-next': [
			createTypeScriptImportResolver({
				noWarnOnMultipleProjects: true,
				project: ['tsconfig.eslint.json', 'website/tsconfig.eslint.json', 'packages/*/tsconfig.eslint.json'],
			}),
		],
	},
});

const prettierRuleset = merge(...prettier, { files: [`**/*${commonFiles}`] });

export default defineConfig(
	{
		ignores: [
			'**/node_modules/',
			'.git/',
			'.github/',
			'.changeset/',
			'templates/',
			'**/dist/',
			'**/templates/',
			'**/coverage/',
		],
	},
	commonRuleset,
	nodeRuleset,
	typeScriptRuleset,
	{
		files: ['**/*{ts,mts,cts,tsx}'],
		rules: { 'jsdoc/no-undefined-types': 0 },
	},
	{
		files: [`packages/create-cli/**/*${commonFiles}`],
		rules: { 'n/no-sync': 0 },
	},
	{
		files: [`packages/opencli/**/*.{js,cjs}`],
		languageOptions: {
			sourceType: 'commonjs',
			parserOptions: {
				ecmaFeatures: {
					impliedStrict: false,
				},
			},
		},
		settings: {
			jsdoc: {
				tagNamePreference: {
					augments: 'extends',
					fires: 'emits',
					function: 'method',
				},
				preferredTypes: {
					object: 'Object',
					null: 'void',
				},
			},
		},
		rules: {
			'jsdoc/no-undefined-types': 0,
			'jsdoc/no-defaults': 0,
			'no-eq-null': 0,
			strict: ['error', 'global'],

			'no-restricted-syntax': [
				'error',
				{
					selector: "AssignmentExpression[left.object.name='module'][left.property.name='exports']",
					message: 'Use named exports instead of module.exports',
				},
				{
					selector:
						"VariableDeclarator[init.callee.name='require'][init.arguments.0.value=/^\\./]:not([id.type='ObjectPattern'])",
					message: 'Use object destructuring when requiring local modules',
				},
			],
		},
	},
	{
		files: [`packages/opencli/typings/*{d.ts,test-d.ts,d.mts,test-d.mts}`],
		rules: {
			'@typescript-eslint/no-unsafe-declaration-merging': 0,
			'@typescript-eslint/no-empty-object-type': 0,
			'@typescript-eslint/no-use-before-define': 0,
			'@typescript-eslint/consistent-type-imports': 0,
			'@stylistic/ts/lines-between-class-members': 0,
			'no-restricted-syntax': [
				2,
				{
					selector:
						'MethodDefinition[key.name!=on][key.name!=once][key.name!=off] > TSEmptyBodyFunctionExpression > Identifier :not(TSTypeOperator[operator=readonly]) > TSArrayType',
					message: 'Array parameters on methods must be readonly',
				},
				{
					selector:
						'MethodDefinition > TSEmptyBodyFunctionExpression > Identifier TSTypeReference > Identifier[name=Collection]',
					message: 'Parameters of type Collection on methods must use ReadonlyCollection',
				},
				{
					selector: 'TSDeclareFunction > Identifier :not(TSTypeOperator[operator=readonly]) > TSArrayType',
					message: 'Array parameters on functions must be readonly',
				},
				{
					selector: 'TSDeclareFunction Identifier TSTypeReference > Identifier[name=Collection]',
					message: 'Parameters of type Collection on functions must use ReadonlyCollection',
				},
				{
					selector: 'TSInterfaceDeclaration TSPropertySignature :not(TSTypeOperator[operator=readonly]) > TSArrayType',
					message: 'Array properties on interfaces must be readonly',
				},
				{
					selector: 'TSInterfaceDeclaration TSPropertySignature TSTypeReference > Identifier[name=Collection]',
					message: 'Interface properties of type Collection must use ReadonlyCollection',
				},
			],
		},
	},
	{
		files: ['**/*{js,mjs,cjs,jsx}'],
		rules: { 'tsdoc/syntax': 0 },
	},
	prettierRuleset,
);
