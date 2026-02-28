<script lang="ts">
	import './layout.css';
	import { App, Sidebar, Footer, type MenuItem } from 'twintrinsic';

	let { children } = $props();

	const menuItems: MenuItem[] = [
		{
			title: 'Fallout 4 Tools',
			icon: 'home',
			link: '/'
		},
		{
			title: 'Tools',
			separator: true
		},
		{
			title: 'Hacking',
			icon: 'terminal',
			link: '/hacking'
		},
		{
			title: 'Armor Workbench',
			icon: 'shield',
			link: '/armor'
		},
		{
			title: 'Weapon Workbench',
			icon: 'zap',
			link: '/weapons'
		}
	];
</script>

<App appName="Fallout 4 Tools" leftPanelWidth="18rem">
	{#snippet leftPanel()}
		<Sidebar menu={menuItems} />
	{/snippet}
	{@render children?.()}
	{#snippet footer()}
		{#snippet footerCenter()}
			<p>© 2287 RobCo Industries. All rights reserved.</p>
		{/snippet}
		<Footer center={footerCenter} />
	{/snippet}
</App>
