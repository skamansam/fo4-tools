<script lang="ts">
	import { Progress } from 'twintrinsic';
	import { page } from '$app/stores';
	import questsData from '$lib/data/quests.json';

	interface Quest {
		id: string;
		name: string;
		completed: boolean;
	}

	interface Category {
		id: string;
		name: string;
		description: string;
		quests: Quest[];
	}

	const categoryId = $page.params.categoryId;
	const category = questsData.categories.find((c) => c.id === categoryId) as Category | undefined;

	let questsState = $state<Quest[]>(
		category ? category.quests.map((q) => ({ ...q })) : []
	);
	let searchQuery = $state('');

	// biome-ignore lint/correctness/noUnusedVariables: Used in event handlers
	function toggleQuest(questId: string) {
		const quest = questsState.find((q) => q.id === questId);
		if (quest) {
			quest.completed = !quest.completed;
		}
	}

	function calculateProgress(): number {
		if (questsState.length === 0) return 0;
		const completed = questsState.filter((q) => q.completed).length;
		return Math.round((completed / questsState.length) * 100);
	}

	let filteredQuests = $derived.by(() => {
		const query = searchQuery.toLowerCase().trim();
		if (!query) {
			return questsState;
		}
		return questsState.filter((q) => q.name.toLowerCase().includes(query));
	});

	let hasSearch = $derived(searchQuery.trim().length > 0);

	// biome-ignore lint/correctness/noUnusedVariables: Used in event handlers
	function completeAll() {
		questsState.forEach((q) => {
			q.completed = true;
		});
	}

	// biome-ignore lint/correctness/noUnusedVariables: Used in event handlers
	function resetAll() {
		questsState.forEach((q) => {
			q.completed = false;
		});
	}
</script>

{#if category}
	<div class="max-w-4xl mx-auto space-y-8">
		<!-- Header -->
		<div class="space-y-4">
			<a href="/quests" class="text-blue-400 hover:text-blue-300 text-sm">← Back to Quests</a>
			<h1 class="text-4xl font-bold">{category.name}</h1>
			<p class="text-slate-400">{category.description}</p>
		</div>

		<!-- Search Box -->
		<input
			type="text"
			placeholder="Search quests..."
			bind:value={searchQuery}
			class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
		/>

		<!-- Progress Section -->
		<div class="p-6 bg-slate-900 border border-slate-700 rounded-lg space-y-4">
			<div class="flex justify-between items-center">
				<h2 class="text-xl font-semibold">Progress</h2>
				<span class="text-lg font-bold text-blue-400">{calculateProgress()}%</span>
			</div>
			<Progress value={calculateProgress()} class="h-3" />
			<p class="text-sm text-slate-400">
				{questsState.filter((q) => q.completed).length} of {questsState.length} quests completed
			</p>
		</div>

		<!-- Action Buttons -->
		<div class="flex gap-4">
			<button
				onclick={completeAll}
				class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
			>
				Complete All
			</button>
			<button
				onclick={resetAll}
				class="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-colors"
			>
				Reset All
			</button>
		</div>

		<!-- Quest List -->
		<div class="space-y-3">
			<h2 class="text-2xl font-bold">
				{hasSearch ? 'Search Results' : 'Quests'}
			</h2>
			{#if filteredQuests.length === 0}
				<div class="p-6 bg-slate-900 border border-slate-700 rounded-lg text-center">
					<p class="text-slate-400">No quests found matching "{searchQuery}"</p>
				</div>
			{:else}
				<div class="space-y-2">
					{#each filteredQuests as quest (quest.id)}
						<div class="flex items-center gap-4 p-4 bg-slate-900 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors">
							<input
								type="checkbox"
								checked={quest.completed}
								onchange={() => toggleQuest(quest.id)}
								class="w-5 h-5 rounded cursor-pointer"
							/>
							<span
								class={`flex-1 ${
									quest.completed ? 'line-through text-slate-500' : 'text-slate-100'
								}`}
							>
								{quest.name}
							</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div class="max-w-4xl mx-auto space-y-4">
		<a href="/quests" class="text-blue-400 hover:text-blue-300 text-sm">← Back to Quests</a>
		<div class="p-6 bg-red-900 border border-red-700 rounded-lg">
			<h1 class="text-2xl font-bold text-red-100">Quest Category Not Found</h1>
			<p class="text-red-200 mt-2">The quest category you're looking for doesn't exist.</p>
		</div>
	</div>
{/if}

<style lang="postcss">
	@reference 'twintrinsic/twintrinsic.css';
	@reference '../../layout.css';
</style>
