<script lang="ts">
	import { Container } from 'twintrinsic';
</script>

<div class="max-w-6xl mx-auto space-y-6">
	<!-- Header -->
	<div class="border-2 border-theme-border p-6 bg-surface">
		<h1 class="text-4xl font-bold text-theme-primary mb-2">FALLOUT 4 TOOLS</h1>
		<p class="text-text">A comprehensive toolkit for Fallout 4 gameplay optimization and planning</p>
	</div>

	<!-- Welcome Section -->
	<div class="border-2 border-theme-border p-6 bg-surface">
		<h2 class="text-2xl font-bold text-theme-primary mb-4">WELCOME, VAULT DWELLER</h2>
		<div class="space-y-3 text-text">
			<p>
				Fallout 4 Tools is your companion for mastering the Commonwealth. Whether you're cracking terminals, customizing gear, or tracking collectibles, we've got you covered.
			</p>
			<p>
				Select a tool from the navigation menu above to begin your journey. Each tool is designed to streamline your gameplay and help you make the most of your adventure.
			</p>
		</div>
	</div>

	<!-- Tools Grid -->
	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-theme-primary">AVAILABLE TOOLS</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<a href="/hacking" class="border-2 border-theme-border p-6 bg-surface hover:bg-border transition-colors group">
				<h3 class="text-xl font-bold text-theme-primary mb-2 group-hover:text-theme-accent">HACKING TERMINAL</h3>
				<p class="text-sm text-text">Solve terminal hacking puzzles using likeness constraints. Master the art of cracking Fallout terminals.</p>
			</a>

			<a href="/armor" class="border-2 border-theme-border p-6 bg-surface hover:bg-border transition-colors group">
				<h3 class="text-xl font-bold text-theme-primary mb-2 group-hover:text-theme-accent">ARMOR WORKBENCH</h3>
				<p class="text-sm text-text">Browse and customize armor pieces with available modifications. Build the perfect protective gear.</p>
			</a>

			<a href="/weapons" class="border-2 border-theme-border p-6 bg-surface hover:bg-border transition-colors group">
				<h3 class="text-xl font-bold text-theme-primary mb-2 group-hover:text-theme-accent">WEAPON WORKBENCH</h3>
				<p class="text-sm text-text">Explore weapon customization and upgrade options. Craft the ultimate arsenal for combat.</p>
			</a>

			<a href="/quests" class="border-2 border-theme-border p-6 bg-surface hover:bg-border transition-colors group">
				<h3 class="text-xl font-bold text-theme-primary mb-2 group-hover:text-theme-accent">QUEST CHECKLIST</h3>
				<p class="text-sm text-text">Track your progress through all major and miscellaneous quests across the Commonwealth.</p>
			</a>

			<a href="/bobbleheads" class="border-2 border-theme-border p-6 bg-surface hover:bg-border transition-colors group">
				<h3 class="text-xl font-bold text-theme-primary mb-2 group-hover:text-theme-accent">BOBBLEHEADS</h3>
				<p class="text-sm text-text">Locate all 20 SPECIAL and Skill bobbleheads hidden throughout the Commonwealth.</p>
			</a>

			<a href="/magazines" class="border-2 border-theme-border p-6 bg-surface hover:bg-border transition-colors group">
				<h3 class="text-xl font-bold text-theme-primary mb-2 group-hover:text-theme-accent">MAGAZINES</h3>
				<p class="text-sm text-text">Track magazines and issues to unlock permanent bonuses and perks.</p>
			</a>
		</div>
	</div>

	<!-- Tips Section -->
	<div class="border-2 border-theme-border p-6 bg-surface">
		<h2 class="text-2xl font-bold text-theme-primary mb-4">TIPS FOR SUCCESS</h2>
		<ul class="space-y-2 text-text">
			<li class="flex gap-3">
				<span class="text-theme-primary font-bold">•</span>
				<span>Use the Hacking Terminal tool to practice and solve terminal puzzles before encountering them in-game.</span>
			</li>
			<li class="flex gap-3">
				<span class="text-theme-primary font-bold">•</span>
				<span>Plan your armor and weapon builds in advance using the workbench tools to optimize your loadout.</span>
			</li>
			<li class="flex gap-3">
				<span class="text-theme-primary font-bold">•</span>
				<span>Track collectibles like bobbleheads and magazines to maximize your character's potential.</span>
			</li>
			<li class="flex gap-3">
				<span class="text-theme-primary font-bold">•</span>
				<span>Use the Quest Checklist to keep track of your progress and ensure you don't miss any objectives.</span>
			</li>
		</ul>
	</div>

	<!-- Theme Settings -->
	<div class="border-2 border-theme-border p-6 bg-surface">
		<h2 class="text-2xl font-bold text-theme-primary mb-4">CUSTOMIZE YOUR EXPERIENCE</h2>
		<p class="text-text mb-4">
			Visit the <a href="/theme" class="text-theme-primary hover:text-theme-accent underline">Theme Settings</a> page to customize the appearance of Fallout 4 Tools with different faction themes.
		</p>
		<p class="text-muted text-sm">
			Choose from Enclave Green, Vault-Tec Yellow, Brotherhood Steel Blue, Nuka-Cola Red, Institute Purple, or create your own custom theme.
		</p>
	</div>
</div>

  
  <style lang="postcss">
    @reference 'twintrinsic/twintrinsic.css';
    @reference './layout.css';

  </style>