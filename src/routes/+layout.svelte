<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { App, type MenuItem, setIconset, TwintrinsicLogo } from 'twintrinsic';
	import { page } from '$app/stores';
	import { type ColorTheme, colorThemes, getThemeFromCustomColor } from '$lib/theme';

	setIconset('mdi');

	let { children } = $props();

	const STORAGE_KEY = 'fo4-tools-theme';

	function loadFromStorage() {
		if (typeof window === 'undefined') return null;
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? JSON.parse(stored) : null;
		} catch {
			return null;
		}
	}

	function applyTheme(theme: ColorTheme) {
		document.documentElement.style.setProperty('--theme-primary', theme.primary);
		document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
		document.documentElement.style.setProperty('--theme-accent', theme.accent);
		document.documentElement.style.setProperty('--theme-bg', theme.bg);
		document.documentElement.style.setProperty('--theme-border', theme.border);
		document.documentElement.style.setProperty('--theme-text', theme.text);
	}

	onMount(() => {
		const stored = loadFromStorage();
		if (stored) {
			if (stored.useCustom) {
				applyTheme(getThemeFromCustomColor(stored.customColor));
			} else {
				applyTheme(colorThemes[stored.selectedTheme]);
			}
		}
	});

	const siteLinks = [
		{ label: 'Home', href: '/', current: $page.url.pathname === '/' },
		{ label: 'Hacking', href: '/hacking', current: $page.url.pathname === '/hacking' },
		{ label: 'Armor', href: '/armor', current: $page.url.pathname === '/armor' },
		{ label: 'Weapons', href: '/weapons', current: $page.url.pathname === '/weapons' },
		{ label: 'Quests', href: '/quests', current: $page.url.pathname.startsWith('/quests') },
		{ label: 'Workshop', href: '/workshop', current: $page.url.pathname === '/workshop' }
	];

	const siteMenu: MenuItem[] = [
		{
			title: 'Tools',
			children: [
				{ title: 'Hacking', link: '/hacking' },
				{ title: 'Armor Workbench', link: '/armor' },
				{ title: 'Weapon Workbench', link: '/weapons' },
				{ title: 'Workshop Buildables', link: '/workshop' }
			]
		},
		{
			title: 'Quests',
			children: [
				{ title: 'Main Quests', link: '/quests/main' },
				{ title: 'Miscellaneous', link: '/quests/miscellaneous' },
				{ title: 'Brotherhood of Steel', link: '/quests/brotherhood' },
				{ title: 'The Railroad', link: '/quests/railroad' },
				{ title: 'The Institute', link: '/quests/institute' },
				{ title: 'Nuka-World', link: '/quests/nuka-world' },
				{ title: 'Far Harbor', link: '/quests/far-harbor' },
				{ title: 'Vault-Tec Workshop', link: '/quests/vault-tec' }
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

{#snippet logo(size)}
  <TwintrinsicLogo {size}/>
{/snippet}

<div class="min-h-screen bg-background text-text">
<App
	appName="Fallout 4 Tools"
	rightSidebarHidden
	themeToggleHidden
  brand={{
    name: 'Fallout 4 Tools',
    href: '/',
    logo
  }}

	{siteMenu}
	{siteLinks}
>
	{@render children?.()}
</App>
</div>
