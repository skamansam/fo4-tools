<script lang="ts">
  import { writable } from 'svelte/store';
  import type { ColorTheme } from '$lib/theme';
  import { colorThemes, getThemeFromCustomColor } from '$lib/theme';

  const selectedTheme = writable<number>(2);
  const customColor = writable<string>('#4ade80');
  const useCustom = writable<boolean>(false);

  function getCurrentTheme(): ColorTheme {
    if ($useCustom) {
      return getThemeFromCustomColor($customColor);
    }
    return colorThemes[$selectedTheme];
  }

  function applyTheme(theme: ColorTheme) {
    document.documentElement.style.setProperty('--theme-primary', theme.primary);
    document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
    document.documentElement.style.setProperty('--theme-accent', theme.accent);
    document.documentElement.style.setProperty('--theme-bg', theme.bg);
    document.documentElement.style.setProperty('--theme-border', theme.border);
    document.documentElement.style.setProperty('--theme-text', theme.text);
  }

  $effect(() => {
    applyTheme(getCurrentTheme());
  });
</script>

<div class="min-h-screen p-8 text-text">
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="border-2 border-primary-500 p-6 bg-surface mb-6">
      <h1 class="text-4xl font-bold text-primary-300">THEME SETTINGS</h1>
    </div>

    <!-- Predefined Colors -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold font-mono mb-6 text-primary-300">PREDEFINED THEMES</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each colorThemes as colorTheme, index}
          <button
            on:click={() => {
              useCustom.set(false);
              selectedTheme.set(index);
              applyTheme(colorTheme);
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
      <h2 class="text-2xl font-bold font-mono mb-6 text-primary-300">CUSTOM COLOR</h2>
      <div class="p-6 border-2 bg-surface border-primary-500">
        <div class="flex gap-6 items-center mb-6">
          <input
            type="color"
            bind:value={$customColor}
            on:change={() => {
              useCustom.set(true);
              applyTheme(getThemeFromCustomColor($customColor));
            }}
            class="w-24 h-24 cursor-pointer border-2 border-primary-500"
          />
          <div>
            <p class="text-sm font-mono mb-3 text-text">Selected Color:</p>
            <p class="text-lg font-mono font-bold text-primary-300">{$customColor}</p>
            <button
              on:click={() => {
                useCustom.set(true);
                applyTheme(getThemeFromCustomColor($customColor));
              }}
              class="mt-4 px-6 py-3 border-2 font-mono font-bold transition-all"
              style="background-color: {$useCustom ? 'var(--theme-primary)' : 'var(--theme-border)'}; border-color: var(--theme-border); color: {$useCustom ? 'var(--theme-bg)' : 'var(--theme-text)'};"
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
      <h2 class="text-2xl font-bold font-mono mb-6 text-primary-300">CURRENT THEME</h2>
      <div class="p-6 border-2 bg-surface border-primary-500">
        <p class="text-lg font-mono font-bold mb-6 text-primary-300">{getCurrentTheme().name}</p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p class="text-xs font-mono mb-2 text-text">PRIMARY</p>
            <div class="h-16 border border-primary-500" style="background-color: var(--theme-primary);"></div>
            <p class="text-xs font-mono mt-2 text-text">var(--theme-primary)</p>
          </div>
          <div>
            <p class="text-xs font-mono mb-2 text-theme-text">SECONDARY</p>
            <div class="h-16 border border-theme-border" style="background-color: var(--theme-secondary);"></div>
            <p class="text-xs font-mono mt-2 text-theme-text">var(--theme-secondary)</p>
          </div>
          <div>
            <p class="text-xs font-mono mb-2 text-theme-text">ACCENT</p>
            <div class="h-16 border border-theme-border" style="background-color: var(--theme-accent);"></div>
            <p class="text-xs font-mono mt-2 text-theme-text">var(--theme-accent)</p>
          </div>
          <div>
            <p class="text-xs font-mono mb-2 text-theme-text">BORDER</p>
            <div class="h-16 border border-theme-border" style="background-color: var(--theme-border);"></div>
            <p class="text-xs font-mono mt-2 text-theme-text">var(--theme-border)</p>
          </div>
          <div>
            <p class="text-xs font-mono mb-2 text-theme-text">BACKGROUND</p>
            <div class="h-16 border border-theme-border" style="background-color: var(--theme-bg);"></div>
            <p class="text-xs font-mono mt-2 text-theme-text">var(--theme-bg)</p>
          </div>
          <div>
            <p class="text-xs font-mono mb-2 text-theme-text">TEXT</p>
            <div class="h-16 border border-theme-border" style="background-color: var(--theme-text);"></div>
            <p class="text-xs font-mono mt-2 text-theme-text">var(--theme-text)</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Component Examples -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold font-mono mb-6 text-primary-300">COMPONENT EXAMPLES</h2>
      
      <!-- Buttons -->
      <div class="mb-8">
        <h3 class="text-lg font-bold font-mono mb-4 text-primary-300">Buttons</h3>
        <div class="flex flex-wrap gap-4">
          <button class="px-6 py-3 border-2 font-mono font-bold bg-theme-primary text-theme-bg border-theme-primary hover:opacity-90">
            PRIMARY
          </button>
          <button class="px-6 py-3 border-2 font-mono font-bold bg-theme-secondary text-theme-text border-theme-border hover:opacity-90">
            SECONDARY
          </button>
          <button class="px-6 py-3 border-2 font-mono font-bold bg-theme-accent text-theme-bg border-theme-accent hover:opacity-90">
            ACCENT
          </button>
          <button class="px-6 py-3 border-2 font-mono font-bold bg-transparent text-theme-primary border-theme-border hover:bg-theme-secondary">
            OUTLINE
          </button>
        </div>
      </div>

      <!-- Text Styles -->
      <div class="mb-8 p-6 border-2 bg-surface border-primary-500">
        <h3 class="text-lg font-bold font-mono mb-4 text-primary-300">Text Styles</h3>
        <div class="space-y-3">
          <p class="text-primary-300 font-bold">Primary Text (Bold)</p>
          <p class="text-text">Regular Text</p>
          <p class="text-background">Accent Text</p>
          <p class="text-primary-300 opacity-75">Dimmed Primary Text</p>
        </div>
      </div>

      <!-- Alert Boxes -->
      <div class="mb-8">
        <h3 class="text-lg font-bold font-mono mb-4 text-primary-300">Alerts</h3>
        <div class="space-y-4">
          <div class="p-4 border-2 bg-surface border-primary-500">
            <p class="font-bold text-primary-300 mb-2">⚠ Primary Alert</p>
            <p class="text-text text-sm">This is a primary alert message showing important information.</p>
          </div>
          <div class="p-4 border-2 bg-surface border-primary-500">
            <p class="font-bold text-background mb-2">✓ Success Alert</p>
            <p class="text-text text-sm">This is a success alert message showing positive feedback.</p>
          </div>
          <div class="p-4 border-2 bg-surface border-primary-500">
            <p class="font-bold text-text mb-2">ℹ Info Alert</p>
            <p class="text-text text-sm">This is an informational alert message with additional details.</p>
          </div>
        </div>
      </div>

      <!-- Cards -->
      <div class="mb-8">
        <h3 class="text-lg font-bold font-mono mb-4 text-primary-300">Cards</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-6 border-2 bg-surface border-primary-500">
            <h4 class="text-primary-300 font-bold mb-2">Card Title</h4>
            <p class="text-text text-sm mb-4">This is a card with a border and secondary background color.</p>
            <button class="px-4 py-2 border-2 bg-primary-500 text-background border-primary-500 font-mono text-sm font-bold">
              ACTION
            </button>
          </div>
          <div class="p-6 border-2 bg-background border-primary-500">
            <h4 class="text-background font-bold mb-2">Accent Card</h4>
            <p class="text-text text-sm mb-4">This card uses the accent color for the border.</p>
            <button class="px-4 py-2 border-2 bg-primary-500 text-background border-primary-500 font-mono text-sm font-bold">
              ACTION
            </button>
          </div>
        </div>
      </div>

      <!-- Input Fields -->
      <div class="mb-8">
        <h3 class="text-lg font-bold font-mono mb-4 text-primary-300">Input Fields</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-primary-300 font-mono text-sm font-bold mb-2">Text Input</label>
            <input type="text" placeholder="Enter text..." class="w-full px-4 py-2 border-2 bg-background text-text border-primary-500 transition-colors focus:bg-surface placeholder:text-primary-900 focus:ring-primary-900" />
          </div>
          <div>
            <label class="block text-primary-300 font-mono text-sm font-bold mb-2">Color Input</label>
            <input type="color" class="w-full h-12 border-2 border-primary-500 cursor-pointer" />
          </div>
        </div>
      </div>

      <!-- Code Block -->
      <div class="mb-8">
        <h3 class="text-lg font-bold font-mono mb-4 text-primary-300">Code Block</h3>
        <div class="p-4 border-2 border-primary-500 font-mono text-sm text-background">
          <div>const theme = &#123;</div>
          <div class="ml-4">primary: <span class="text-primary-300">#4ade80</span>,</div>
          <div class="ml-4">secondary: <span class="text-muted">#15803d</span>,</div>
          <div class="ml-4">accent: <span class="text-background">#86efac</span>,</div>
          <div>&#125;</div>
        </div>
      </div>

      <!-- Status Indicators -->
      <div class="mb-8">
        <h3 class="text-lg font-bold font-mono mb-4 text-primary-300">Status Indicators</h3>
        <div class="flex flex-wrap gap-6">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 border-2 border-primary-500 bg-primary-500"></div>
            <span class="text-text font-mono text-sm">Active</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 border-2 border-primary-500 bg-background"></div>
            <span class="text-text font-mono text-sm">Success</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 border-2 border-primary-500 bg-transparent"></div>
            <span class="text-text font-mono text-sm">Inactive</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 border-2 border-primary-500 bg-surface"></div>
            <span class="text-text font-mono text-sm">Pending</span>
          </div>
        </div>
      </div>

      <!-- Tables -->
      <div class="mb-8">
        <h3 class="text-lg font-bold font-mono mb-4 text-primary-300">Table</h3>
        <div class="border-2 border-primary-500 overflow-hidden">
          <table class="w-full">
            <thead>
              <tr class="bg-surface border-b-2 border-primary-500">
                <th class="px-4 py-3 text-left text-primary-300 font-bold font-mono">Header 1</th>
                <th class="px-4 py-3 text-left text-primary-300 font-bold font-mono">Header 2</th>
                <th class="px-4 py-3 text-left text-primary-300 font-bold font-mono">Header 3</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-primary-500 hover:bg-surface">
                <td class="px-4 py-3 text-text">Row 1, Col 1</td>
                <td class="px-4 py-3 text-text">Row 1, Col 2</td>
                <td class="px-4 py-3 text-background">Row 1, Col 3</td>
              </tr>
              <tr class="border-b border-primary-500 hover:bg-surface">
                <td class="px-4 py-3 text-text">Row 2, Col 1</td>
                <td class="px-4 py-3 text-text">Row 2, Col 2</td>
                <td class="px-4 py-3 text-background">Row 2, Col 3</td>
              </tr>
              <tr class="hover:bg-surface">
                <td class="px-4 py-3 text-text">Row 3, Col 1</td>
                <td class="px-4 py-3 text-text">Row 3, Col 2</td>
                <td class="px-4 py-3 text-background">Row 3, Col 3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Badges/Tags -->
      <div class="mb-8">
        <h3 class="text-lg font-bold font-mono mb-4 text-primary-300">Badges</h3>
        <div class="flex flex-wrap gap-3">
          <span class="px-3 py-1 border-2 bg-primary-500 text-background border-primary-500 font-mono text-xs font-bold">BADGE</span>
          <span class="px-3 py-1 border-2 bg-surface text-text border-primary-500 font-mono text-xs font-bold">SECONDARY</span>
          <span class="px-3 py-1 border-2 bg-background text-background border-primary-500 font-mono text-xs font-bold">ACCENT</span>
          <span class="px-3 py-1 border-2 bg-transparent text-primary-300 border-primary-500 font-mono text-xs font-bold">OUTLINE</span>
        </div>
      </div>
    </div>

    <!-- Info -->
    <div class="p-6 border-2 bg-surface border-primary-500">
      <p class="text-sm font-mono text-text">
        <strong class="text-primary-300">NOTE:</strong> Theme preferences are currently stored per-session. Future updates will add persistent storage.
      </p>
    </div>
  </div>
</div>

<style lang="postcss">
  @reference "../../routes/layout.css";
</style>
