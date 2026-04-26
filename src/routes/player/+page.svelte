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

<div class="min-h-screen p-8 bg-background">
  <div class="max-w-7xl mx-auto">
    <!-- Pip-Boy Container -->
    <div class="overflow-hidden shadow-2xl border-4 bg-background border-primary-500">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
        <!-- Left: Pip-Boy Image -->
        <div class="flex items-center justify-center lg:col-span-1">
          <div class="p-6 text-center border-2 bg-surface border-primary-500">
            <div class="w-48 h-64 flex items-center justify-center border-2 bg-background border-primary-500">
              <div class="text-center">
                <div class="text-6xl mb-4">🤖</div>
                <div class="font-bold text-sm tracking-wider text-primary-300">VAULT-TEC</div>
                <div class="font-bold text-sm tracking-wider text-primary-300">PIP-BOY 3000</div>
                <div class="text-xs mt-4 font-mono text-background">STAT DISPLAY</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Stats Display -->
        <div class="lg:col-span-2">
          <h1 class="text-4xl font-bold mb-2 font-mono tracking-wider text-primary-300">CHARACTER STATS</h1>
          <div class="mb-6 border-b-2 border-primary-500"></div>

          <!-- Category Tabs -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
            {#each bonusCategories as category, index}
              <button
                on:click={() => selectedCategory.set(index)}
                class="px-3 py-2 text-xs font-mono font-bold transition-all border-2"
                class:bg-primary-500={$selectedCategory === index}
                class:bg-surface={$selectedCategory !== index}
                class:text-background={$selectedCategory === index}
                class:text-text={$selectedCategory !== index}
                class:border-primary-500={true}
              >
                {category.name}
              </button>
            {/each}
          </div>

          <!-- Stats List -->
          <div class="p-4 border-2 bg-surface border-primary-500">
            <div class="space-y-3">
              {#each bonusCategories[$selectedCategory].bonuses as bonus}
                <div class="flex justify-between items-center pb-2 last:border-b-0 border-b border-primary-500">
                  <span class="font-mono text-sm text-primary-300">{bonus.label}</span>
                  <span class="font-mono font-bold text-sm text-background">{bonus.value}</span>
                </div>
              {/each}
            </div>
          </div>

          <!-- Info Box -->
          <div class="mt-6 p-4 border-2 bg-surface border-primary-500">
            <p class="text-xs font-mono text-primary-300">
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
