<script lang="ts">
  import { writable } from 'svelte/store';
  import magazinesData from '$lib/data/magazines.json';

  interface MagazineIssue {
    id: string;
    magazine: string;
    issue: number;
    category: string;
    effect: string;
  }

  const magazines: MagazineIssue[] = magazinesData;

  const checkedMagazines = writable<Set<string>>(new Set());

  function toggleMagazine(id: string) {
    checkedMagazines.update(set => {
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
    return `${$checkedMagazines.size} / ${magazines.length}`;
  }

  function getProgressPercentage() {
    return Math.round(($checkedMagazines.size / magazines.length) * 100);
  }

  function getMagazineGroups() {
    const groups = new Map<string, MagazineIssue[]>();
    magazines.forEach(mag => {
      if (!groups.has(mag.magazine)) {
        groups.set(mag.magazine, []);
      }
      groups.get(mag.magazine)!.push(mag);
    });
    return Array.from(groups.entries());
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-4xl font-bold text-amber-400 mb-2">Magazines Checklist</h1>
    <p class="text-slate-300 mb-8">Track magazines found throughout the Commonwealth</p>

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

    <!-- Info Box -->
    <div class="bg-blue-900 border-l-4 border-blue-400 rounded-lg p-4 mb-8">
      <p class="text-blue-100">
        <strong>Note:</strong> This checklist covers base game magazines (113 total issues). Additional magazines are available in DLC content (Far Harbor, Nuka World, Automatron).
      </p>
    </div>

    <!-- Magazines by Title -->
    {#each getMagazineGroups() as [magazineTitle, issues]}
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-amber-300 mb-4">{magazineTitle}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {#each issues as issue (issue.id)}
            <div class="bg-slate-700 rounded-lg p-3 hover:bg-slate-600 transition-colors">
              <label class="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={$checkedMagazines.has(issue.id)}
                  on:change={() => toggleMagazine(issue.id)}
                  class="mt-1 w-4 h-4 rounded accent-amber-500"
                />
                <div class="flex-1">
                  <div class="font-semibold text-white">Issue {issue.issue}</div>
                  <div class="text-xs text-amber-300 mt-1">{issue.category}</div>
                  <div class="text-xs text-slate-300 mt-2">{issue.effect}</div>
                </div>
              </label>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    <!-- DLC Magazines Info -->
    <div class="mt-12 bg-slate-700 rounded-lg p-6">
      <h2 class="text-xl font-bold text-amber-300 mb-4">DLC Magazines</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
        <div>
          <h3 class="font-bold text-amber-200 mb-2">Far Harbor</h3>
          <p class="text-sm">Islander's Almanac (5 issues) - Each provides unique bonuses</p>
        </div>
        <div>
          <h3 class="font-bold text-amber-200 mb-2">Nuka World</h3>
          <p class="text-sm">Scav Magazine (5 issues) - Provides various bonuses</p>
        </div>
      </div>
    </div>
  </div>
</div>
