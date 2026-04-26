<script lang="ts">
  import { writable } from 'svelte/store';
  import bobbleheadsData from '$lib/data/bobbleheads.json';

  interface Bobblehead {
    id: string;
    name: string;
    category: 'SPECIAL' | 'Skill';
    location: string;
    effect: string;
    region: string;
  }

  const bobbleheads: Bobblehead[] = bobbleheadsData;

  const checkedBobbleheads = writable<Set<string>>(new Set());

  // biome-ignore lint/correctness/noUnusedVariables: Used in event handlers
  function toggleBobblehead(id: string) {
    checkedBobbleheads.update(set => {
      const newSet = new Set(set);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  function getProgress() {
    return `${$checkedBobbleheads.size} / ${bobbleheads.length}`;
  }

  function getProgressPercentage() {
    return Math.round(($checkedBobbleheads.size / bobbleheads.length) * 100);
  }
</script>

<div class="min-h-screen bg-background p-8">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-4xl font-bold text-primary-300 mb-2">Bobbleheads Checklist</h1>
    <p class="text-text mb-8">Track all 20 bobbleheads in Fallout 4</p>

    <!-- Progress Bar -->
    <div class="bg-surface rounded-lg p-6 mb-8">
      <div class="flex justify-between items-center mb-2">
        <span class="text-text">Progress</span>
        <span class="text-primary-300 font-bold">{getProgress()} ({getProgressPercentage()}%)</span>
      </div>
      <div class="w-full bg-border rounded-full h-3">
        <div
          class="bg-primary-500 h-3 rounded-full transition-all duration-300"
          style="width: {getProgressPercentage()}%"
        />
      </div>
    </div>

    <!-- SPECIAL Bobbleheads -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-primary-300 mb-4">SPECIAL Bobbleheads</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each bobbleheads.filter(b => b.category === 'SPECIAL') as bobblehead (bobblehead.id)}
          <div class="bg-surface border-2 border-primary-500 rounded-lg p-4 hover:bg-primary-500 hover:text-background transition-colors">
            <label class="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={$checkedBobbleheads.has(bobblehead.id)}
                on:change={() => toggleBobblehead(bobblehead.id)}
                class="mt-1 w-5 h-5 rounded accent-primary-500"
              />
              <div class="flex-1">
                <div class="font-bold text-text">{bobblehead.name}</div>
                <div class="text-sm text-muted">{bobblehead.location}</div>
                <div class="text-xs text-muted mt-1">{bobblehead.region}</div>
                <div class="text-sm text-primary-300 mt-2">{bobblehead.effect}</div>
              </div>
            </label>
          </div>
        {/each}
      </div>
    </div>

    <!-- Skill Bobbleheads -->
    <div>
      <h2 class="text-2xl font-bold text-primary-300 mb-4">Skill Bobbleheads</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each bobbleheads.filter(b => b.category === 'Skill') as bobblehead (bobblehead.id)}
          <div class="bg-surface border-2 border-primary-500 rounded-lg p-4 hover:bg-primary-500 hover:text-background transition-colors">
            <label class="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={$checkedBobbleheads.has(bobblehead.id)}
                on:change={() => toggleBobblehead(bobblehead.id)}
                class="mt-1 w-5 h-5 rounded accent-primary-500"
              />
              <div class="flex-1">
                <div class="font-bold text-text">{bobblehead.name}</div>
                <div class="text-sm text-muted">{bobblehead.location}</div>
                <div class="text-xs text-muted mt-1">{bobblehead.region}</div>
                <div class="text-sm text-primary-300 mt-2">{bobblehead.effect}</div>
              </div>
            </label>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
