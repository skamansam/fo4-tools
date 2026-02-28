<script lang="ts">
	import { Card, Rating } from 'twintrinsic';
	import { perkStore } from '$lib/stores/perkStore';
	import perksData from '$lib/data/perks.json';

	interface PerkEffect {
		rank: number;
		description: string;
		appliesToWeaponTypes?: string[];
		damageBonus?: number;
	}

	interface PerkEntry {
		id: string;
		name: string;
		special: string;
		level: number;
		description: string;
		maxRank?: number;
		effects?: PerkEffect[];
	}

	interface PerksBySpecial {
		[key: string]: PerkEntry[];
	}

	const specialAttributes = ['Strength', 'Perception', 'Endurance', 'Charisma', 'Intelligence', 'Agility', 'Luck'];
	
	let activePerkRanks = $state<Map<string, number>>(new Map());
	let hoveredPerkId = $state<string | null>(null);
	let hoveredRank = $state<number>(0);

	let perksBySpecial = $state<PerksBySpecial>(perksData.reduce((acc, perk) => {
		if (!acc[perk.special]) {
			acc[perk.special] = [];
		}
		acc[perk.special].push(perk);
		return acc;
	}, {} as PerksBySpecial));

	// Subscribe to perk store changes
	$effect(() => {
		perkStore.subscribe((perks) => {
			activePerkRanks = new Map(perks);
		})();
	});

	function handlePerkRankChange(perkId: string, event: CustomEvent<{ value: number }>) {
		perkStore.setPerkRank(perkId, event.detail.value);
	}

	function handlePerkHover(perkId: string, event: CustomEvent<{ value: number }>) {
		hoveredPerkId = perkId;
		hoveredRank = event.detail.value;
	}

	function getNextRankDescription(perk: PerkEntry): string {
		if (!perk.effects) return '';
		const currentRank = activePerkRanks.get(perk.id) || 0;
		const displayRank = hoveredPerkId === perk.id ? hoveredRank : currentRank + 1;
		const nextEffect = perk.effects.find((e) => e.rank === displayRank);
		return nextEffect?.description || '';
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
							<div class="space-y-4">
								{#each perksBySpecial[special]?.filter(p => p.level === level) || [] as perk}
									<div class="flex flex-col gap-2 border border-neutral-200 dark:border-neutral-800 p-3 rounded bg-white dark:bg-neutral-950">
										<div>
											<div class="font-semibold text-sm text-neutral-900 dark:text-white">
												{perk.name}
											</div>
											<div class="text-xs text-neutral-600 dark:text-neutral-400">
												{perk.description}
											</div>
										</div>
										<Rating
											value={activePerkRanks.get(perk.id) || 0}
											max={5}
											precision={1}
											size="sm"
											variant="primary"
											showValue={true}
											onchange={(e) => handlePerkRankChange(perk.id, e)}
											onhover={(e) => handlePerkHover(perk.id, e)}
										/>
										{#if perk.effects && perk.effects.length > 0}
											<div class="text-xs text-neutral-600 dark:text-neutral-400 italic min-h-[2.5rem]">
												{getNextRankDescription(perk)}
											</div>
										{/if}
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
				<p class="text-3xl font-bold text-primary-500">{activePerkRanks.size} / {perksData.length}</p>
			</div>
		</Card>

		<Card>
			<div class="p-6">
				<h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-2">Progress by SPECIAL</h3>
				<div class="space-y-2">
					{#each specialAttributes as special}
						{@const total = perksBySpecial[special]?.length || 0}
						{@const acquired = perksBySpecial[special]?.filter(p => activePerkRanks.has(p.id)).length || 0}
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
