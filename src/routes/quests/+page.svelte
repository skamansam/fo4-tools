<script lang="ts">
	import { Container, Progress } from 'twintrinsic';
	import questsData from '$lib/data/quests.json';

	interface Category {
		id: string;
		name: string;
		description: string;
		quests: Array<{ id: string; name: string; completed: boolean }>;
	}

	const categories: Category[] = questsData.categories;
	let questsState = $state(
		categories.reduce(
			(acc, cat) => {
				acc[cat.id] = cat.quests.map((q) => ({ ...q }));
				return acc;
			},
			{} as Record<string, Array<{ id: string; name: string; completed: boolean }>>
		)
	);
	let searchQuery = $state('');

	function calculateProgress(categoryId: string): number {
		const quests = questsState[categoryId];
		if (!quests || quests.length === 0) return 0;
		const completed = quests.filter((q) => q.completed).length;
		return Math.round((completed / quests.length) * 100);
	}

	function calculateOverallProgress(): number {
		const allQuests = Object.values(questsState).flat();
		if (allQuests.length === 0) return 0;
		const completed = allQuests.filter((q) => q.completed).length;
		return Math.round((completed / allQuests.length) * 100);
	}

	function getFilteredCategories() {
		if (!searchQuery.trim()) {
			return categories;
		}

		const query = searchQuery.toLowerCase();
		return categories
			.map((cat) => ({
				...cat,
				quests: cat.quests.filter((q) => q.name.toLowerCase().includes(query))
			}))
			.filter((cat) => cat.quests.length > 0);
	}

</script>

<div class="max-w-6xl mx-auto space-y-6">
	<!-- Header -->
	<div class="border-2 border-theme-border p-6 bg-surface">
		<h1 class="text-4xl font-bold text-theme-primary mb-4">QUEST CHECKLIST</h1>
		<input
			type="text"
			placeholder="Search quests..."
			bind:value={searchQuery}
			class="w-full px-4 py-2 bg-background border-2 border-theme-border text-text placeholder-muted focus:outline-none focus:border-theme-primary transition-colors"
		/>
	</div>

	<!-- Overall Progress Section -->
	<div class="border-2 border-theme-border p-6 bg-surface">
		<h2 class="text-xl font-bold text-theme-primary mb-4">OVERALL PROGRESS</h2>
		<div class="space-y-4">
			<div class="flex justify-between items-center">
				<span class="text-text">Progress</span>
				<span class="text-lg font-bold text-theme-primary">{calculateOverallProgress()}%</span>
			</div>
			<Progress value={calculateOverallProgress()} class="h-3" />
			<p class="text-sm text-muted">
				{Object.values(questsState)
					.flat()
					.filter((q) => q.completed).length} of {Object.values(questsState).flat().length} quests completed
			</p>
		</div>
	</div>

	<!-- Categories Grid -->
	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-theme-primary">
			{searchQuery.trim() ? 'SEARCH RESULTS' : 'QUEST CATEGORIES'}
		</h2>
		{#if getFilteredCategories().length === 0}
			<div class="border-2 border-theme-border p-6 bg-surface text-center">
				<p class="text-muted">No quests found matching "{searchQuery}"</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				{#each getFilteredCategories() as item (item.id)}
					<a
						href="/quests/{item.id}"
						class="block group"
					>
						<div class="border-2 border-theme-border p-6 bg-surface hover:border-theme-primary transition-colors h-full">
							<div class="space-y-4">
								<div>
									<h3 class="text-xl font-bold text-theme-primary group-hover:text-theme-accent transition-colors">
										{item.name}
									</h3>
									<p class="text-sm text-muted mt-1">{item.description}</p>
								</div>
								<div class="space-y-2">
									<div class="flex justify-between items-center">
										<span class="text-sm text-text">Progress</span>
										<span class="text-sm font-bold text-theme-primary">{calculateProgress(item.id)}%</span>
									</div>
									<Progress value={calculateProgress(item.id)} class="h-2" />
									<p class="text-xs text-muted">
										{item.quests.filter((q) => q.completed).length} of {item.quests.length} quests
									</p>
								</div>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	@reference 'twintrinsic/twintrinsic.css';
	@reference '../layout.css';
</style>
