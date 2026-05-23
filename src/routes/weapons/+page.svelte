<script lang="ts">
	import { Section } from 'twintrinsic';
	import perkEffectsData from '$lib/data/perkEffects.json';
	import weaponsData from '$lib/data/weapons.json';
	import { perkStore } from '$lib/stores/perkStore';
	import { calculateFinalWeaponStats } from '$lib/utils/perkCalculator';

	interface WeaponMod {
		id: string;
		name: string;
		effect: string;
		damageModifier: number;
		materials: Record<string, number>;
	}

	interface Weapon {
		id: string;
		name: string;
		type: string;
		weaponType: string;
		baseDamage: number;
		fireRate: number;
		accuracy: number;
		weight: number;
		mods: WeaponMod[];
	}

	let selectedWeapon: Weapon | null = $state(null);
	let selectedMod: WeaponMod | null = $state(null);
	let weapons: Weapon[] = $state([]);
	let activePerkRanks = $state<Map<string, number>>(new Map());

	// Subscribe to perk store changes
	$effect(() => {
		perkStore.subscribe((perks) => {
			activePerkRanks = new Map(perks);
		})();
	});

	function loadWeaponData() {
		weapons = weaponsData as Weapon[];
	}

	function selectWeapon(weapon: Weapon) {
		selectedWeapon = weapon;
		selectedMod = null;
	}

	function selectMod(mod: WeaponMod) {
		selectedMod = mod;
	}

	function calculateModifiedDamage(): number {
		if (!selectedWeapon || !selectedMod) return selectedWeapon?.baseDamage || 0;
		return Math.round(selectedWeapon.baseDamage * selectedMod.damageModifier);
	}

	function calculateFinalDamage(): number {
		if (!selectedWeapon) return 0;
		const baseDamage = calculateModifiedDamage();
		return calculateFinalWeaponStats(
			baseDamage,
			selectedWeapon.weaponType,
			activePerkRanks,
			perkEffectsData.weaponPerkModifiers
		);
	}

	function getApplicablePerks(): { name: string; rank: number; bonus: number }[] {
		if (!selectedWeapon) return [];
		const applicable = [];
		for (const modifier of perkEffectsData.weaponPerkModifiers) {
			if (modifier.weaponTypes.includes(selectedWeapon.weaponType)) {
				const rank = activePerkRanks.get(modifier.perkId) || 0;
				if (rank > 0) {
					const effect = modifier.effects.find((e) => e.rank === rank);
					applicable.push({
						name: modifier.name,
						rank,
						bonus: effect?.damageBonus ? Math.round(effect.damageBonus * 100) : 0
					});
				}
			}
		}
		return applicable;
	}

	$effect(() => {
		loadWeaponData();
	});
</script>

