/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

/**
 * Copies clay-* packages from packages/ to the repo root so the www
 * documentation site can resolve MDX imports. data.ts uses baseDirectory: '../'
 * with filePattern: 'clay-*\/docs\/**\/*.mdx', mirroring the liferay-portal
 * structure where packages live alongside www/.
 *
 * This script is a no-op if the directories already exist (e.g. after
 * running scripts/sync-portal-to-packages.sh locally).
 */

import {cpSync, existsSync, readdirSync} from 'fs';
import {join} from 'path';

const packagesDir = join(import.meta.dirname, '../../packages');
const rootDir = join(import.meta.dirname, '../..');

const entries = readdirSync(packagesDir);

for (const name of entries) {
	if (!name.startsWith('clay-')) {
		continue;
	}

	const dest = join(rootDir, name);

	if (existsSync(dest)) {
		continue;
	}

	const src = join(packagesDir, name);
	cpSync(src, dest, {recursive: true});
	console.log(`Copied ${name} → repo root`);
}
