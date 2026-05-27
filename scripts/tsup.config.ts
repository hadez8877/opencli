import { createTsupConfig } from '../tsup.config.js';

export default [
	createTsupConfig({
		entry: ['bin/sortLabels.ts'],
		format: 'esm',
		minify: 'terser'
	})
];
