<script lang="ts">
	import './layout.css';
	import { App, type MenuItem } from 'twintrinsic';
	import { page } from '$app/stores';
	import { defaultTheme } from '$lib/theme';

	let { children } = $props();

	const siteLinks = [
		{ label: 'Home', href: '/', current: $page.url.pathname === '/' },
		{ label: 'Hacking', href: '/hacking', current: $page.url.pathname === '/hacking' },
		{ label: 'Armor', href: '/armor', current: $page.url.pathname === '/armor' },
		{ label: 'Weapons', href: '/weapons', current: $page.url.pathname === '/weapons' }
	];

	const siteMenu: MenuItem[] = [
		{
			title: 'Tools',
			children: [
				{ title: 'Hacking', link: '/hacking' },
				{ title: 'Armor Workbench', link: '/armor' },
				{ title: 'Weapon Workbench', link: '/weapons' }
			]
		},
		{
			title: 'Player',
			children: [
				{ title: 'Character Stats', link: '/player' }
			]
		},
		{
			title: 'Reference',
			children: [
				{ title: 'Perks', link: '/perks' },
				{ title: 'Bobbleheads', link: '/bobbleheads' },
				{ title: 'Magazines', link: '/magazines' }
			]
		},
		{
			title: 'Site Theme',
			link: "/theme"
		}
	];
</script>

<App
	appName="Fallout 4 Tools"
	{siteMenu}
	{siteLinks}
>
	{@render children?.()}
</App>
