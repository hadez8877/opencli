'use strict';

/** @type {import('prettier').Config} */
// eslint-disable-next-line no-restricted-syntax
module.exports = {
	...require('../prettier.config.mjs').default,
	overrides: [
		{
			files: 'turbo/generators/templates/{package.json.hbs}',
			options: {
				parser: 'json'
			}
		},
		{
			files: 'turbo/generators/templates/{.prettierrc.js.hbs}',
			options: {
				parser: 'babel'
			}
		}
	]
};