<div class="max-w-6xl mx-auto">
	<Section title="WEAPON WORKBENCH" subtitle="Browse and customize weapons with available modifications." class="border-2 border-primary-500 p-6 bg-surface mb-6" />

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
		<!-- Weapon Selection Panel -->
		<Section title="WEAPONS" class="border-2 border-primary-500 p-6 bg-surface mb-0">
			<div class="space-y-2 max-h-96 overflow-y-auto">
				{#each weapons as weapon}
					<button
						onclick={() => selectWeapon(weapon)}
						class="w-full text-left p-3 border-2 {selectedWeapon?.id === weapon.id
							? 'border-primary-500 bg-primary-500 text-background'
							: 'border-primary-500 bg-background text-text hover:bg-primary-500 hover:text-background'} transition"
					>
						<div class="font-bold text-sm">{weapon.name}</div>
						<div class="text-xs opacity-75">{weapon.type}</div>
					</button>
				{/each}
			</div>
		</Section>

		<!-- Details Panel -->
		<div class="lg:col-span-3 space-y-6">
			{#if selectedWeapon}
				<!-- Weapon Details -->
				<Section title="WEAPON DETAILS" class="border-2 border-primary-500 p-6 bg-surface mb-6">
					<div class="grid grid-cols-2 gap-4">
						<div>
							<p class="text-sm opacity-75">Name:</p>
							<p class="text-lg font-bold">{selectedWeapon.name}</p>
						</div>
						<div>
							<p class="text-sm opacity-75">Type:</p>
							<p class="text-lg font-bold">{selectedWeapon.type}</p>
						</div>
						<div>
							<p class="text-sm opacity-75">Base Damage:</p>
							<p class="text-lg font-bold">{selectedWeapon.baseDamage}</p>
						</div>
						<div>
							<p class="text-sm opacity-75">Fire Rate:</p>
							<p class="text-lg font-bold">{selectedWeapon.fireRate}</p>
						</div>
						<div>
							<p class="text-sm opacity-75">Accuracy:</p>
							<p class="text-lg font-bold">{selectedWeapon.accuracy}</p>
						</div>
						<div>
							<p class="text-sm opacity-75">Weight:</p>
							<p class="text-lg font-bold">{selectedWeapon.weight}</p>
						</div>
					</div>
				</Section>

				<!-- Modifications -->
				<Section title="AVAILABLE MODIFICATIONS" class="border-2 border-primary-500 p-6 bg-surface mb-6">
					<div class="space-y-2">
						{#each selectedWeapon.mods as mod}
							<button
								onclick={() => selectMod(mod)}
								class="w-full text-left p-3 border-2 {selectedMod?.id === mod.id
									? 'border-primary-500 bg-primary-500 text-background'
									: 'border-primary-500 bg-background text-text hover:bg-primary-500 hover:text-background'} transition"
							>
								<div class="font-bold">{mod.name}</div>
								<div class="text-sm opacity-75">{mod.effect}</div>
							</button>
						{/each}
					</div>
				</Section>

				<!-- Mod Details -->
				{#if selectedMod}
					<Section title="MODIFICATION DETAILS" class="border-2 border-primary-500 p-6 bg-surface mb-6">
						<div class="space-y-3">
							<div>
								<p class="text-sm opacity-75">Name:</p>
								<p class="text-lg font-bold">{selectedMod.name}</p>
							</div>
							<div>
								<p class="text-sm opacity-75">Effect:</p>
								<p class="text-lg font-bold">{selectedMod.effect}</p>
							</div>
							<div>
								<p class="text-sm opacity-75">Damage Modifier:</p>
								<p class="text-lg font-bold">{(selectedMod.damageModifier * 100).toFixed(0)}%</p>
							</div>
							<div>
								<p class="text-sm opacity-75">Modified Damage:</p>
								<p class="text-lg font-bold text-primary-300">{calculateModifiedDamage()}</p>
							</div>
							<div>
								<p class="text-sm opacity-75 mb-2">Materials Required:</p>
								<div class="space-y-1">
									{#each Object.entries(selectedMod.materials) as [material, amount]}
										<p class="text-sm">{material.charAt(0).toUpperCase() + material.slice(1)}: {amount}</p>
									{/each}
								</div>
							</div>
						</div>
					</Section>
				{/if}

				<!-- Applicable Perks -->
				{#if selectedWeapon && getApplicablePerks().length > 0}
					<Section title="APPLICABLE PERKS" class="border-2 border-primary-500 p-6 bg-surface mb-6">
						<div class="space-y-3">
							{#each getApplicablePerks() as perk}
								<div class="flex justify-between items-center p-3 bg-background border border-primary-500">
									<div>
										<p class="font-semibold text-sm">{perk.name}</p>
										<p class="text-xs opacity-75">Rank {perk.rank}</p>
									</div>
									<p class="text-lg font-bold text-primary-300">+{perk.bonus}%</p>
								</div>
							{/each}
						</div>
					</Section>
				{/if}

				<!-- Final Damage with Perks -->
				{#if selectedWeapon}
					<Section title="FINAL DAMAGE CALCULATION" class="border-2 border-primary-500 p-6 bg-surface mb-0">
						<div class="space-y-3">
							<div class="flex justify-between items-center p-3 bg-background border border-primary-500">
								<p class="text-sm">Base Damage:</p>
								<p class="text-lg font-bold">{selectedWeapon.baseDamage}</p>
							</div>
							{#if selectedMod}
								<div class="flex justify-between items-center p-3 bg-background border border-primary-500">
									<p class="text-sm">With Mod ({selectedMod.name}):</p>
									<p class="text-lg font-bold">{calculateModifiedDamage()}</p>
								</div>
							{/if}
							{#if getApplicablePerks().length > 0}
								<div class="flex justify-between items-center p-3 bg-background border border-primary-300">
									<p class="text-sm font-semibold">With Perks:</p>
									<p class="text-lg font-bold text-primary-300">{calculateFinalDamage()}</p>
								</div>
							{/if}
						</div>
					</Section>
				{/if}
			{:else}
				<Section class="border-2 border-primary-500 p-6 bg-surface mb-0">
					<p class="text-sm opacity-50 text-center">Select a weapon to view details and modifications.</p>
				</Section>
			{/if}
		</div>
	</div>
</div>
