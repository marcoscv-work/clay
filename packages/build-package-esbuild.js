/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

'use strict';

const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');
const {sync: globSync} = require('glob');

// Parse CLI args: --format=cjs|esm --outdir=lib/cjs
const args = process.argv.slice(2);
const argMap = {};
for (const arg of args) {
	const match = arg.match(/^--([^=]+)=(.+)$/);
	if (match) {
		argMap[match[1]] = match[2];
	}
}

const format = argMap['format'];
const outdir = argMap['outdir'];

if (!format || !outdir) {
	console.error('Usage: node build-package-esbuild.js --format=cjs|esm --outdir=<path>');
	process.exit(1);
}

// Resolve paths relative to the package directory (cwd when script runs)
const pkgDir = process.cwd();
const pkgJsonPath = path.join(pkgDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));

// Collect all external dependencies (do not bundle them)
const externalDeps = [
	...Object.keys(pkg.dependencies || {}),
	...Object.keys(pkg.peerDependencies || {}),
	...Object.keys(pkg.devDependencies || {}),
];

// Find all source files excluding tests and stories
const entryPoints = globSync('src/**/*.{ts,tsx}', {
	cwd: pkgDir,
	ignore: [
		'src/**/__tests__/**',
		'src/**/*.test.ts',
		'src/**/*.test.tsx',
		'src/**/*.spec.ts',
		'src/**/*.spec.tsx',
	],
});

if (entryPoints.length === 0) {
	console.error('No source files found in src/');
	process.exit(1);
}

esbuild
	.build({
		bundle: false,
		entryPoints: entryPoints.map((f) => path.join(pkgDir, f)),
		format,
		jsx: 'transform',
		loader: {'.ts': 'ts', '.tsx': 'tsx'},
		outbase: path.join(pkgDir, 'src'),
		outdir: path.join(pkgDir, outdir),
		platform: 'browser',
		sourcemap: true,
		target: 'es2015',
	})
	.then(() => {
		console.log(`Built ${format} -> ${outdir}`);
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
