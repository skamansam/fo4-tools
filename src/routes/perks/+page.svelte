<script lang="ts">
	import { Card } from 'twintrinsic';
	import perksData from '$lib/data/perks.json';

	interface PerkEntry {
		id: string;
		name: string;
		special: string;
		level: number;
		description: string;
	}

	interface PerksBySpecial {
		[key: string]: PerkEntry[];
	}

	const specialAttributes = ['Strength', 'Perception', 'Endurance', 'Charisma', 'Intelligence', 'Agility', 'Luck'];
	
	let checkedPerks = $state<Set<string>>(new Set());

	const perksBySpecial: PerksBySpecial = perksData.reduce((acc, perk) => {
		if (!acc[perk.special]) {
			acc[perk.special] = [];
		}
		acc[perk.special].push(perk);
		return acc;
	}, {} as PerksBySpecial);

	function togglePerk(perkId: string) {
		if (checkedPerks.has(perkId)) {
			checkedPerks.delete(perkId);
		} else {
			checkedPerks.add(perkId);
		}
	}
</script>

<div class="max-w-7xl mx-auto">
	<div class="mb-8">
		<h2 class="text-3xl font-bold text-primary-500 mb-2">PERKS</h2>
		<p class="text-neutral-600 dark:text-neutral-400">Track and manage your Fallout 4 perks. Click to mark perks as acquired.</p>
	</div>

	<!-- VAULT-TEC Style Grid -->
	<div class="overflow-x-auto border border-neutral-300 dark:border-neutral-700 rounded-lg">
		<div class="inline-block min-w-full">
			<!-- Header Row with SPECIAL Attributes -->
			<div class="grid gap-0" style="grid-template-columns: repeat(7, minmax(200px, 1fr))">
				{#each specialAttributes as special}
					<div class="bg-primary-500 text-white p-4 text-center font-bold border border-neutral-300 dark:border-neutral-700">
						{special.toUpperCase()}
					</div>
				{/each}

				<!-- Perk Rows -->
				{#each Array.from({ length: 10 }, (_, i) => i + 1) as level}
					{#each specialAttributes as special}
						<div class="border border-neutral-300 dark:border-neutral-700 p-4 bg-neutral-50 dark:bg-neutral-900 min-h-[200px]">
							<div class="space-y-3">
								{#each perksBySpecial[special]?.filter(p => p.level === level) || [] as perk}
									<div class="flex items-start gap-2">
										<input
											type="checkbox"
											id={perk.id}
											checked={checkedPerks.has(perk.id)}
											onchange={() => togglePerk(perk.id)}
											class="mt-1 w-4 h-4 cursor-pointer"
										/>
										<label for={perk.id} class="flex-1 cursor-pointer">
											<div class="font-semibold text-sm text-neutral-900 dark:text-white">
												{perk.name}
											</div>
											<div class="text-xs text-neutral-600 dark:text-neutral-400">
												{perk.description}
											</div>
										</label>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				{/each}
			</div>
		</div>
	</div>

	<!-- Summary Section -->
	<div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
		<Card>
			<div class="p-6">
				<h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-2">Perks Acquired</h3>
				<p class="text-3xl font-bold text-primary-500">{checkedPerks.size} / {perksData.length}</p>
			</div>
		</Card>

		<Card>
			<div class="p-6">
				<h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-2">Progress by SPECIAL</h3>
				<div class="space-y-2">
					{#each specialAttributes as special}
						{@const total = perksBySpecial[special]?.length || 0}
						{@const acquired = perksBySpecial[special]?.filter(p => checkedPerks.has(p.id)).length || 0}
						<div class="flex justify-between items-center text-sm">
							<span class="font-medium text-neutral-700 dark:text-neutral-300">{special}</span>
							<span class="text-primary-500 font-bold">{acquired}/{total}</span>
						</div>
					{/each}
				</div>
			</div>
		</Card>
	</div>
</div>
