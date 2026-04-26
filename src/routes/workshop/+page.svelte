<script lang="ts">
	import workshopData from '$lib/data/workshop.json';

	interface WorkshopItem {
		id: string;
		name: string;
		category: string;
		location: string;
		description: string;
		materials: Record<string, number>;
		components: Record<string, number>;
		power: number;
		tags: string[];
	}

	let searchQuery = $state('');
	let selectedCategory = $state('');
	let selectedItem: WorkshopItem | null = $state(null);
	let items: WorkshopItem[] = $state([]);

	$effect(() => {
		items = workshopData as WorkshopItem[];
	});

	function getCategories(): string[] {
		const categories = new Set(items.map((i) => i.category));
		return Array.from(categories).sort();
	}

	function getFilteredItems(): WorkshopItem[] {
		return items.filter((i) => {
			const matchesSearch =
				searchQuery === '' ||
				i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				i.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
				i.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

			const matchesCategory = selectedCategory === '' || i.category === selectedCategory;

			return matchesSearch && matchesCategory;
		});
	}
</script>

<div class="max-w-6xl mx-auto">
	<div class="border-2 border-primary-500 p-6 bg-surface mb-6">
		<h2 class="text-2xl font-bold text-primary-300 mb-2">WORKSHOP BUILDABLES</h2>
		<p class="text-sm opacity-75">Search and locate workshop buildable items in your settlements.</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
		<!-- Search & Filter Panel -->
		<div class="border-2 border-primary-500 p-6 bg-surface">
			<h3 class="text-lg font-bold text-primary-300 mb-4">SEARCH & FILTER</h3>

			<!-- Search Input -->
			<div class="mb-4">
				<label for="search" class="block text-sm font-bold text-primary-300 mb-2">
					SEARCH ITEMS
				</label>
				<input
					id="search"
					type="text"
					bind:value={searchQuery}
					placeholder="Search by name, tag..."
					class="w-full p-2 bg-background border-2 border-primary-500 text-text placeholder-muted placeholder-opacity-50 focus:outline-none focus:bg-surface"
				/>
			</div>

			<!-- Category Filter -->
			<div class="mb-4">
				<label for="category" class="block text-sm font-bold text-primary-300 mb-2">
					CATEGORY
				</label>
				<select
					bind:value={selectedCategory}
					class="w-full p-2 bg-background border-2 border-primary-500 text-text focus:outline-none focus:bg-surface"
				>
					<option value="">All Categories</option>
					{#each getCategories() as c (c)}
						<option value={c}>{c}</option>
					{/each}
				</select>
			</div>

			<!-- Clear Filters -->
			<button
				onclick={() => {
					searchQuery = '';
					selectedCategory = '';
					selectedItem = null;
				}}
				class="w-full p-2 border-2 border-primary-500 bg-background text-text hover:bg-primary-500 hover:text-background transition font-bold text-sm"
			>
				CLEAR FILTERS
			</button>

			<!-- Results Count -->
			<div class="mt-4 p-3 bg-background border border-primary-500">
				<p class="text-sm text-primary-300">
					{getFilteredItems().length} of {items.length} items
				</p>
			</div>
		</div>

		<!-- Items List & Details -->
		<div class="lg:col-span-3 space-y-6">
			<!-- Items List -->
			<div class="border-2 border-primary-500 p-6 bg-surface">
				<h3 class="text-lg font-bold text-primary-300 mb-4">AVAILABLE ITEMS</h3>
				<div class="space-y-2 max-h-96 overflow-y-auto">
					{#if getFilteredItems().length > 0}
						{#each getFilteredItems() as itm (itm.id)}
							<button
								onclick={() => (selectedItem = itm)}
								class="w-full text-left p-3 border-2 {selectedItem?.id === itm.id
									? 'border-primary-500 bg-primary-500 text-background'
									: 'border-primary-500 bg-background text-text hover:bg-primary-500 hover:text-background'} transition"
							>
								<div class="font-bold text-sm">{itm.name}</div>
								<div class="text-xs opacity-75">{itm.category}</div>
								{#if itm.power > 0}
									<div class="text-xs text-warning-500">Power: {itm.power}</div>
								{/if}
							</button>
						{/each}
					{:else}
						<div class="p-4 text-center text-sm opacity-50">
							No items match your search.
						</div>
					{/if}
				</div>
			</div>

			<!-- Item Details -->
			{#if selectedItem}
				<div class="border-2 border-primary-500 p-6 bg-surface">
					<h3 class="text-lg font-bold text-primary-300 mb-4">ITEM DETAILS</h3>
					<div class="space-y-3">
						<div>
							<p class="text-sm opacity-75">Name:</p>
							<p class="text-lg font-bold">{selectedItem.name}</p>
						</div>
						<div>
							<p class="text-sm opacity-75">Category:</p>
							<p class="text-lg font-bold">{selectedItem.category}</p>
						</div>
						<div>
							<p class="text-sm opacity-75">Description:</p>
							<p class="text-sm">{selectedItem.description}</p>
						</div>
						<div>
							<p class="text-sm opacity-75 mb-2">Location in Workshop Menu:</p>
							<p class="text-sm font-mono bg-background p-2 border border-primary-500">
								{selectedItem.location}
							</p>
						</div>
						{#if selectedItem.power > 0}
							<div>
								<p class="text-sm opacity-75">Power Requirement:</p>
								<p class="text-lg font-bold text-warning-500">{selectedItem.power} Power</p>
							</div>
						{/if}
					</div>
				</div>

				<!-- Materials Required -->
				<div class="border-2 border-primary-500 p-6 bg-surface">
					<h3 class="text-lg font-bold text-primary-300 mb-4">MATERIALS REQUIRED</h3>
					<div class="space-y-2">
						{#each Object.entries(selectedItem.materials) as [mat, amt] (mat)}
							<div class="flex justify-between items-center p-3 bg-background border border-primary-500">
								<p class="text-sm font-semibold capitalize">{mat}</p>
								<p class="text-lg font-bold">{amt}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Components Required -->
				<div class="border-2 border-primary-500 p-6 bg-surface">
					<h3 class="text-lg font-bold text-primary-300 mb-4">COMPONENTS REQUIRED</h3>
					<div class="space-y-2">
						{#each Object.entries(selectedItem.components) as [comp, qty] (comp)}
							<div class="flex justify-between items-center p-3 bg-background border border-primary-500">
								<p class="text-sm font-semibold capitalize">{comp}</p>
								<p class="text-lg font-bold">{qty}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Tags -->
				<div class="border-2 border-primary-500 p-6 bg-surface">
					<h3 class="text-lg font-bold text-primary-300 mb-4">TAGS</h3>
					<div class="flex flex-wrap gap-2">
						{#each selectedItem.tags as tg (tg)}
							<span class="px-3 py-1 bg-primary-500 text-background text-xs font-bold rounded">
								{tg}
							</span>
						{/each}
					</div>
				</div>
			{:else}
				<div class="border-2 border-primary-500 p-6 bg-surface text-center">
					<p class="text-sm opacity-50">Select an item to view details and materials required.</p>
				</div>
			{/if}
		</div>
	</div>
</div>
