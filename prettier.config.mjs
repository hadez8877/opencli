/** @type {import("prettier").Config} */
export default {
	printWidth: 120,
	useTabs: true,
	singleQuote: true,
	quoteProps: 'as-needed',
	trailingComma: 'all',
	endOfLine: 'lf',
	overrides: [
		{
			files: ['.*', '*.md', '*.toml', '*.yml'],
			options: {
				useTabs: false,
			},
		},
	]
};
