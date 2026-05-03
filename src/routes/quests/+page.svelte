<script lang="ts">
	import { Container, Progress, Section } from 'twintrinsic';
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
	<Section title="QUEST CHECKLIST" class="border-2 border-primary-500 p-6 bg-surface mb-6">
		<input
			type="text"
			placeholder="Search quests..."
			bind:value={searchQuery}
			class="w-full px-4 py-2 bg-background border-2 border-primary-500 text-text transition-colors focus:bg-surface placeholder:text-primary-900 focus:ring-primary-900"
		/>
	</Section>

	<!-- Overall Progress Section -->
	<Section title="OVERALL PROGRESS" class="border-2 border-primary-500 p-6 bg-surface mb-6">
		<div class="space-y-4">
			<div class="flex justify-between items-center">
				<span class="text-text">Progress</span>
				<span class="text-lg font-bold text-primary-300">{calculateOverallProgress()}%</span>
			</div>
			<Progress value={calculateOverallProgress()} class="h-3" />
			<p class="text-sm text-muted">
				{Object.values(questsState)
					.flat()
					.filter((q) => q.completed).length} of {Object.values(questsState).flat().length} quests completed
			</p>
		</div>
	</Section>

	<!-- Categories Grid -->
	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-primary-300">
			{searchQuery.trim() ? 'SEARCH RESULTS' : 'QUEST CATEGORIES'}
		</h2>
		{#if getFilteredCategories().length === 0}
			<div class="border-2 border-primary-500 p-6 bg-surface text-center">
				<p class="text-muted">No quests found matching "{searchQuery}"</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				{#each getFilteredCategories() as item (item.id)}
					<a
						href="/quests/{item.id}"
						class="block group"
					>
						<div class="border-2 border-primary-500 p-6 bg-surface hover:border-primary-500 hover:bg-primary-500 hover:text-background transition-colors h-full">
							<div class="space-y-4">
								<div>
									<h3 class="text-xl font-bold text-primary-300 group-hover:text-background transition-colors">
										{item.name}
									</h3>
									<p class="text-sm text-muted mt-1 group-hover:text-background">{item.description}</p>
								</div>
								<div class="space-y-2">
									<div class="flex justify-between items-center">
										<span class="text-sm text-text group-hover:text-background">Progress</span>
										<span class="text-sm font-bold text-primary-300 group-hover:text-background">{calculateProgress(item.id)}%</span>
									</div>
									<Progress value={calculateProgress(item.id)} class="h-2" />
									<p class="text-xs text-muted group-hover:text-background">
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
