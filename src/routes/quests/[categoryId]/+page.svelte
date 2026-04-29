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
	<div class="max-w-6xl mx-auto space-y-6">
		<!-- Header -->
		<div class="border-2 border-theme-border p-6 bg-surface">
			<a href="/quests" class="text-theme-primary hover:text-theme-accent text-sm mb-4 block">← Back to Quests</a>
			<h1 class="text-4xl font-bold text-theme-primary mb-2">{category.name}</h1>
			<p class="text-muted">{category.description}</p>
		</div>

		<!-- Search Box -->
		<input
			type="text"
			placeholder="Search quests..."
			bind:value={searchQuery}
			class="w-full px-4 py-2 bg-background border-2 border-primary-500 text-text transition-colors focus:bg-surface placeholder:text-primary-900 focus:ring-primary-900"
		/>

		<!-- Progress Section -->
		<div class="border-2 border-theme-border p-6 bg-surface">
			<h2 class="text-xl font-bold text-theme-primary mb-4">PROGRESS</h2>
			<div class="space-y-4">
				<div class="flex justify-between items-center">
					<span class="text-text">Completed</span>
					<span class="text-lg font-bold text-theme-primary">{calculateProgress()}%</span>
				</div>
				<Progress value={calculateProgress()} class="h-3" />
				<p class="text-sm text-muted">
					{questsState.filter((q) => q.completed).length} of {questsState.length} quests completed
				</p>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="flex gap-4">
			<button
				onclick={completeAll}
				class="px-4 py-2 bg-theme-primary hover:bg-theme-accent text-theme-bg font-bold transition-colors"
			>
				COMPLETE ALL
			</button>
			<button
				onclick={resetAll}
				class="px-4 py-2 border-2 border-theme-border bg-surface hover:bg-border font-bold transition-colors"
			>
				RESET ALL
			</button>
		</div>

		<!-- Quest List -->
		<div class="space-y-4">
			<h2 class="text-2xl font-bold text-theme-primary">
				{hasSearch ? 'SEARCH RESULTS' : 'QUESTS'}
			</h2>
			{#if filteredQuests.length === 0}
				<div class="border-2 border-theme-border p-6 bg-surface text-center">
					<p class="text-muted">No quests found matching "{searchQuery}"</p>
				</div>
			{:else}
				<div class="border-2 border-theme-border p-6 bg-surface">
					<div class="space-y-2">
						{#each filteredQuests as quest (quest.id)}
							<div class="flex items-center gap-4 p-3 bg-background border border-theme-border hover:border-theme-primary transition-colors">
								<input
									type="checkbox"
									checked={quest.completed}
									onchange={() => toggleQuest(quest.id)}
									class="w-5 h-5 cursor-pointer"
								/>
								<span
									class={`flex-1 ${
										quest.completed ? 'line-through text-text opacity-60' : 'text-text'
									}`}
								>
									{quest.name}
								</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div class="max-w-6xl mx-auto space-y-6">
		<a href="/quests" class="text-theme-primary hover:text-theme-accent text-sm">← Back to Quests</a>
		<div class="border-2 border-theme-border p-6 bg-surface">
			<h1 class="text-2xl font-bold text-theme-primary">QUEST CATEGORY NOT FOUND</h1>
			<p class="text-muted mt-2">The quest category you're looking for doesn't exist.</p>
		</div>
	</div>
{/if}

<style lang="postcss">
	@reference 'twintrinsic/twintrinsic.css';
	@reference '../../layout.css';
</style>
