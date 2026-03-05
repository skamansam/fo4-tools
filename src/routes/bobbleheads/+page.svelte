<script lang="ts">
  import { writable } from 'svelte/store';

  interface Bobblehead {
    id: string;
    name: string;
    category: 'SPECIAL' | 'Skill';
    location: string;
    effect: string;
    region: string;
  }

  const bobbleheads: Bobblehead[] = [
    // SPECIAL Bobbleheads
    { id: 'special-strength', name: 'Strength', category: 'SPECIAL', location: 'Mass Fusion Building', effect: '+1 Strength', region: 'East-central Commonwealth' },
    { id: 'special-perception', name: 'Perception', category: 'SPECIAL', location: 'Museum of Freedom', effect: '+1 Perception', region: 'Northwestern Commonwealth' },
    { id: 'special-endurance', name: 'Endurance', category: 'SPECIAL', location: 'Poseidon Energy', effect: '+1 Endurance', region: 'Southeastern Commonwealth' },
    { id: 'special-charisma', name: 'Charisma', category: 'SPECIAL', location: 'Parsons State Insane Asylum', effect: '+1 Charisma', region: 'Northeastern Commonwealth' },
    { id: 'special-intelligence', name: 'Intelligence', category: 'SPECIAL', location: 'Boston Public Library', effect: '+1 Intelligence', region: 'East-Central Commonwealth' },
    { id: 'special-agility', name: 'Agility', category: 'SPECIAL', location: 'Wreck of the FMS Northern Star', effect: '+1 Agility', region: 'Southeastern Commonwealth' },
    { id: 'special-luck', name: 'Luck', category: 'SPECIAL', location: 'Spectacle Island', effect: '+1 Luck', region: 'Southeastern Commonwealth' },

    // Skill Bobbleheads
    { id: 'skill-barter', name: 'Barter', category: 'Skill', location: 'Longneck Lukowski\'s Cannery', effect: 'Permanently grants 5% better prices when buying', region: 'Northeastern Commonwealth' },
    { id: 'skill-big-guns', name: 'Big Guns', category: 'Skill', location: 'Vault 95', effect: 'Permanently increases critical damage with heavy weapons by 25%', region: 'Southwestern Commonwealth' },
    { id: 'skill-energy-weapons', name: 'Energy Weapons', category: 'Skill', location: 'Fort Hagen', effect: 'Permanently increases critical damage with energy weapons by 25%', region: 'Western Commonwealth' },
    { id: 'skill-explosives', name: 'Explosives', category: 'Skill', location: 'Saugus Ironworks', effect: 'Permanently increases damage with explosives by 15%', region: 'Northeastern Commonwealth' },
    { id: 'skill-lockpicking', name: 'Lockpicking', category: 'Skill', location: 'Pickman Gallery', effect: 'Permanently makes lockpicking easier', region: 'East-central Commonwealth' },
    { id: 'skill-medicine', name: 'Medicine', category: 'Skill', location: 'Vault 81', effect: 'Permanently increases healing from stimpaks by 10%', region: 'Central Commonwealth' },
    { id: 'skill-melee', name: 'Melee', category: 'Skill', location: 'Trinity Tower', effect: 'Permanently increases critical damage with melee weapons by 25%', region: 'East-Central Commonwealth' },
    { id: 'skill-repair', name: 'Repair', category: 'Skill', location: 'Corvega Assembly Plant', effect: 'Permanently increases the duration of fusion cores by 10%', region: 'West-central Commonwealth' },
    { id: 'skill-science', name: 'Science', category: 'Skill', location: 'Malden Middle School', effect: 'Permanently gives you an extra guess when hacking terminals', region: 'Northeastern Commonwealth' },
    { id: 'skill-small-guns', name: 'Small Guns', category: 'Skill', location: 'Gunners Plaza', effect: 'Permanently increases critical damage with ballistic weapons by 25%', region: 'South-Eastern Commonwealth' },
    { id: 'skill-sneak', name: 'Sneak', category: 'Skill', location: 'Dunwich Borers', effect: 'Permanently makes the player character 10% harder to detect', region: 'Northeastern Commonwealth' },
    { id: 'skill-speech', name: 'Speech', category: 'Skill', location: 'Vault 114', effect: 'Permanently gives all vendors 100 bottle caps extra when bartering', region: 'Central Commonwealth' },
    { id: 'skill-unarmed', name: 'Unarmed', category: 'Skill', location: 'Atom Cats Garage', effect: 'Permanently increases critical damage with unarmed attacks by 25%', region: 'Southeastern Commonwealth' },
  ];

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
