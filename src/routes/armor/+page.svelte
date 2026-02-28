<script lang="ts">
	import { perkStore } from '$lib/stores/perkStore';
	import { calculateFinalArmorStats } from '$lib/utils/perkCalculator';
	import perkEffectsData from '$lib/data/perkEffects.json';
	import armorData from '$lib/data/armor.json';

	interface ArmorMod {
		id: string;
		name: string;
		effect: string;
		resistanceBonus?: number;
		energyResistanceBonus?: number;
		materials: Record<string, number>;
	}

	interface ArmorPiece {
		id: string;
		name: string;
		type: string;
		armorType: string;
		baseResistance: number;
		baseEnergyResistance: number;
		mods: ArmorMod[];
	}

	let selectedArmor: ArmorPiece | null = $state(null);
	let selectedMod: ArmorMod | null = $state(null);
	let armorPieces: ArmorPiece[] = $state([]);
	let activePerkRanks = $state<Map<string, number>>(new Map());

	// Subscribe to perk store changes
	$effect(() => {
		perkStore.subscribe((perks) => {
			activePerkRanks = new Map(perks);
		})();
	});

	function loadArmorData() {
		armorPieces = armorData as ArmorPiece[];
	}

	function selectArmor(armor: ArmorPiece) {
		selectedArmor = armor;
		selectedMod = null;
	}

	function selectMod(mod: ArmorMod) {
		selectedMod = mod;
	}

	function calculateModBonus(): { resistance: number; energyResistance: number } {
		if (!selectedArmor || !selectedMod) {
			return { resistance: 0, energyResistance: 0 };
		}
		return {
			resistance: selectedMod.resistanceBonus || 0,
			energyResistance: selectedMod.energyResistanceBonus || 0
		};
	}

	function calculateFinalStats(): { resistance: number; energyResistance: number } {
		if (!selectedArmor) return { resistance: 0, energyResistance: 0 };
		const modBonus = calculateModBonus();
		const baseResistance = selectedArmor.baseResistance + modBonus.resistance;
		const baseEnergyResistance = selectedArmor.baseEnergyResistance + modBonus.energyResistance;
		return calculateFinalArmorStats(
			baseResistance,
			baseEnergyResistance,
			selectedArmor.armorType,
			activePerkRanks,
			perkEffectsData.armorPerkModifiers
		);
	}

	function getApplicablePerks(): { name: string; rank: number; resistanceBonus: number; energyResistanceBonus: number }[] {
		if (!selectedArmor) return [];
		const applicable = [];
		for (const modifier of perkEffectsData.armorPerkModifiers) {
			if (modifier.armorTypes.includes(selectedArmor.armorType) || modifier.armorTypes.includes('all')) {
				const rank = activePerkRanks.get(modifier.perkId) || 0;
				if (rank > 0) {
					const effect = modifier.effects.find((e) => e.rank === rank);
					applicable.push({
						name: modifier.name,
						rank,
						resistanceBonus: effect?.resistanceBonus || 0,
						energyResistanceBonus: effect?.energyResistanceBonus || 0
					});
				}
			}
		}
		return applicable;
	}

	$effect(() => {
		loadArmorData();
	});
</script>

