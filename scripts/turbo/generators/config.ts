import type { PlopTypes } from '@turbo/gen';
import { parse as parseYAML, stringify as stringifyYAML } from 'yaml';

interface LabelerData {
	description: string;
	color: string;
	name: string;
}

function sortYAMLObject(yaml: Record<string, string[]>) {
	const sortedYAML: typeof yaml = {};
	for (const key of Object.keys(yaml).sort((a, b) => a.localeCompare(b))) sortedYAML[key] = yaml[key]!;
	return sortedYAML;
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
	plop.setGenerator('create-package', {
		description: '',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'The name of the new package',
			},
			{
				type: 'input',
				name: 'description',
				message: 'The description of the new package.',
			},
		],
		actions: [
			{
				type: 'add',
				// add the src/index.ts file
				path: `../packages/{{name}}/src/index.ts`,
				template: "console.log('Hello, from @opencli/{{name}}');",
			},
			{
				type: 'add',
				path: `../packages/{{name}}/__tests__/.gitkeep`,
			},
			{
				type: 'addMany',
				destination: `../packages/{{name}}`,
				templateFiles: ['templates/**'],
				globOptions: { dot: true },
				base: 'templates/default/',
				stripExtensions: ['hbs'],
			},
			{
				type: 'modify',
				path: `../.github/labels.yml`,
				transform(content, answers) {
					const labelsYAML = parseYAML(content) as LabelerData[];
					labelsYAML.push({ name: `packages:${answers.name}`, description: `Modify the ${answers.name} package`, color: 'fbca04' });
					labelsYAML.sort((a, b) => a.name.localeCompare(b.name));

					return stringifyYAML(labelsYAML);
				},
			},
			{
				type: 'modify',
				path: `../.github/labeler.yml`,
				transform(content, answers) {
					const labelerYAML = parseYAML(content) as Record<string, Record<string, Record<string, string[]>[]>[]>;

					labelerYAML[`packages:${answers.name}`] = [
						{
							'changed-files': [
								{ 'any-glob-to-any-file': [`packages/${answers.name}/*`, `packages/${answers.name}/**/*`] },
							],
						},
					];

					return stringifyYAML(labelerYAML, { sortMapEntries: true });
				},
			},
			{
				type: 'modify',
				path: `../.github/issue_labeler.yml`,
				transform(content, answers) {
					const issueLabelerYAML = parseYAML(content) as Record<string, string[]>;
					issueLabelerYAML[`packages:${answers.name}`] = [
						`### Which (website|package|website or package) is this (bug report|feature request) for\\?\\n\\n${answers.name}\\n`,
					];

					return stringifyYAML(sortYAMLObject(issueLabelerYAML));
				},
			},
		],
	});
}
