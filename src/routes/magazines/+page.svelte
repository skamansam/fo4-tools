<script lang="ts">
  import { writable } from 'svelte/store';

  interface MagazineIssue {
    id: string;
    magazine: string;
    issue: number;
    category: string;
    effect: string;
  }

  const magazines: MagazineIssue[] = [
    // Astoundingly Awesome Tales (15 issues)
    { id: 'aaa-1', magazine: 'Astoundingly Awesome Tales', issue: 1, category: 'Combat', effect: 'Regenerate 1 point of health per minute' },
    { id: 'aaa-2', magazine: 'Astoundingly Awesome Tales', issue: 2, category: 'Combat', effect: 'Do +5% damage with scoped weapons' },
    { id: 'aaa-3', magazine: 'Astoundingly Awesome Tales', issue: 3, category: 'Combat', effect: 'Take 5% less damage from robots' },
    { id: 'aaa-4', magazine: 'Astoundingly Awesome Tales', issue: 4, category: 'Combat', effect: 'Do +5% damage with the Alien Blaster' },
    { id: 'aaa-5', magazine: 'Astoundingly Awesome Tales', issue: 5, category: 'Combat', effect: 'Gain +5 Poison Resistance' },
    { id: 'aaa-6', magazine: 'Astoundingly Awesome Tales', issue: 6, category: 'Combat', effect: 'Do +5% damage against Mirelurks' },
    { id: 'aaa-7', magazine: 'Astoundingly Awesome Tales', issue: 7, category: 'Combat', effect: 'Do +5% damage at night' },
    { id: 'aaa-8', magazine: 'Astoundingly Awesome Tales', issue: 8, category: 'Combat', effect: 'Gain +5 Action Points' },
    { id: 'aaa-9', magazine: 'Astoundingly Awesome Tales', issue: 9, category: 'Combat', effect: 'Do +5% damage with the Cryolator' },
    { id: 'aaa-10', magazine: 'Astoundingly Awesome Tales', issue: 10, category: 'Combat', effect: 'Gain +5 Radiation Resistance' },
    { id: 'aaa-11', magazine: 'Astoundingly Awesome Tales', issue: 11, category: 'Combat', effect: 'RadAway heals +5% radiation damage' },
    { id: 'aaa-12', magazine: 'Astoundingly Awesome Tales', issue: 12, category: 'Combat', effect: 'Your canine companion permanently takes 10% less damage' },
    { id: 'aaa-13', magazine: 'Astoundingly Awesome Tales', issue: 13, category: 'Combat', effect: 'Do +5% damage against Ghouls' },
    { id: 'aaa-14', magazine: 'Astoundingly Awesome Tales', issue: 14, category: 'Combat', effect: 'Do +5% damage against Super Mutants' },
    { id: 'aaa-15', magazine: 'Astoundingly Awesome Tales', issue: 15, category: 'Combat', effect: 'Your canine companion takes 10% less damage' },

    // Grognak the Barbarian (10 issues)
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `barbarian-${i + 1}`,
      magazine: 'Grognak the Barbarian',
      issue: i + 1,
      category: 'Melee',
      effect: 'Critical Hits with unarmed and melee attacks do +5% damage'
    })),

    // Guns and Bullets (10 issues)
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `guns-bullets-${i + 1}`,
      magazine: 'Guns and Bullets',
      issue: i + 1,
      category: 'Weapons',
      effect: 'Ballistic weapons do +5% critical damage'
    })),

    // La Coiffe (2 issues)
    ...Array.from({ length: 2 }, (_, i) => ({
      id: `la-coiffe-${i + 1}`,
      magazine: 'La Coiffe',
      issue: i + 1,
      category: 'Cosmetic',
      effect: 'Extra hairstyles'
    })),

    // Live & Love (10 issues)
    { id: 'live-love-1', magazine: 'Live & Love', issue: 1, category: 'Companions', effect: 'Companions gain +10 health' },
    { id: 'live-love-2', magazine: 'Live & Love', issue: 2, category: 'Companions', effect: 'Companions do +5% damage' },
    { id: 'live-love-3', magazine: 'Live & Love', issue: 3, category: 'Companions', effect: 'Companions have +10 carry weight' },
    { id: 'live-love-4', magazine: 'Live & Love', issue: 4, category: 'Companions', effect: 'Gain +25% XP from persuading women' },
    { id: 'live-love-5', magazine: 'Live & Love', issue: 5, category: 'Companions', effect: 'Gain +1 Luck from alcohol when adventuring with a companion' },
    { id: 'live-love-6', magazine: 'Live & Love', issue: 6, category: 'Companions', effect: 'Companions gain +5 Damage Resistance and Energy Resistance' },
    { id: 'live-love-7', magazine: 'Live & Love', issue: 7, category: 'Companions', effect: 'Gain +25% XP from persuading men' },
    { id: 'live-love-8', magazine: 'Live & Love', issue: 8, category: 'Companions', effect: 'Gain +5% XP while adventuring with a companion' },
    { id: 'live-love-9', magazine: 'Live & Love', issue: 9, category: 'Companions', effect: 'Robot companions inflict +5% damage' },
    { id: 'live-love-10', magazine: 'Live & Love', issue: 10, category: 'Companions', effect: 'Companions do 5% more damage' },

    // Massachusetts Surgical Journal (9 issues)
    ...Array.from({ length: 9 }, (_, i) => ({
      id: `massachusetts-${i + 1}`,
      magazine: 'Massachusetts Surgical Journal',
      issue: i + 1,
      category: 'Combat',
      effect: 'Inflict +2% limb damage'
    })),

    // Picket Fences (5 issues)
    { id: 'picket-fences-1', magazine: 'Picket Fences', issue: 1, category: 'Settlement', effect: 'Build picket fencing at settlement workshops' },
    { id: 'picket-fences-2', magazine: 'Picket Fences', issue: 2, category: 'Settlement', effect: 'Build high tech lights at settlement workshops' },
    { id: 'picket-fences-3', magazine: 'Picket Fences', issue: 3, category: 'Settlement', effect: 'Build new statues at settlement workshops' },
    { id: 'picket-fences-4', magazine: 'Picket Fences', issue: 4, category: 'Settlement', effect: 'Build potted plants at settlement workshops' },
    { id: 'picket-fences-5', magazine: 'Picket Fences', issue: 5, category: 'Settlement', effect: 'Build patio furniture at settlement workshops' },

    // Tales of a Junktown Jerky Vendor (8 issues)
    ...Array.from({ length: 8 }, (_, i) => ({
      id: `tales-junktown-${i + 1}`,
      magazine: 'Tales of a Junktown Jerky Vendor',
      issue: i + 1,
      category: 'Trading',
      effect: 'Get better prices when buying from vendors'
    })),

    // Tesla Science Magazine (9 issues)
    ...Array.from({ length: 9 }, (_, i) => ({
      id: `tesla-science-${i + 1}`,
      magazine: 'Tesla Science Magazine',
      issue: i + 1,
      category: 'Energy Weapons',
      effect: 'Energy weapons inflict +5% critical damage'
    })),

    // Tumblers Today (5 issues)
    ...Array.from({ length: 5 }, (_, i) => ({
      id: `tumblers-today-${i + 1}`,
      magazine: 'Tumblers Today',
      issue: i + 1,
      category: 'Lockpicking',
      effect: 'Gain a bonus to lockpicking'
    })),

    // U.S. Covert Operations Manual (10 issues)
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `covert-operations-${i + 1}`,
      magazine: 'U.S. Covert Operations Manual',
      issue: i + 1,
      category: 'Stealth',
      effect: 'You are more difficult to detect while sneaking'
    })),

    // Unstoppables (5 issues)
    ...Array.from({ length: 5 }, (_, i) => ({
      id: `unstoppables-${i + 1}`,
      magazine: 'Unstoppables',
      issue: i + 1,
      category: 'Combat',
      effect: 'Gain a +1% chance of avoiding all damage from an attack'
    })),

    // Wasteland Survival Guide (9 issues)
    { id: 'wasteland-survival-1', magazine: 'Wasteland Survival Guide', issue: 1, category: 'Survival', effect: 'Heal 50% more from fruits and vegetables' },
    { id: 'wasteland-survival-2', magazine: 'Wasteland Survival Guide', issue: 2, category: 'Survival', effect: 'Take 5% less damage from insects' },
    { id: 'wasteland-survival-3', magazine: 'Wasteland Survival Guide', issue: 3, category: 'Survival', effect: 'Heal +50% from irradiated packaged food and drink' },
    { id: 'wasteland-survival-4', magazine: 'Wasteland Survival Guide', issue: 4, category: 'Survival', effect: 'Access new decoration items in workshop settlements' },
    { id: 'wasteland-survival-5', magazine: 'Wasteland Survival Guide', issue: 5, category: 'Survival', effect: 'Diamond City is now permanently marked on your map' },
    { id: 'wasteland-survival-6', magazine: 'Wasteland Survival Guide', issue: 6, category: 'Survival', effect: '+10% discount from food and drink vendors' },
    { id: 'wasteland-survival-7', magazine: 'Wasteland Survival Guide', issue: 7, category: 'Survival', effect: 'Swim +25% faster' },
    { id: 'wasteland-survival-8', magazine: 'Wasteland Survival Guide', issue: 8, category: 'Survival', effect: 'Take 5% less damage from melee attacks' },
    { id: 'wasteland-survival-9', magazine: 'Wasteland Survival Guide', issue: 9, category: 'Survival', effect: 'Collect extra meat from animal kills' },
  ];

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
