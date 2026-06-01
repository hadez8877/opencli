import { readFile, writeFile } from 'node:fs/promises';
import { parse as parseYAML, stringify as stringifyYAML } from 'yaml';

/**
 * Sorts labels in a YAML file alphabetically by name
 * @param {string} path - Path to the labels YAML file
 * @param {string[]} args - Additional arguments (e.g., --no-single-quote)
 */
export default async function sortLabels(path, ...args) {
	const labelsYamlFile = new URL(path, import.meta.url);
	const content = await readFile(labelsYamlFile, 'utf8');

	const noSingleQuote = !args.includes('--no-single-quote');

	const labelsYAML = parseYAML(content);
	labelsYAML.sort((a, b) => a.name.localeCompare(b.name));

	await writeFile(labelsYamlFile, stringifyYAML(labelsYAML, { singleQuote: noSingleQuote }));
}
