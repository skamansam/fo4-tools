<script lang="ts">
	import { Card, Rating, Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from 'twintrinsic';
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
	let specialRanks = $state<Record<string, number>>({});
	let userLevel = $state<number>(1);

	// SPECIAL attributes constants
	const SPECIAL_BASE_POINTS = 1;
	const SPECIAL_TOTAL_POINTS = 21;
	const SPECIAL_MAX_PER_STAT = 10;

	// Calculate SPECIAL points
	let totalSpecialPoints = $derived(SPECIAL_TOTAL_POINTS);
	let usedSpecialPoints = $derived(Object.values(specialRanks).reduce((sum, rank) => sum + rank, 0));
	let remainingSpecialPoints = $derived(totalSpecialPoints - usedSpecialPoints);
	let specialPointsAssigned = $derived(usedSpecialPoints === totalSpecialPoints);

	// Calculate perk points
	let totalPerkPoints = $derived(userLevel);
	let usedPerkPoints = $derived(Array.from(activePerkRanks.values()).reduce((sum, rank) => sum + rank, 0));
	let remainingPerkPoints = $derived(totalPerkPoints - usedPerkPoints);
	let perksLocked = $derived(!specialPointsAssigned);

	// Initialize specialRanks
	$effect(() => {
		for (const special of specialAttributes) {
			if (!(special in specialRanks)) {
				specialRanks[special] = 4;
			}
		}
	});

	let perksBySpecial = $state<PerksBySpecial>(perksData.reduce((acc, perk) => {
		if (!acc[perk.special]) {
			acc[perk.special] = [];
		}
		acc[perk.special].push(perk);
		return acc;
	}, {} as PerksBySpecial));

	// Subscribe to perk store changes
	$effect(() => {
		const unsubscribe = perkStore.subscribe((perks) => {
			activePerkRanks = new Map(perks);
		});
		return unsubscribe;
	});

	function handlePerkRankChange(perkId: string, event: CustomEvent<{ value: number }>) {
		perkStore.setPerkRank(perkId, event.detail.value);
	}

	function handlePerkHover(perkId: string, event: CustomEvent<{ value: number }>) {
		hoveredPerkId = perkId;
		hoveredRank = event.detail.value;
	}

	function handleSpecialRankChange(special: string, event: CustomEvent<{ value: number }>) {
		specialRanks[special] = event.detail.value;
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
		<p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">Assign {totalSpecialPoints} S.P.E.C.I.A.L. points in the table header to unlock perks</p>
	</div>

		<!-- VAULT-TEC Style Grid with Table Styling -->
	<div class="overflow-x-auto">
		<Table bordered striped>
			<TableHead>
				<TableRow>
					{#each specialAttributes as special}
						<TableHeader class="p-4 text-center bg-primary-500 text-white">
							<div class="flex flex-col gap-2 items-center">
								<div class="font-bold">{special.toUpperCase()}</div>
								<Rating
									value={specialRanks[special] || 0}
									max={10}
									min={1}
									size="sm"
									variant="primary"
									showValue={true}
									onchange={(e) => handleSpecialRankChange(special, e)}
								/>
							</div>
						</TableHeader>
					{/each}
				</TableRow>
			</TableHead>
			<TableBody>
				{#each Array.from({ length: 10 }, (_, i) => i + 1) as level}
					<TableRow>
						{#each specialAttributes as special}
							<TableCell class="p-4 bg-neutral-50 dark:bg-neutral-900 min-h-[200px]">
								<div class="space-y-4 {specialRanks[special] === 0 || specialRanks[special] < level ? 'opacity-50' : ''}">
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
													size="sm"
													variant="primary"
													showValue={true}
													showPreview={true}
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
							</TableCell>
						{/each}
					</TableRow>
				{/each}
			</TableBody>
		</Table>
		</div>
	</div>