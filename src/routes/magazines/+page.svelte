<script lang="ts">
  import { writable } from 'svelte/store';
  import { Section } from 'twintrinsic';
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

<div class="max-w-6xl mx-auto space-y-6">
	<!-- Header -->
	<Section title="Magazines Checklist" subtitle="Track magazines found throughout the Commonwealth" class="border-2 border-primary-500 p-6 bg-surface mb-6" />

	<!-- Overall Progress -->
	<Section title="OVERALL PROGRESS" class="border-2 border-primary-500 p-6 bg-surface mb-6">
		<div class="space-y-4">
			<div class="flex justify-between items-center">
				<span class="text-text">Progress</span>
				<span class="text-lg font-bold text-primary-300">{getProgress()} ({getProgressPercentage()}%)</span>
			</div>
			<div class="w-full bg-border rounded-full h-3">
				<div
					class="bg-primary-500 h-3 rounded-full transition-all duration-300"
					style="width: {getProgressPercentage()}%"
				></div>
			</div>
		</div>
	</Section>

	<!-- Info Box -->
	<Section title="Note" class="border-2 border-primary-500 p-6 bg-surface mb-6">
		<p class="text-text">
			This checklist covers base game magazines (113 total issues). Additional magazines are available in DLC content (Far Harbor, Nuka World, Automatron).
		</p>
	</Section>

	<!-- Magazines by Title -->
	{#each getMagazineGroups() as [magazineTitle, issues]}
		<Section title={magazineTitle} class="border-2 border-primary-500 p-6 bg-surface mb-6">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
				{#each issues as issue (issue.id)}
					<div class="bg-surface border-2 border-primary-500 p-6 hover:bg-primary-500 hover:text-background transition-colors">
						<label class="flex items-start gap-3 cursor-pointer">
							<input
								type="checkbox"
								checked={$checkedMagazines.has(issue.id)}
								on:change={() => toggleMagazine(issue.id)}
								class="mt-1 w-4 h-4 rounded accent-primary-500"
							/>
							<div class="flex-1">
								<div class="font-semibold text-text">Issue {issue.issue}</div>
								<div class="text-xs text-primary-300 mt-1">{issue.category}</div>
								<div class="text-xs text-muted mt-2">{issue.effect}</div>
							</div>
						</label>
					</div>
				{/each}
			</div>
		</Section>
	{/each}

	<!-- DLC Magazines Info -->
	<Section title="DLC Magazines" class="border-2 border-primary-500 p-6 bg-surface mb-0">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-text">
			<div>
				<h3 class="font-bold text-primary-300 mb-2">Far Harbor</h3>
				<p class="text-sm">Islander's Almanac (5 issues) - Each provides unique bonuses</p>
			</div>
			<div>
				<h3 class="font-bold text-primary-300 mb-2">Nuka World</h3>
				<p class="text-sm">Scav Magazine (5 issues) - Provides various bonuses</p>
			</div>
		</div>
	</Section>
</div>
