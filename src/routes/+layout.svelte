<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-fo4-dark text-fo4-green font-mono border-4 border-fo4-green">
	<header class="bg-fo4-black border-b-4 border-fo4-green p-6">
		<h1 class="text-3xl font-bold text-fo4-green-light mb-2">FALLOUT 4 TOOLS</h1>
		<p class="text-sm text-fo4-green opacity-75">RobCo Industries Terminal System v2.3</p>
	</header>

	<nav class="bg-fo4-black border-b-2 border-fo4-green p-4 flex gap-4">
		<a href="/" class="px-4 py-2 border-2 border-fo4-green hover:bg-fo4-green hover:text-fo4-black transition">
			HOME
		</a>
		<a href="/hacking" class="px-4 py-2 border-2 border-fo4-green hover:bg-fo4-green hover:text-fo4-black transition">
			HACKING
		</a>
		<a href="/armor" class="px-4 py-2 border-2 border-fo4-green hover:bg-fo4-green hover:text-fo4-black transition">
			ARMOR WORKBENCH
		</a>
		<a href="/weapons" class="px-4 py-2 border-2 border-fo4-green hover:bg-fo4-green hover:text-fo4-black transition">
			WEAPON WORKBENCH
		</a>
	</nav>

	<main class="p-6">
		{@render children()}
	</main>

	<footer class="bg-fo4-black border-t-2 border-fo4-green p-4 text-center text-sm opacity-75">
		<p>© 2287 RobCo Industries. All rights reserved.</p>
	</footer>
</div>
