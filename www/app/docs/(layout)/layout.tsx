import {
	DocumentsCollection,
	CSSDocumentsCollection,
	ComponentDocumentsCollection,
} from '@/data';

import {Sidebar} from '../../_components/Sidebar';
import {Navbar} from '../../_components/Navbar';
import styles from './layout.module.css';

export default function DocsLayout({children}: {children: React.ReactNode}) {
	return (
		<>
			<Sidebar
				collection={[
					{name: 'Introduction', collection: DocumentsCollection},
					{
						name: 'Components',
						collection: ComponentDocumentsCollection,
						sort: true,
						groups: [
							{
								name: 'INTERACTIVE',
								items: ['Button', 'Drop Down', 'Link', 'Tooltip'],
							},
							{
								name: 'NAVIGATION & LAYOUT',
								items: ['Nav', 'Navigation Bar', 'Breadcrumb', 'Tabs', 'Layout', 'Side Panel', 'Tree View', 'Multi Step Nav', 'Application Bar', 'Vertical Bar', 'Vertical Nav', 'Menubar'],
							},
							{
								name: 'INPUT',
								items: ['Input', 'Input Group', 'Checkbox', 'Radio Group', 'Toggle Switch', 'Select', 'Select Box', 'Dual List Box', 'Form', 'Forms Hierarchy'],
							},
							{
								name: 'PICKERS',
								items: ['Date Picker', 'Time Picker', 'Color Picker', 'Picker', 'Autocomplete', 'Multi Select'],
							},
							{
								name: 'DATA PRESENTATION',
								items: ['List', 'Table', 'Card', 'Pagination', 'Pagination Bar', 'Charts', 'Timelines'],
							},
							{
								name: 'FEEDBACK',
								items: ['Alert', 'Loading Indicator', 'Progress Bar', 'Empty State'],
							},
							{
								name: 'VISUAL',
								items: ['Icon', 'Label', 'Badge', 'Sticker', 'Heading', 'Aspect Ratio', 'Overlay Mask', 'Icon Selector'],
							},
							{
								name: 'CONTAINERS',
								items: ['Panel', 'Modal', 'Sidebar', 'Toolbar', 'Popover', 'Slider', 'Language Picker', 'Provider'],
							},
							{
								name: 'ADVANCED',
								items: ['Focus Trap', 'Reduced Motion', 'Upper Toolbar', 'Management Toolbar', 'Localized Input', 'Data Provider', 'Text'],
							},
						]
					},
					{
						name: 'CSS',
						collection: CSSDocumentsCollection,
						sort: true,
					},
				]}
				path="docs"
			/>
			<div className={styles.main}>
				<Navbar />
				<main className={styles.content}>{children}</main>
			</div>
		</>
	);
}
