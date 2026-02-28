<script lang="ts">
	interface ArmorMod {
		id: string;
		name: string;
		effect: string;
		materials: Record<string, number>;
	}

	interface ArmorPiece {
		id: string;
		name: string;
		type: string;
		baseResistance: number;
		mods: ArmorMod[];
	}

	let selectedArmor: ArmorPiece | null = $state(null);
	let selectedMod: ArmorMod | null = $state(null);
	let armorPieces: ArmorPiece[] = $state([]);

	// Placeholder data - will be replaced with JSON data
	function loadArmorData() {
		armorPieces = [
			{
				id: 'combat-chest',
				name: 'Combat Armor Chest Piece',
				type: 'Torso',
				baseResistance: 20,
				mods: [
					{
						id: 'mod-1',
						name: 'Heavy Armor Plating',
						effect: '+10 Damage Resistance',
						materials: { steel: 5, aluminum: 3 }
					},
					{
						id: 'mod-2',
						name: 'Polished Metal',
						effect: '+5 Energy Resistance',
						materials: { steel: 3, glass: 2 }
					}
				]
			},
			{
				id: 'combat-helmet',
				name: 'Combat Armor Helmet',
				type: 'Head',
				baseResistance: 15,
				mods: [
					{
						id: 'mod-3',
						name: 'Reinforced Lens',
						effect: '+2 Perception',
						materials: { glass: 4, steel: 2 }
					}
				]
			}
		];
	}

	function selectArmor(armor: ArmorPiece) {
		selectedArmor = armor;
		selectedMod = null;
	}

	function selectMod(mod: ArmorMod) {
		selectedMod = mod;
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
					<p class="text-sm opacity-50">Select an armor piece to view details and modifications.</p>
				</div>
			{/if}
		</div>
	</div>
</div>
