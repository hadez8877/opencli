/** @type {import("prettier").Config} */
const baseConfig = {
	printWidth: 100,
	semi: true,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'none',
	useTabs: true,
	plugins: ['prettier-plugin-astro'],
	overrides: [
		{
			files: ['.*', '*.md', '*.toml', '*.yml'],
			options: {
				useTabs: false
			}
		},
		{
			files: ['**/*.astro'],
			options: {
				parser: 'astro'
			}
		}
	]
};

export default baseConfig;
