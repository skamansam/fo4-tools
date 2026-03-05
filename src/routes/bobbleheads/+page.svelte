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

<div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-4xl font-bold text-amber-400 mb-2">Bobbleheads Checklist</h1>
    <p class="text-slate-300 mb-8">Track all 20 bobbleheads in Fallout 4</p>

    <!-- Progress Bar -->
    <div class="bg-slate-700 rounded-lg p-6 mb-8">
      <div class="flex justify-between items-center mb-2">
        <span class="text-slate-300">Progress</span>
        <span class="text-amber-400 font-bold">{getProgress()} ({getProgressPercentage()}%)</span>
      </div>
      <div class="w-full bg-slate-600 rounded-full h-3">
        <div
          class="bg-amber-500 h-3 rounded-full transition-all duration-300"
          style="width: {getProgressPercentage()}%"
        />
      </div>
    </div>

    <!-- SPECIAL Bobbleheads -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-amber-300 mb-4">SPECIAL Bobbleheads</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each bobbleheads.filter(b => b.category === 'SPECIAL') as bobblehead (bobblehead.id)}
          <div class="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors">
            <label class="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={$checkedBobbleheads.has(bobblehead.id)}
                on:change={() => toggleBobblehead(bobblehead.id)}
                class="mt-1 w-5 h-5 rounded accent-amber-500"
              />
              <div class="flex-1">
                <div class="font-bold text-white">{bobblehead.name}</div>
                <div class="text-sm text-slate-400">{bobblehead.location}</div>
                <div class="text-xs text-slate-500 mt-1">{bobblehead.region}</div>
                <div class="text-sm text-amber-300 mt-2">{bobblehead.effect}</div>
              </div>
            </label>
          </div>
        {/each}
      </div>
    </div>

    <!-- Skill Bobbleheads -->
    <div>
      <h2 class="text-2xl font-bold text-amber-300 mb-4">Skill Bobbleheads</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each bobbleheads.filter(b => b.category === 'Skill') as bobblehead (bobblehead.id)}
          <div class="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors">
            <label class="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={$checkedBobbleheads.has(bobblehead.id)}
                on:change={() => toggleBobblehead(bobblehead.id)}
                class="mt-1 w-5 h-5 rounded accent-amber-500"
              />
              <div class="flex-1">
                <div class="font-bold text-white">{bobblehead.name}</div>
                <div class="text-sm text-slate-400">{bobblehead.location}</div>
                <div class="text-xs text-slate-500 mt-1">{bobblehead.region}</div>
                <div class="text-sm text-amber-300 mt-2">{bobblehead.effect}</div>
              </div>
            </label>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
