/** @type {import('prettier').Config} */
module.exports = {
	...require('../prettier.config.mjs'),
	overrides: [
		{
			files: 'turbo/generators/templates/{package.json.hbs}',
			options: {
				parser: 'json',
			},
		},
		{
			files: 'turbo/generators/templates/{.prettierrc.js.hbs}',
			options: {
				parser: 'babel',
			},
		},
	],
};
