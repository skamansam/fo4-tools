<script lang="ts">
	import { perkStore } from '$lib/stores/perkStore';
	import { calculateFinalWeaponStats } from '$lib/utils/perkCalculator';
	import perkEffectsData from '$lib/data/perkEffects.json';
	import weaponsData from '$lib/data/weapons.json';

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
	<div class="border-2 border-fo4-green p-6 bg-fo4-black mb-6">
		<h2 class="text-2xl font-bold text-fo4-green-light mb-2">WEAPON WORKBENCH</h2>
		<p class="text-sm opacity-75">Browse and customize weapons with available modifications.</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
		<!-- Weapon Selection Panel -->
		<div class="border-2 border-fo4-green p-6 bg-fo4-black">
			<h3 class="text-lg font-bold text-fo4-green-light mb-4">WEAPONS</h3>
			<div class="space-y-2 max-h-96 overflow-y-auto">
				{#each weapons as weapon}
					<button
						onclick={() => selectWeapon(weapon)}
						class="w-full text-left p-3 border-2 {selectedWeapon?.id === weapon.id
							? 'border-fo4-green bg-fo4-green text-fo4-black'
							: 'border-fo4-green bg-fo4-dark text-fo4-green hover:bg-fo4-green hover:text-fo4-black'} transition"
					>
						<div class="font-bold text-sm">{weapon.name}</div>
						<div class="text-xs opacity-75">{weapon.type}</div>
					</button>
				{/each}
			</div>
		</div>

		<!-- Details Panel -->
		<div class="lg:col-span-3 space-y-6">
			{#if selectedWeapon}
				<!-- Weapon Details -->
				<div class="border-2 border-fo4-green p-6 bg-fo4-black">
					<h3 class="text-lg font-bold text-fo4-green-light mb-4">WEAPON DETAILS</h3>
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
				</div>

				<!-- Modifications -->
				<div class="border-2 border-fo4-green p-6 bg-fo4-black">
					<h3 class="text-lg font-bold text-fo4-green-light mb-4">AVAILABLE MODIFICATIONS</h3>
					<div class="space-y-2">
						{#each selectedWeapon.mods as mod}
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
							<div>
								<p class="text-sm opacity-75">Damage Modifier:</p>
								<p class="text-lg font-bold">{(selectedMod.damageModifier * 100).toFixed(0)}%</p>
							</div>
							<div>
								<p class="text-sm opacity-75">Modified Damage:</p>
								<p class="text-lg font-bold text-fo4-green-light">{calculateModifiedDamage()}</p>
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
					</div>
				{/if}

				<!-- Applicable Perks -->
				{#if selectedWeapon && getApplicablePerks().length > 0}
					<div class="border-2 border-fo4-green p-6 bg-fo4-black">
						<h3 class="text-lg font-bold text-fo4-green-light mb-4">APPLICABLE PERKS</h3>
						<div class="space-y-3">
							{#each getApplicablePerks() as perk}
								<div class="flex justify-between items-center p-3 bg-fo4-dark border border-fo4-green">
									<div>
										<p class="font-semibold text-sm">{perk.name}</p>
										<p class="text-xs opacity-75">Rank {perk.rank}</p>
									</div>
									<p class="text-lg font-bold text-fo4-green-light">+{perk.bonus}%</p>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Final Damage with Perks -->
				{#if selectedWeapon}
					<div class="border-2 border-fo4-green p-6 bg-fo4-black">
						<h3 class="text-lg font-bold text-fo4-green-light mb-4">FINAL DAMAGE CALCULATION</h3>
						<div class="space-y-3">
							<div class="flex justify-between items-center p-3 bg-fo4-dark border border-fo4-green">
								<p class="text-sm">Base Damage:</p>
								<p class="text-lg font-bold">{selectedWeapon.baseDamage}</p>
							</div>
							{#if selectedMod}
								<div class="flex justify-between items-center p-3 bg-fo4-dark border border-fo4-green">
									<p class="text-sm">With Mod ({selectedMod.name}):</p>
									<p class="text-lg font-bold">{calculateModifiedDamage()}</p>
								</div>
							{/if}
							{#if getApplicablePerks().length > 0}
								<div class="flex justify-between items-center p-3 bg-fo4-dark border border-fo4-green-light">
									<p class="text-sm font-semibold">With Perks:</p>
									<p class="text-lg font-bold text-fo4-green-light">{calculateFinalDamage()}</p>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			{:else}
				<div class="border-2 border-fo4-green p-6 bg-fo4-black text-center">
					<p class="text-sm opacity-50">Select a weapon to view details and modifications.</p>
				</div>
			{/if}
		</div>
	</div>
</div>
