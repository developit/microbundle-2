import fs from 'node:fs/promises';
import {context} from 'esbuild';
import sade from 'sade';
import prettyBytes from 'pretty-bytes';

/** @param {Record<string, string>} args */
async function main(args) {
	const cwd = process.cwd();

	const pkg = JSON.parse(await fs.readFile('package.json', 'utf-8'));

	const external = Object.keys(pkg.dependencies || []).concat(Object.keys(pkg.peerDependencies || []))

    const ctx = await context({
		absWorkingDir: cwd,
		// drop: ['console'],
        entryPoints: ['src/index.ts'],
        bundle: true,
        minify: true,
		mangleProps: /SUBCLASSES|_clone|_walk|_children_backwards/,
		// pure: ['wasmURL', 'wasmModule', '$documentation', '$propdoc'],
		legalComments: 'none',
		color: true,
		treeShaking: true,
		platform: 'node',
        target: ['node16'],
		mainFields: ['module', 'main'],
		// packages: 'external',
		external,
        sourcemap: false,
		format: 'cjs',
        outfile: 'dist/microbundle.js',
		metafile: true,
		plugins: [
			{
				name: 'library-optimization',
				setup(build) {
					build.onLoad({filter: /es-module-lexer/}, async (args) => {
						const code = await fs.readFile(args.path, 'utf-8');
						const out = code.replace(/(WebAssembly\.compile\()\(\w+="([^"]+)".*?CodeAt\(0\)\)\)\)/, '$1Buffer.from(`$2`,"base64")');
						return {contents: out};
					});
					build.onLoad({filter: /terser/}, async (args) => {
						const code = await fs.readFile(args.path, 'utf-8');
						const out = code.replace(/(?:\$documentation: *(['"]).*?\1|\$propdoc: *\{[^}]+\})[,\n]/gs, '');
						return {contents: out};
					});
				}
			}
		]
	});

	let building = false;
	async function build() {
		if (building) await ctx.cancel();
		building = true;
		const start = performance.now();
		const result = await ctx.rebuild();
		const dur = performance.now() - start;
		const stats = Object.entries(result.metafile.outputs).map(([filename, output]) => `${filename} ${prettyBytes(output.bytes, {maximumFractionDigits: 4})}`);
		console.log(`built in ${dur.toPrecision(4)}ms:\n  ` + stats.join('\n  '))
		// console.log({ warnings: result.warnings, errors: result.errors });
		building = false;
	}

	try {
		await build();
	} catch(err) {}

	if (args.watch) {
		for await (const change of fs.watch('src', {recursive:true})) {
			// change.eventType; change.filename;
			build().catch(() => {});
		}
	} else {
		await ctx.dispose();
	}
}

sade('_build', true).action(main).parse(process.argv);
