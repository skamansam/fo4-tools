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

<div class="max-w-none">
	<div class="space-y-8">
		<!-- Header and Search -->
		<div class="space-y-4">
			<h1 class="text-4xl font-bold">Quest Checklist</h1>
			<input
				type="text"
				placeholder="Search quests..."
				bind:value={searchQuery}
				class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
			/>
		</div>

		<!-- Overall Progress Section -->
		<div class="space-y-4">
			<div class="p-6 bg-slate-900 border border-slate-700 rounded-lg">
				<div class="space-y-4">
					<div>
						<div class="flex justify-between items-center mb-2">
							<h2 class="text-xl font-semibold">Overall Progress</h2>
							<span class="text-lg font-bold text-blue-400">{calculateOverallProgress()}%</span>
						</div>
						<Progress value={calculateOverallProgress()} class="h-3" />
					</div>
					<p class="text-sm text-slate-400">
						{Object.values(questsState)
							.flat()
							.filter((q) => q.completed).length} of {Object.values(questsState).flat().length} quests completed
					</p>
				</div>
			</div>
		</div>

		<!-- Categories Grid -->
		<div class="space-y-4">
			<h2 class="text-2xl font-bold">
				{searchQuery.trim() ? 'Search Results' : 'Quest Categories'}
			</h2>
			{#if getFilteredCategories().length === 0}
				<div class="p-6 bg-slate-900 border border-slate-700 rounded-lg text-center">
					<p class="text-slate-400">No quests found matching "{searchQuery}"</p>
				</div>
			{:else}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					{#each getFilteredCategories() as item (item.id)}
						<a
							href="/quests/{item.id}"
							class="block group"
						>
							<div class="p-6 bg-slate-900 border border-slate-700 hover:border-blue-500 transition-colors h-full rounded-lg">
								<div class="space-y-4">
									<div>
										<h3 class="text-xl font-semibold group-hover:text-blue-400 transition-colors">
											{item.name}
										</h3>
										<p class="text-sm text-slate-400 mt-1">{item.description}</p>
									</div>
									<div class="space-y-2">
										<div class="flex justify-between items-center">
											<span class="text-sm text-slate-300">Progress</span>
											<span class="text-sm font-bold text-blue-400">{calculateProgress(item.id)}%</span>
										</div>
										<Progress value={calculateProgress(item.id)} class="h-2" />
										<p class="text-xs text-slate-500">
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
</div>

<style lang="postcss">
	@reference 'twintrinsic/twintrinsic.css';
	@reference '../layout.css';
</style>
