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

<div class="min-h-screen p-8 bg-theme-bg text-theme-text">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold font-mono mb-2 text-theme-primary">THEME SETTINGS</h1>
    <div class="mb-8 border-b-2 border-theme-border"></div>

    <!-- Predefined Colors -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold font-mono mb-6 text-theme-primary">PREDEFINED THEMES</h2>
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
      <h2 class="text-2xl font-bold font-mono mb-6 text-theme-primary">CUSTOM COLOR</h2>
      <div class="p-6 border-2 bg-theme-secondary border-theme-border">
        <div class="flex gap-6 items-center mb-6">
          <input
            type="color"
            bind:value={$customColor}
            on:change={() => {
              useCustom.set(true);
              applyTheme(getThemeFromCustomColor($customColor));
            }}
            class="w-24 h-24 cursor-pointer border-2 border-theme-border"
          />
          <div>
            <p class="text-sm font-mono mb-3 text-theme-text">Selected Color:</p>
            <p class="text-lg font-mono font-bold text-theme-primary">{$customColor}</p>
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
      <h2 class="text-2xl font-bold font-mono mb-6 text-theme-primary">CURRENT THEME</h2>
      <div class="p-6 border-2 bg-theme-secondary border-theme-border">
        <p class="text-lg font-mono font-bold mb-6 text-theme-primary">{getCurrentTheme().name}</p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p class="text-xs font-mono mb-2 text-theme-text">PRIMARY</p>
            <div class="h-16 border border-theme-border" style="background-color: var(--theme-primary);"></div>
            <p class="text-xs font-mono mt-2 text-theme-text">var(--theme-primary)</p>
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
      <h2 class="text-2xl font-bold font-mono mb-6 text-theme-primary">COMPONENT EXAMPLES</h2>
      
      <!-- Buttons -->
      <div class="mb-8">
        <h3 class="text-lg font-bold font-mono mb-4 text-theme-primary">Buttons</h3>
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
      <div class="mb-8 p-6 border-2 bg-theme-secondary border-theme-border">
        <h3 class="text-lg font-bold font-mono mb-4 text-theme-primary">Text Styles</h3>
        <div class="space-y-3">
          <p class="text-theme-primary font-bold">Primary Text (Bold)</p>
          <p class="text-theme-text">Regular Text</p>
          <p class="text-theme-accent">Accent Text</p>
          <p class="text-theme-primary opacity-75">Dimmed Primary Text</p>
        </div>
      </div>

      <!-- Alert Boxes -->
      <div class="mb-8">
        <h3 class="text-lg font-bold font-mono mb-4 text-theme-primary">Alerts</h3>
        <div class="space-y-4">
          <div class="p-4 border-2 bg-theme-secondary border-theme-primary">
            <p class="font-bold text-theme-primary mb-2">⚠ Primary Alert</p>
            <p class="text-theme-text text-sm">This is a primary alert message showing important information.</p>
          </div>
          <div class="p-4 border-2 bg-theme-secondary border-theme-accent">
            <p class="font-bold text-theme-accent mb-2">✓ Success Alert</p>
            <p class="text-theme-text text-sm">This is a success alert message showing positive feedback.</p>
          </div>
          <div class="p-4 border-2 bg-theme-secondary border-theme-border">
            <p class="font-bold text-theme-text mb-2">ℹ Info Alert</p>
            <p class="text-theme-text text-sm">This is an informational alert message with additional details.</p>
          </div>
        </div>
      </div>

      <!-- Cards -->
      <div class="mb-8">
        <h3 class="text-lg font-bold font-mono mb-4 text-theme-primary">Cards</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-6 border-2 bg-theme-secondary border-theme-border">
            <h4 class="text-theme-primary font-bold mb-2">Card Title</h4>
            <p class="text-theme-text text-sm mb-4">This is a card with a border and secondary background color.</p>
            <button class="px-4 py-2 border-2 bg-theme-primary text-theme-bg border-theme-primary font-mono text-sm font-bold">
              ACTION
            </button>
          </div>
          <div class="p-6 border-2 bg-theme-bg border-theme-accent">
            <h4 class="text-theme-accent font-bold mb-2">Accent Card</h4>
            <p class="text-theme-text text-sm mb-4">This card uses the accent color for the border.</p>
            <button class="px-4 py-2 border-2 bg-theme-accent text-theme-bg border-theme-accent font-mono text-sm font-bold">
              ACTION
            </button>
          </div>
        </div>
      </div>

      <!-- Input Fields -->
      <div class="mb-8">
        <h3 class="text-lg font-bold font-mono mb-4 text-theme-primary">Input Fields</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-theme-primary font-mono text-sm font-bold mb-2">Text Input</label>
            <input type="text" placeholder="Enter text..." class="w-full px-4 py-2 border-2 bg-theme-bg text-theme-text border-theme-border placeholder-theme-text placeholder-opacity-50 focus:outline-none focus:border-theme-primary" />
          </div>
          <div>
            <label class="block text-theme-primary font-mono text-sm font-bold mb-2">Color Input</label>
            <input type="color" class="w-full h-12 border-2 border-theme-border cursor-pointer" />
          </div>
        </div>
      </div>

      <!-- Code Block -->
      <div class="mb-8">
        <h3 class="text-lg font-bold font-mono mb-4 text-theme-primary">Code Block</h3>
        <div class="p-4 border-2 bg-theme-bg border-theme-border font-mono text-sm text-theme-accent">
          <div>const theme = &#123;</div>
          <div class="ml-4">primary: <span class="text-theme-primary">#4ade80</span>,</div>
          <div class="ml-4">secondary: <span class="text-theme-secondary">#15803d</span>,</div>
          <div class="ml-4">accent: <span class="text-theme-accent">#86efac</span>,</div>
          <div>&#125;</div>
        </div>
      </div>

      <!-- Status Indicators -->
      <div class="mb-8">
        <h3 class="text-lg font-bold font-mono mb-4 text-theme-primary">Status Indicators</h3>
        <div class="flex flex-wrap gap-6">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 border-2 border-theme-primary bg-theme-primary"></div>
            <span class="text-theme-text font-mono text-sm">Active</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 border-2 border-theme-accent bg-theme-accent"></div>
            <span class="text-theme-text font-mono text-sm">Success</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 border-2 border-theme-border bg-transparent"></div>
            <span class="text-theme-text font-mono text-sm">Inactive</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 border-2 border-theme-border bg-theme-secondary"></div>
            <span class="text-theme-text font-mono text-sm">Pending</span>
          </div>
        </div>
      </div>

      <!-- Tables -->
      <div class="mb-8">
        <h3 class="text-lg font-bold font-mono mb-4 text-theme-primary">Table</h3>
        <div class="border-2 border-theme-border overflow-hidden">
          <table class="w-full">
            <thead>
              <tr class="bg-theme-secondary border-b-2 border-theme-border">
                <th class="px-4 py-3 text-left text-theme-primary font-bold font-mono">Header 1</th>
                <th class="px-4 py-3 text-left text-theme-primary font-bold font-mono">Header 2</th>
                <th class="px-4 py-3 text-left text-theme-primary font-bold font-mono">Header 3</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-theme-border hover:bg-theme-secondary">
                <td class="px-4 py-3 text-theme-text">Row 1, Col 1</td>
                <td class="px-4 py-3 text-theme-text">Row 1, Col 2</td>
                <td class="px-4 py-3 text-theme-accent">Row 1, Col 3</td>
              </tr>
              <tr class="border-b border-theme-border hover:bg-theme-secondary">
                <td class="px-4 py-3 text-theme-text">Row 2, Col 1</td>
                <td class="px-4 py-3 text-theme-text">Row 2, Col 2</td>
                <td class="px-4 py-3 text-theme-accent">Row 2, Col 3</td>
              </tr>
              <tr class="hover:bg-theme-secondary">
                <td class="px-4 py-3 text-theme-text">Row 3, Col 1</td>
                <td class="px-4 py-3 text-theme-text">Row 3, Col 2</td>
                <td class="px-4 py-3 text-theme-accent">Row 3, Col 3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Badges/Tags -->
      <div class="mb-8">
        <h3 class="text-lg font-bold font-mono mb-4 text-theme-primary">Badges</h3>
        <div class="flex flex-wrap gap-3">
          <span class="px-3 py-1 border-2 bg-theme-primary text-theme-bg border-theme-primary font-mono text-xs font-bold">BADGE</span>
          <span class="px-3 py-1 border-2 bg-theme-secondary text-theme-text border-theme-border font-mono text-xs font-bold">SECONDARY</span>
          <span class="px-3 py-1 border-2 bg-theme-accent text-theme-bg border-theme-accent font-mono text-xs font-bold">ACCENT</span>
          <span class="px-3 py-1 border-2 bg-transparent text-theme-primary border-theme-primary font-mono text-xs font-bold">OUTLINE</span>
        </div>
      </div>
    </div>

    <!-- Info -->
    <div class="p-6 border-2 bg-theme-secondary border-theme-border">
      <p class="text-sm font-mono text-theme-text">
        <strong class="text-theme-primary">NOTE:</strong> Theme preferences are currently stored per-session. Future updates will add persistent storage.
      </p>
    </div>
  </div>
</div>

<style lang="postcss">
  @reference "../../routes/layout.css";
</style>
