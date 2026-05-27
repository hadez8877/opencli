import { fileURLToPath } from 'node:url';
import { glob } from 'tinyglobby';
import { readFile } from 'node:fs/promises';
import * as os from 'node:os';

const baseUrl = new URL(`https://github.com/hadez8877/opencli/releases/tag/`);

const emojis = ['🎉', '🥳', '🚀', '🫡', '🎊', '🏆', '✅', '🤩', '👾', '🙌'];
const descriptors = [
	'new release',
	'exciting updates',
	'package updates',
	'awesome updates',
	'cool new features',
	'bug fixes and features',
	'wonderful additions',
	'brilliant updates',
	'spectacular improvements',
	'updates'
];
const verbs = [
	'just went out!',
	'just dropped!',
	'now available!',
	'in the wild!',
	'now live!',
	'hit the registry!',
	'to share!',
	'for you!',
	'for y’all! 🤠',
	'comin’ your way!',
	'comin’ atcha!',
	'comin’ in hot!',
	'freshly minted on the blockchain! (jk)',
	'[is] out (now with 100% more reticulated splines!)',
	'(as seen on TV!)',
	'just dropped!',
	'– artisanally hand-crafted just for you.',
	'– oh happy day!',
	'– enjoy!',
	'now out. Be the first on your block to download!',
	'made with love 💕',
	'[is] out! Our best [version] yet!',
	'[is] here. DOWNLOAD! DOWNLOAD! DOWNLOAD!',
	'... HUZZAH!',
	'[has] landed!',
	'landed! The internet just got a little more fun.',
	'– from our family to yours.',
	'– go forth and build!'
];
const extraVerbs = [
	'new',
	'here',
	'released',
	'freshly made',
	'going out',
	'hitting the registry',
	'available',
	'live now',
	'hot and fresh',
	'for you',
	"comin' atcha"
];

function item(items) {
	return items[Math.floor(Math.random() * items.length)];
}

const plurals = new Map([
	['is', 'are'],
	['has', 'have']
]);

function pluralize(text) {
	return text.replace(/(\[([^\]]+)\])/gm, (_, _full, match) =>
		plurals.has(match) ? plurals.get(match) : `${match}s`
	);
}

/** Based on https://github.com/actions/toolkit/blob/4e3b068ce116d28cb840033c02f912100b4592b0/packages/core/src/file-command.ts */
function setOutput(key, value) {
	const filePath = process.env['GITHUB_OUTPUT'] || '';
	if (filePath) {
		return issueFileCommand('OUTPUT', prepareKeyValueMessage(key, value));
	}
	process.stdout.write(os.EOL);
}

function singularlize(text) {
	return text.replace(/(\[([^\]]+)\])/gm, (_, _full, match) => `${match}`);
}

const packageMap = new Map();
async function generatePackageMap() {
	const packageRoot = new URL('../../packages/', import.meta.url);
	const packages = await glob(['*/package.json', '*/*/package.json'], {
		cwd: fileURLToPath(packageRoot),
		expandDirectories: false,
		ignore: ['**/node_modules/**']
	});

	await Promise.all(
		packages.map(async (pkg) => {
			const pkgFile = fileURLToPath(new URL(pkg, packageRoot));
			const content = await readFile(pkgFile).then((res) => JSON.parse(res.toString()));
			packageMap.set(content.name, `./packages/${pkg.replace('/package.json', '')}`);
		})
	);
}

async function generateMessage() {
	await generatePackageMap();
	const releases = process.argv.slice(2)[0];
	const data = JSON.parse(releases);
	const packages = await Promise.all(
		data.map(({ name, version }) => {
			const p = packageMap.get(name);
			if (!p) {
				throw new Error(`Unable to find entrypoint for "${name}"!`);
			}
			return {
				name,
				version,
				url: new URL(encodeURIComponent(`${name}@${version}`), baseUrl).toString()
			};
		})
	);

	const emoji = item(emojis);
	const descriptor = item(descriptors);
	const verb = item(verbs);

	let message = '';

	if (packages.length === 1) {
		const { name, version, url } = packages[0];
		message += `${emoji} \`${name}@${version}\` ${singularlize(
			verb
		)}\nRead the [release notes →](<${url}>)\n`;
	} else {
		message += `${emoji} Some ${descriptor} ${pluralize(verb)}\n\n`;
		for (const { name, version, url } of packages) {
			message += `• \`${name}@${version}\` Read the [release notes →](<${url}>)\n`;
		}
	}

	if (message.length < 2000) {
		return message;
	} else {
		const { name, version, url } = packages.find((pkg) => pkg.name === 'opencli') ?? packages[0];
		message = `${emoji} Some ${descriptor} ${pluralize(verb)}\n\n`;
		message += `• \`${name}@${version}\` Read the [release notes →](<${url}>)\n`;

		message += `\nAlso ${item(extraVerbs)}:`;

		const remainingPackages = packages.filter((p) => p.name !== name);
		for (const { name, version, _url } of remainingPackages) {
			message += `\n• \`${name}@${version}\``;
		}

		if (message.length < 2000) {
			return message;
		} else {
			message = `${emoji} Some ${descriptor} ${pluralize(verb)}\n\n`;
			message += `• \`${name}@${version}\` Read the [release notes →](<${url}>)\n`;

			message += `\n\nAlso ${item(extraVerbs)}: ${remainingPackages.length} other packages!`;
			return message;
		}
	}
}

async function run() {
	const content = await generateMessage();
	console.info(content);
	setOutput('DISCORD_MESSAGE', content);
}

run();
