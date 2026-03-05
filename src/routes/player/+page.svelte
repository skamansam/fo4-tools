<script lang="ts">
  import { writable } from 'svelte/store';

  interface Bonus {
    label: string;
    value: string;
  }

  interface BonusCategory {
    name: string;
    bonuses: Bonus[];
  }

  const bonusCategories: BonusCategory[] = [
    {
      name: 'Player',
      bonuses: [
        { label: 'Strength', value: '+0' },
        { label: 'Perception', value: '+0' },
        { label: 'Endurance', value: '+0' },
        { label: 'Charisma', value: '+0' },
        { label: 'Intelligence', value: '+0' },
        { label: 'Agility', value: '+0' },
        { label: 'Luck', value: '+0' },
        { label: 'Radiation Resistance', value: '+0%' },
        { label: 'Poison Resistance', value: '+0%' },
        { label: 'Damage Resistance', value: '+0%' },
        { label: 'Energy Resistance', value: '+0%' },
      ]
    },
    {
      name: 'Unarmed',
      bonuses: [
        { label: 'Damage', value: '+0%' },
        { label: 'Critical Damage', value: '+0%' },
      ]
    },
    {
      name: 'Melee Weapons',
      bonuses: [
        { label: 'Damage', value: '+0%' },
        { label: 'Critical Damage', value: '+0%' },
      ]
    },
    {
      name: 'Small Guns',
      bonuses: [
        { label: 'Damage', value: '+0%' },
        { label: 'Critical Damage', value: '+0%' },
      ]
    },
    {
      name: 'Big Guns',
      bonuses: [
        { label: 'Damage', value: '+0%' },
        { label: 'Critical Damage', value: '+0%' },
      ]
    },
    {
      name: 'Energy Weapons',
      bonuses: [
        { label: 'Damage', value: '+0%' },
        { label: 'Critical Damage', value: '+0%' },
      ]
    },
    {
      name: 'Explosives',
      bonuses: [
        { label: 'Damage', value: '+0%' },
      ]
    },
    {
      name: 'Lockpicking',
      bonuses: [
        { label: 'Sweet Spot Size', value: 'Normal' },
      ]
    },
    {
      name: 'Hacking',
      bonuses: [
        { label: 'Extra Guesses', value: '+0' },
      ]
    },
    {
      name: 'Stealth',
      bonuses: [
        { label: 'Detection Difficulty', value: '+0%' },
      ]
    },
    {
      name: 'Bartering',
      bonuses: [
        { label: 'Prices', value: '+0%' },
      ]
    },
    {
      name: 'Healing',
      bonuses: [
        { label: 'Stimpak Effectiveness', value: '+0%' },
      ]
    },
  ];

  const selectedCategory = writable<number>(0);
</script>

<div class="min-h-screen bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-900 p-8">
  <div class="max-w-7xl mx-auto">
    <!-- Pip-Boy Container -->
    <div class="bg-yellow-950 border-4 border-yellow-600 rounded-lg overflow-hidden shadow-2xl">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
        <!-- Left: Pip-Boy Image -->
        <div class="flex items-center justify-center lg:col-span-1">
          <div class="bg-yellow-900 border-2 border-yellow-600 rounded-lg p-6 text-center">
            <div class="w-48 h-64 bg-yellow-800 border-2 border-yellow-600 rounded flex items-center justify-center">
              <div class="text-center">
                <div class="text-6xl mb-4">🤖</div>
                <div class="text-yellow-400 font-bold text-sm tracking-wider">VAULT-TEC</div>
                <div class="text-yellow-400 font-bold text-sm tracking-wider">PIP-BOY 3000</div>
                <div class="text-yellow-600 text-xs mt-4 font-mono">STAT DISPLAY</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Stats Display -->
        <div class="lg:col-span-2">
          <h1 class="text-4xl font-bold text-yellow-400 mb-2 font-mono tracking-wider">CHARACTER STATS</h1>
          <div class="border-b-2 border-yellow-600 mb-6"></div>

          <!-- Category Tabs -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
            {#each bonusCategories as category, index}
              <button
                on:click={() => selectedCategory.set(index)}
                class="px-3 py-2 text-xs font-mono font-bold transition-all {$selectedCategory === index
                  ? 'bg-yellow-400 text-yellow-900 border-2 border-yellow-600'
                  : 'bg-yellow-800 text-yellow-400 border-2 border-yellow-600 hover:bg-yellow-700'}"
              >
                {category.name}
              </button>
            {/each}
          </div>

          <!-- Stats List -->
          <div class="bg-yellow-900 border-2 border-yellow-600 rounded p-4">
            <div class="space-y-3">
              {#each bonusCategories[$selectedCategory].bonuses as bonus}
                <div class="flex justify-between items-center border-b border-yellow-700 pb-2 last:border-b-0">
                  <span class="text-yellow-400 font-mono text-sm">{bonus.label}</span>
                  <span class="text-yellow-300 font-mono font-bold text-sm">{bonus.value}</span>
                </div>
              {/each}
            </div>
          </div>

          <!-- Info Box -->
          <div class="mt-6 bg-yellow-900 border-2 border-yellow-600 rounded p-4">
            <p class="text-yellow-400 text-xs font-mono">
              <strong>NOTE:</strong> This is a placeholder interface. Bonuses will be calculated based on selected perks and bobbleheads.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  @reference "../../routes/layout.css";
</style>
