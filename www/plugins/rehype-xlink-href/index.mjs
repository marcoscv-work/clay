/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {visit} from 'unist-util-visit';

// Attributes that need to be renamed for React compatibility
const RENAMES = {
	'xlink:href': 'href',
	'xlinkHref': 'href',
	'tabindex': 'tabIndex',
};

/**
 * Rehype plugin that fixes deprecated or invalid HTML attributes for React.
 * - xlink:href / xlinkHref → href (SVG namespace deprecated)
 * - tabindex → tabIndex (React expects camelCase)
 */
export function rehypeXlinkHref() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (!node.properties) {
				return;
			}

			for (const [from, to] of Object.entries(RENAMES)) {
				if (from in node.properties) {
					if (!(to in node.properties)) {
						node.properties[to] = node.properties[from];
					}
					delete node.properties[from];
				}
			}
		});
	};
}