<div class="max-w-6xl mx-auto">
	<div class="border-2 border-fo4-green p-6 bg-fo4-black mb-6">
		<h2 class="text-2xl font-bold text-fo4-green-light mb-2">ARMOR WORKBENCH</h2>
		<p class="text-sm opacity-75">Browse and customize armor pieces with available modifications.</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
		<!-- Armor Selection Panel -->
		<div class="border-2 border-fo4-green p-6 bg-fo4-black">
			<h3 class="text-lg font-bold text-fo4-green-light mb-4">ARMOR PIECES</h3>
			<div class="space-y-2 max-h-96 overflow-y-auto">
				{#each armorPieces as armor}
					<button
						onclick={() => selectArmor(armor)}
						class="w-full text-left p-3 border-2 {selectedArmor?.id === armor.id
							? 'border-fo4-green bg-fo4-green text-fo4-black'
							: 'border-fo4-green bg-fo4-dark text-fo4-green hover:bg-fo4-green hover:text-fo4-black'} transition"
					>
						<div class="font-bold text-sm">{armor.name}</div>
						<div class="text-xs opacity-75">{armor.type}</div>
					</button>
				{/each}
			</div>
		</div>

		<!-- Details Panel -->
		<div class="lg:col-span-3 space-y-6">
			{#if selectedArmor}
				<!-- Armor Details -->
				<div class="border-2 border-fo4-green p-6 bg-fo4-black">
					<h3 class="text-lg font-bold text-fo4-green-light mb-4">ARMOR DETAILS</h3>
					<div class="space-y-3">
						<div>
							<p class="text-sm opacity-75">Name:</p>
							<p class="text-lg font-bold">{selectedArmor.name}</p>
						</div>
						<div>
							<p class="text-sm opacity-75">Type:</p>
							<p class="text-lg font-bold">{selectedArmor.type}</p>
						</div>
						<div>
							<p class="text-sm opacity-75">Base Damage Resistance:</p>
							<p class="text-lg font-bold">{selectedArmor.baseResistance}</p>
						</div>
						<div>
							<p class="text-sm opacity-75">Base Energy Resistance:</p>
							<p class="text-lg font-bold">{selectedArmor.baseEnergyResistance}</p>
						</div>
					</div>
				</div>

				<!-- Modifications -->
				<div class="border-2 border-fo4-green p-6 bg-fo4-black">
					<h3 class="text-lg font-bold text-fo4-green-light mb-4">AVAILABLE MODIFICATIONS</h3>
					<div class="space-y-2">
						{#each selectedArmor.mods as mod}
							<button
								onclick={() => selectMod(mod)}
								class="w-full text-left p-3 border-2 {selectedMod?.id === mod.id
									? 'border-fo4-green bg-fo4-green text-fo4-black'
									: 'border-fo4-green bg-fo4-dark text-fo4-green hover:bg-fo4-green hover:text-fo4-black'} transition"
							>
								<div class="font-bold">{mod.name}</div>
								<div class="text-sm opacity-75">{mod.effect}</div>
							</button>
						{/each}
					</div>
				</div>

				<!-- Mod Details -->
				{#if selectedMod}
					<div class="border-2 border-fo4-green p-6 bg-fo4-black">
						<h3 class="text-lg font-bold text-fo4-green-light mb-4">MODIFICATION DETAILS</h3>
						<div class="space-y-3">
							<div>
								<p class="text-sm opacity-75">Name:</p>
								<p class="text-lg font-bold">{selectedMod.name}</p>
							</div>
							<div>
								<p class="text-sm opacity-75">Effect:</p>
								<p class="text-lg font-bold">{selectedMod.effect}</p>
							</div>
							{#if selectedMod.resistanceBonus}
								<div>
									<p class="text-sm opacity-75">Damage Resistance Bonus:</p>
									<p class="text-lg font-bold">+{selectedMod.resistanceBonus}</p>
								</div>
							{/if}
							{#if selectedMod.energyResistanceBonus}
								<div>
									<p class="text-sm opacity-75">Energy Resistance Bonus:</p>
									<p class="text-lg font-bold">+{selectedMod.energyResistanceBonus}</p>
								</div>
							{/if}
							<div>
								<p class="text-sm opacity-75 mb-2">Materials Required:</p>
								<div class="space-y-1">
									{#each Object.entries(selectedMod.materials) as [material, amount]}
										<p class="text-sm">{material.charAt(0).toUpperCase() + material.slice(1)}: {amount}</p>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{/if}

				<!-- Applicable Perks -->
				{#if selectedArmor && getApplicablePerks().length > 0}
					<div class="border-2 border-fo4-green p-6 bg-fo4-black">
						<h3 class="text-lg font-bold text-fo4-green-light mb-4">APPLICABLE PERKS</h3>
						<div class="space-y-3">
							{#each getApplicablePerks() as perk}
								<div class="flex justify-between items-center p-3 bg-fo4-dark border border-fo4-green">
									<div>
										<p class="font-semibold text-sm">{perk.name}</p>
										<p class="text-xs opacity-75">Rank {perk.rank}</p>
									</div>
									<div class="text-right">
										{#if perk.resistanceBonus > 0}
											<p class="text-sm font-bold text-fo4-green-light">+{perk.resistanceBonus} DR</p>
										{/if}
										{#if perk.energyResistanceBonus > 0}
											<p class="text-sm font-bold text-fo4-green-light">+{perk.energyResistanceBonus} ER</p>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Final Resistance with Perks -->
				{#if selectedArmor}
					<div class="border-2 border-fo4-green p-6 bg-fo4-black">
						<h3 class="text-lg font-bold text-fo4-green-light mb-4">FINAL RESISTANCE CALCULATION</h3>
						<div class="space-y-3">
							<div class="flex justify-between items-center p-3 bg-fo4-dark border border-fo4-green">
								<p class="text-sm">Base Damage Resistance:</p>
								<p class="text-lg font-bold">{selectedArmor.baseResistance}</p>
							</div>
							<div class="flex justify-between items-center p-3 bg-fo4-dark border border-fo4-green">
								<p class="text-sm">Base Energy Resistance:</p>
								<p class="text-lg font-bold">{selectedArmor.baseEnergyResistance}</p>
							</div>
							{#if selectedMod && (selectedMod.resistanceBonus || selectedMod.energyResistanceBonus)}
								<div class="flex justify-between items-center p-3 bg-fo4-dark border border-fo4-green">
									<p class="text-sm">With Mod ({selectedMod.name}):</p>
									<div class="text-right">
										{#if selectedMod.resistanceBonus}
											<p class="text-sm font-bold">DR: {selectedArmor.baseResistance + selectedMod.resistanceBonus}</p>
										{/if}
										{#if selectedMod.energyResistanceBonus}
											<p class="text-sm font-bold">ER: {selectedArmor.baseEnergyResistance + selectedMod.energyResistanceBonus}</p>
										{/if}
									</div>
								</div>
							{/if}
							{#if getApplicablePerks().length > 0}
								<div class="flex justify-between items-center p-3 bg-fo4-dark border border-fo4-green-light">
									<p class="text-sm font-semibold">With Perks:</p>
									<div class="text-right">
										<p class="text-sm font-bold text-fo4-green-light">DR: {calculateFinalStats().resistance}</p>
										<p class="text-sm font-bold text-fo4-green-light">ER: {calculateFinalStats().energyResistance}</p>
									</div>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			{:else}
				<div class="border-2 border-fo4-green p-6 bg-fo4-black text-center">
					<p class="text-sm opacity-50">Select an armor piece to view details and modifications.</p>
				</div>
			{/if}
		</div>
	</div>
</div>
