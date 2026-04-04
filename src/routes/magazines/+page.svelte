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

  // biome-ignore lint/correctness/noUnusedVariables: Used in event handlers
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

<div class="min-h-screen bg-background p-8">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-4xl font-bold text-theme-primary mb-2">Magazines Checklist</h1>
    <p class="text-text mb-8">Track magazines found throughout the Commonwealth</p>

    <!-- Progress Bar -->
    <div class="bg-surface rounded-lg p-6 mb-8">
      <div class="flex justify-between items-center mb-2">
        <span class="text-text">Progress</span>
        <span class="text-theme-primary font-bold">{getProgress()} ({getProgressPercentage()}%)</span>
      </div>
      <div class="w-full bg-border rounded-full h-3">
        <div
          class="bg-theme-primary h-3 rounded-full transition-all duration-300"
          style="width: {getProgressPercentage()}%"
        />
      </div>
    </div>

    <!-- Info Box -->
    <div class="bg-surface border-l-4 border-theme-primary rounded-lg p-4 mb-8">
      <p class="text-text">
        <strong>Note:</strong> This checklist covers base game magazines (113 total issues). Additional magazines are available in DLC content (Far Harbor, Nuka World, Automatron).
      </p>
    </div>

    <!-- Magazines by Title -->
    {#each getMagazineGroups() as [magazineTitle, issues]}
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-theme-primary mb-4">{magazineTitle}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {#each issues as issue (issue.id)}
            <div class="bg-surface rounded-lg p-3 hover:bg-border transition-colors">
              <label class="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={$checkedMagazines.has(issue.id)}
                  on:change={() => toggleMagazine(issue.id)}
                  class="mt-1 w-4 h-4 rounded accent-theme-primary"
                />
                <div class="flex-1">
                  <div class="font-semibold text-text">Issue {issue.issue}</div>
                  <div class="text-xs text-theme-primary mt-1">{issue.category}</div>
                  <div class="text-xs text-muted mt-2">{issue.effect}</div>
                </div>
              </label>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    <!-- DLC Magazines Info -->
    <div class="mt-12 bg-surface rounded-lg p-6">
      <h2 class="text-xl font-bold text-theme-primary mb-4">DLC Magazines</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-text">
        <div>
          <h3 class="font-bold text-theme-primary mb-2">Far Harbor</h3>
          <p class="text-sm">Islander's Almanac (5 issues) - Each provides unique bonuses</p>
        </div>
        <div>
          <h3 class="font-bold text-theme-primary mb-2">Nuka World</h3>
          <p class="text-sm">Scav Magazine (5 issues) - Provides various bonuses</p>
        </div>
      </div>
    </div>
  </div>
</div>
