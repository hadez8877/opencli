#!/usr/bin/env node
export default async function run() {
	const [cmd, ...args] = process.argv.slice(2);
	switch (cmd) {
		case 'sort-labels': {
			const { default: sortLabels } = await import('./cmd/sort-labels.js');
			await sortLabels('../../.github/labels.yml', ...args);
			break;
		}
	}
}

run();
