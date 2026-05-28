import baseConfig from '../prettier.config.mjs';

/** @type {import('prettier').Config} */
export default {
	...baseConfig,
	overrides: [
		...baseConfig.overrides,
		{
			files: 'turbo/generators/templates/{package.json.hbs}',
			options: {
				parser: 'json'
			}
		},
		{
			files: 'turbo/generators/templates/{.prettierrc.mjs.hbs}',
			options: {
				parser: 'babel'
			}
		}
	]
};
