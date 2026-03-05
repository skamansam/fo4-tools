<script lang="ts">
  import { writable } from 'svelte/store';
  import { colorThemes, getThemeFromCustomColor, defaultTheme } from '$lib/theme';
  import type { ColorTheme } from '$lib/theme';

  const selectedTheme = writable<number>(2);
  const customColor = writable<string>('#4ade80');
  const useCustom = writable<boolean>(false);

  function getCurrentTheme(): ColorTheme {
    if ($useCustom) {
      return getThemeFromCustomColor($customColor);
    }
    return colorThemes[$selectedTheme];
  }
</script>

{#if true}
  {@const theme = getCurrentTheme()}
  <div
    class="min-h-screen p-8 transition-colors duration-300"
    style="background-color: {theme.bg}; color: {theme.text};"
  >
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold font-mono mb-2" style="color: {theme.primary};">THEME SETTINGS</h1>
      <div class="mb-8" style="border-bottom: 2px solid {theme.border};"></div>

      <!-- Predefined Colors -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold font-mono mb-6" style="color: {theme.primary};">PREDEFINED THEMES</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each colorThemes as colorTheme, index}
            <button
              on:click={() => {
                useCustom.set(false);
                selectedTheme.set(index);
              }}
              class="p-6 border-2 font-mono font-bold transition-all text-left"
              style="background-color: {colorTheme.secondary}; border-color: {colorTheme.border}; color: {colorTheme.text}; {!$useCustom && $selectedTheme === index ? 'box-shadow: 0 0 20px ' + colorTheme.primary : ''}"
            >
              <div class="text-lg mb-3" style="color: {colorTheme.primary};">{colorTheme.name}</div>
              <div class="grid grid-cols-5 gap-2">
                <div class="w-12 h-12" style="background-color: {colorTheme.primary};"></div>
                <div class="w-12 h-12" style="background-color: {colorTheme.secondary};"></div>
                <div class="w-12 h-12" style="background-color: {colorTheme.accent};"></div>
                <div class="w-12 h-12" style="background-color: {colorTheme.border};"></div>
                <div class="w-12 h-12" style="background-color: {colorTheme.bg};"></div>
              </div>
            </button>
          {/each}
        </div>
      </div>

      <!-- Custom Color -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold font-mono mb-6" style="color: {theme.primary};">CUSTOM COLOR</h2>
        <div class="p-6 border-2" style="background-color: {theme.secondary}; border-color: {theme.border};">
          <div class="flex gap-6 items-center mb-6">
            <input
              type="color"
              bind:value={$customColor}
              on:change={() => useCustom.set(true)}
              class="w-24 h-24 cursor-pointer border-2"
              style="border-color: {theme.border};"
            />
            <div>
              <p class="text-sm font-mono mb-3" style="color: {theme.text};">Selected Color:</p>
              <p class="text-lg font-mono font-bold" style="color: {theme.primary};">{$customColor}</p>
              <button
                on:click={() => useCustom.set(true)}
                class="mt-4 px-6 py-3 border-2 font-mono font-bold transition-all"
                style="background-color: {$useCustom ? theme.primary : theme.border}; border-color: {theme.border}; color: {$useCustom ? theme.bg : theme.text};"
              >
                {$useCustom ? '✓ ACTIVE' : 'ACTIVATE'}
              </button>
            </div>
          </div>

          {#if $useCustom}
            <div class="grid grid-cols-5 gap-2 mt-6">
              {#each Array.from({ length: 5 }) as _, i}
                {@const customTheme = getThemeFromCustomColor($customColor)}
                {#if i === 0}
                  <div class="w-16 h-16" style="background-color: {customTheme.primary};"></div>
                {:else if i === 1}
                  <div class="w-16 h-16" style="background-color: {customTheme.secondary};"></div>
                {:else if i === 2}
                  <div class="w-16 h-16" style="background-color: {customTheme.accent};"></div>
                {:else if i === 3}
                  <div class="w-16 h-16" style="background-color: {customTheme.border};"></div>
                {:else}
                  <div class="w-16 h-16" style="background-color: {customTheme.bg};"></div>
                {/if}
              {/each}
            </div>
          {/if}
        </div>
      </div>

      <!-- Current Theme Preview -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold font-mono mb-6" style="color: {theme.primary};">CURRENT THEME</h2>
        <div class="p-6 border-2" style="background-color: {theme.secondary}; border-color: {theme.border};">
          <p class="text-lg font-mono font-bold mb-6" style="color: {theme.primary};">{theme.name}</p>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p class="text-xs font-mono mb-2" style="color: {theme.text};">PRIMARY</p>
              <div class="h-16 border" style="background-color: {theme.primary}; border-color: {theme.border};"></div>
              <p class="text-xs font-mono mt-2" style="color: {theme.text};">{theme.primary}</p>
            </div>
            <div>
              <p class="text-xs font-mono mb-2" style="color: {theme.text};">SECONDARY</p>
              <div class="h-16 border" style="background-color: {theme.secondary}; border-color: {theme.border};"></div>
              <p class="text-xs font-mono mt-2" style="color: {theme.text};">{theme.secondary}</p>
            </div>
            <div>
              <p class="text-xs font-mono mb-2" style="color: {theme.text};">ACCENT</p>
              <div class="h-16 border" style="background-color: {theme.accent}; border-color: {theme.border};"></div>
              <p class="text-xs font-mono mt-2" style="color: {theme.text};">{theme.accent}</p>
            </div>
            <div>
              <p class="text-xs font-mono mb-2" style="color: {theme.text};">BORDER</p>
              <div class="h-16 border" style="background-color: {theme.border}; border-color: {theme.border};"></div>
              <p class="text-xs font-mono mt-2" style="color: {theme.text};">{theme.border}</p>
            </div>
            <div>
              <p class="text-xs font-mono mb-2" style="color: {theme.text};">BACKGROUND</p>
              <div class="h-16 border" style="background-color: {theme.bg}; border-color: {theme.border};"></div>
              <p class="text-xs font-mono mt-2" style="color: {theme.text};">{theme.bg}</p>
            </div>
            <div>
              <p class="text-xs font-mono mb-2" style="color: {theme.text};">TEXT</p>
              <div class="h-16 border" style="background-color: {theme.text}; border-color: {theme.border};"></div>
              <p class="text-xs font-mono mt-2" style="color: {theme.text};">{theme.text}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Info -->
      <div class="p-6 border-2" style="background-color: {theme.secondary}; border-color: {theme.border};">
        <p class="text-sm font-mono" style="color: {theme.text};">
          <strong style="color: {theme.primary};">NOTE:</strong> Theme preferences are currently stored per-session. Future updates will add persistent storage.
        </p>
      </div>
    </div>
  </div>
{/if}

<style lang="postcss">
  @reference "../../routes/layout.css";
</style>
