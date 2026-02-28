<script lang="ts">
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
		baseDamage: number;
		fireRate: number;
		accuracy: number;
		weight: number;
		mods: WeaponMod[];
	}

	let selectedWeapon: Weapon | null = $state(null);
	let selectedMod: WeaponMod | null = $state(null);
	let weapons: Weapon[] = $state([]);

	// Placeholder data - will be replaced with JSON data
	function loadWeaponData() {
		weapons = [
			{
				id: 'assault-rifle',
				name: 'Assault Rifle',
				type: 'Rifle',
				baseDamage: 16,
				fireRate: 25,
				accuracy: 65,
				weight: 9.8,
				mods: [
					{
						id: 'mod-1',
						name: 'Automatic Receiver',
						effect: 'Converts to automatic fire',
						damageModifier: 0.9,
						materials: { steel: 8, aluminum: 4 }
					},
					{
						id: 'mod-2',
						name: 'Powerful Receiver',
						effect: '+25% Damage',
						damageModifier: 1.25,
						materials: { steel: 10, adhesive: 5 }
					},
					{
						id: 'mod-3',
						name: 'Long Recon Scope',
						effect: '+2 Perception, Better accuracy',
						damageModifier: 1.0,
						materials: { glass: 6, steel: 3 }
					}
				]
			},
			{
				id: 'laser-rifle',
				name: 'Laser Rifle',
				type: 'Energy',
				baseDamage: 20,
				fireRate: 20,
				accuracy: 70,
				weight: 7.5,
				mods: [
					{
						id: 'mod-4',
						name: 'Beam Splitter',
						effect: 'Fires 2 beams per shot',
						damageModifier: 0.6,
						materials: { crystal: 8, steel: 5 }
					}
				]
			},
			{
				id: 'combat-shotgun',
				name: 'Combat Shotgun',
				type: 'Shotgun',
				baseDamage: 24,
				fireRate: 15,
				accuracy: 40,
				weight: 12.0,
				mods: [
					{
						id: 'mod-5',
						name: 'Long Barrel',
						effect: '+10% Accuracy',
						damageModifier: 1.0,
						materials: { steel: 6, aluminum: 3 }
					}
				]
			}
		];
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
			{:else}
				<div class="border-2 border-fo4-green p-6 bg-fo4-black text-center">
					<p class="text-sm opacity-50">Select a weapon to view details and modifications.</p>
				</div>
			{/if}
		</div>
	</div>
</div>
