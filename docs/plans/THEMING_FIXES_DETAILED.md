# Detailed Theming Fixes Checklist

**Objective**: Ensure all UI elements in the fo4-tools app respect the global theme system by replacing hardcoded custom classes with theme-aware CSS variables and Tailwind utilities.

## Overview

The fo4-tools app uses a theme system defined in `src/routes/layout.css` with CSS variables (`--theme-primary`, `--theme-bg`, etc.) and Tailwind theme tokens. However, several pages use custom `fo4-*` classes that are not tied to this theme system, causing visual inconsistency when themes are changed.

## Critical Issues

### 1. Custom fo4-* Classes Not Integrated with Theme System

**Problem**: The armor, weapons, hacking, and workshop pages use custom `fo4-*` classes that are hardcoded to specific Fallout 4 colors and do not respect the theme system.

**Files Affected**:
- `src/routes/armor/+page.svelte` (40+ instances)
- `src/routes/weapons/+page.svelte` (35+ instances)
- `src/routes/hacking/+page.svelte` (20+ instances)
- `src/routes/workshop/+page.svelte` (25+ instances)
- `src/app.html` (2 instances)

**Custom Classes Used**:
- `bg-fo4-black` - Should map to `bg-surface` or `bg-background`
- `bg-fo4-dark` - Should map to `bg-background` or darker variant
- `bg-fo4-green` - Should map to `bg-theme-primary` or `bg-primary-500`
- `text-fo4-green` - Should map to `text-theme-primary` or `text-primary-500`
- `text-fo4-green-light` - Should map to `text-theme-accent` or `text-primary-300`
- `text-fo4-yellow` - Should map to `text-warning-500` or theme equivalent
- `border-fo4-green` - Should map to `border-theme-border` or `border-primary-500`
- `border-fo4-green-light` - Should map to `border-theme-accent` or `border-primary-300`
- `placeholder-fo4-green` - Should map to `placeholder-muted` or theme text color

**Required Action**: Define these custom classes in `src/routes/layout.css` to map to theme variables, OR replace all instances with theme-aware Tailwind classes.

---

## Detailed Fixes by Page

### src/app.html

**Line 15**: `<body data-sveltekit-preload-data="hover" data-theme class="bg-fo4-dark text-fo4-green font-mono">`

- **Fix**: Replace `bg-fo4-dark` with `bg-background`
- **Fix**: Replace `text-fo4-green` with `text-text`
- **Rationale**: The body should use theme system colors, not hardcoded fo4 classes

---

### src/routes/armor/+page.svelte

**Header Section (Lines 101-104)**:
- Line 101: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 102: `text-fo4-green-light` → `text-theme-primary`

**Armor Pieces Panel (Lines 108-123)**:
- Line 108: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 109: `text-fo4-green-light` → `text-theme-primary`
- Lines 115-116: `border-fo4-green bg-fo4-green text-fo4-black` → `border-theme-border bg-theme-primary text-background`
- Lines 115-116: `border-fo4-green bg-fo4-dark text-fo4-green` → `border-theme-border bg-background text-text`
- Line 116: `hover:bg-fo4-green hover:text-fo4-black` → `hover:bg-theme-primary hover:text-background`

**Armor Details Section (Lines 129-149)**:
- Line 129: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 130: `text-fo4-green-light` → `text-theme-primary`

**Modifications Section (Lines 152-167)**:
- Line 152: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 153: `text-fo4-green-light` → `text-theme-primary`
- Lines 159-160: Same pattern as armor pieces buttons (replace fo4 classes)

**Modification Details Section (Lines 171-204)**:
- Line 171: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 172: `text-fo4-green-light` → `text-theme-primary`

**Applicable Perks Section (Lines 208-229)**:
- Line 208: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 209: `text-fo4-green-light` → `text-theme-primary`
- Line 212: `bg-fo4-dark border border-fo4-green` → `bg-background border border-theme-border`
- Lines 219, 222: `text-fo4-green-light` → `text-theme-primary`

**Final Resistance Section (Lines 233-270)**:
- Line 233: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 234: `text-fo4-green-light` → `text-theme-primary`
- Lines 236, 240, 245: `bg-fo4-dark border border-fo4-green` → `bg-background border border-theme-border`
- Line 258: `bg-fo4-dark border border-fo4-green-light` → `bg-background border border-theme-accent`
- Lines 261-262: `text-fo4-green-light` → `text-theme-primary`

**Empty State (Line 270)**:
- Line 270: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`

---

### src/routes/weapons/+page.svelte

**Same pattern as armor page** - all fo4-* classes need to be replaced with theme-aware classes:

- Lines 93-94: Header section
- Lines 100-108: Weapons panel
- Lines 121-149: Weapon details
- Lines 152-167: Modifications
- Lines 171-200: Modification details
- Lines 204-218: Applicable perks
- Lines 222-245: Final damage calculation
- Line 245: Empty state

**Specific replacements** (same as armor page):
- `bg-fo4-black` → `bg-surface`
- `bg-fo4-dark` → `bg-background`
- `bg-fo4-green` → `bg-theme-primary`
- `text-fo4-green` → `text-text`
- `text-fo4-green-light` → `text-theme-primary`
- `border-fo4-green` → `border-theme-border`
- `border-fo4-green-light` → `border-theme-accent`

---

### src/routes/hacking/+page.svelte

**Header Section (Lines 44-47)**:
- Line 44: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 45: `text-fo4-green-light` → `text-theme-primary`

**Word Input Panel (Lines 51-84)**:
- Line 51: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 52: `text-fo4-green-light` → `text-theme-primary`
- Line 62: `bg-fo4-dark border-2 border-fo4-green text-fo4-green` → `bg-background border-2 border-theme-border text-text`
- Line 62: `placeholder-fo4-green` → `placeholder-muted`
- Line 74: `bg-fo4-dark border-2 border-fo4-green text-fo4-green` → `bg-background border-2 border-theme-border text-text`
- Line 80: `bg-fo4-dark border-2 border-fo4-green text-fo4-green` → `bg-background border-2 border-theme-border text-text`
- Line 80: `hover:bg-fo4-green hover:text-fo4-black` → `hover:bg-theme-primary hover:text-background`

**Candidate Words Section (Lines 87-103)**:
- Line 87: `text-fo4-green-light` → `text-theme-primary`
- Line 90: `bg-fo4-dark border-2 border-fo4-green` → `bg-background border-2 border-theme-border`
- Line 94: `bg-fo4-green text-fo4-black` → `bg-theme-primary text-background`

**Action Buttons (Lines 105-118)**:
- Lines 108, 114: `bg-fo4-dark border-2 border-fo4-green text-fo4-green` → `bg-background border-2 border-theme-border text-text`
- Lines 108, 114: `hover:bg-fo4-green hover:text-fo4-black` → `hover:bg-theme-primary hover:text-background`

**Solution Panel (Lines 122-132)**:
- Line 122: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 123: `text-fo4-green-light` → `text-theme-primary`
- Line 125: `bg-fo4-dark border-2 border-fo4-green` → `bg-background border-2 border-theme-border`
- Line 127: `text-fo4-green-light` → `text-theme-primary`

---

### src/routes/workshop/+page.svelte

**Header Section (Lines 46-49)**:
- Line 46: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 47: `text-fo4-green-light` → `text-theme-primary`

**Search & Filter Panel (Lines 53-104)**:
- Line 53: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 54: `text-fo4-green-light` → `text-theme-primary`
- Line 58: `text-fo4-green-light` → `text-theme-primary`
- Line 66: `bg-fo4-dark border-2 border-fo4-green text-fo4-green` → `bg-background border-2 border-theme-border text-text`
- Line 66: `placeholder-fo4-green` → `placeholder-muted`
- Line 66: `focus:bg-fo4-black` → `focus:bg-surface`
- Line 72: `text-fo4-green-light` → `text-theme-primary`
- Line 77: `bg-fo4-dark border-2 border-fo4-green text-fo4-green` → `bg-background border-2 border-theme-border text-text`
- Line 77: `focus:bg-fo4-black` → `focus:bg-surface`
- Line 93: `border-2 border-fo4-green bg-fo4-dark text-fo4-green` → `border-2 border-theme-border bg-background text-text`
- Line 93: `hover:bg-fo4-green hover:text-fo4-black` → `hover:bg-theme-primary hover:text-background`
- Line 99: `bg-fo4-dark border border-fo4-green` → `bg-background border border-theme-border`
- Line 100: `text-fo4-green-light` → `text-theme-primary`

**Available Items Section (Lines 109-133)**:
- Line 109: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 110: `text-fo4-green-light` → `text-theme-primary`
- Lines 117-118: Button pattern (same as other pages)
- Line 123: `text-fo4-yellow` → `text-warning-500`

**Item Details Section (Lines 137-165)**:
- Line 137: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 138: `text-fo4-green-light` → `text-theme-primary`
- Line 154: `bg-fo4-dark p-2 border border-fo4-green` → `bg-background p-2 border border-theme-border`
- Line 161: `text-fo4-yellow` → `text-warning-500`

**Materials Required Section (Lines 168-178)**:
- Line 168: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 169: `text-fo4-green-light` → `text-theme-primary`
- Line 172: `bg-fo4-dark border border-fo4-green` → `bg-background border border-theme-border`

**Components Required Section (Lines 181-191)**:
- Line 181: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 182: `text-fo4-green-light` → `text-theme-primary`
- Line 185: `bg-fo4-dark border border-fo4-green` → `bg-background border border-theme-border`

**Tags Section (Lines 194-203)**:
- Line 194: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`
- Line 195: `text-fo4-green-light` → `text-theme-primary`
- Line 198: `bg-fo4-green text-fo4-black` → `bg-theme-primary text-background`

**Empty State (Line 205)**:
- Line 205: `border-2 border-fo4-green p-6 bg-fo4-black` → `border-2 border-theme-border p-6 bg-surface`

---

### src/routes/perks/+page.svelte

**Problem**: Uses hardcoded neutral colors instead of theme colors.

**Header Section (Lines 100-103)**:
- Line 101: `text-primary-500` → `text-theme-primary` (already close, but should use theme variable)
- Line 102: `text-neutral-600 dark:text-neutral-400` → `text-muted`

**Table Header (Lines 107-127)**:
- Line 111: `bg-primary-500 text-white` → `bg-theme-primary text-background`
- **Rationale**: Hardcoded `primary-500` doesn't respect theme changes

**Table Cells (Lines 129-166)**:
- Line 132: `bg-neutral-50 dark:bg-neutral-900` → `bg-surface`
- Line 135: `border border-neutral-200 dark:border-neutral-800` → `border border-theme-border`
- Line 135: `bg-white dark:bg-neutral-950` → `bg-background`
- Line 137: `text-neutral-900 dark:text-white` → `text-text`
- Line 140: `text-neutral-600 dark:text-neutral-400` → `text-muted`
- Line 155: `text-neutral-600 dark:text-neutral-400` → `text-muted`

**Rationale**: All neutral colors should be replaced with theme-aware classes to ensure consistency across all theme variants.

---

### src/routes/quests/+page.svelte

**Status**: ✅ Already using theme colors correctly

- Uses `text-theme-primary`, `bg-surface`, `border-theme-border`, etc.
- No changes needed

---

### src/routes/quests/[categoryId]/+page.svelte

**Status**: ✅ Already using theme colors correctly

- Uses `text-theme-primary`, `bg-surface`, `border-theme-border`, etc.
- No changes needed

---

### src/routes/bobbleheads/+page.svelte

**Status**: ✅ Already using theme colors correctly

- Uses `text-theme-primary`, `bg-surface`, etc.
- No changes needed

**Minor Issue**: Uses `rounded-lg` classes which may not match the Fallout aesthetic (typically sharp corners). Consider removing rounded corners for consistency with Fallout terminal style.

**Lines with rounded corners**:
- Line 46: `rounded-lg` on progress bar container
- Line 51: `rounded-full` on progress bar
- Line 64, 89: `rounded-lg` on bobblehead cards

**Optional Fix**: Replace `rounded-lg` with `rounded-none` or `rounded-sm` for sharper, more terminal-like appearance.

---

### src/routes/magazines/+page.svelte

**Status**: ✅ Already using theme colors correctly

- Uses `text-theme-primary`, `bg-surface`, etc.
- No changes needed

**Minor Issue**: Same as bobbleheads - uses `rounded-lg` classes.

**Lines with rounded corners**:
- Line 56: `rounded-lg` on progress bar container
- Line 61: `rounded-full` on progress bar
- Line 70, 82, 103: `rounded-lg` on magazine cards

**Optional Fix**: Replace `rounded-lg` with `rounded-none` or `rounded-sm` for sharper, more terminal-like appearance.

---

## Twintrinsic Component Analysis

### Sidebar Menu Icons

**Component**: `twintrinsic/src/lib/components/TreeMenu/TreeMenu.svelte`

**Status**: ✅ Already theme-aware

- Icons in TreeMenu (lines 104-106, 119-121, 130-132, 141-143) use the Icon component
- Icon component inherits text color from parent
- No hardcoded purple colors found
- Icons will automatically match theme text color

**No changes needed** to Twintrinsic components for icon colors.

---

## Implementation Strategy

### Option 1: Define fo4-* Classes in Theme System (Recommended)

Add CSS class mappings in `src/routes/layout.css`:

```css
/* Map fo4-* classes to theme variables */
.bg-fo4-black {
  background-color: var(--theme-bg) !important;
}

.bg-fo4-dark {
  background-color: var(--color-surface) !important;
}

.bg-fo4-green {
  background-color: var(--theme-primary) !important;
}

.text-fo4-green {
  color: var(--theme-text) !important;
}

.text-fo4-green-light {
  color: var(--theme-accent) !important;
}

.text-fo4-yellow {
  color: var(--color-warning-500) !important;
}

.border-fo4-green {
  border-color: var(--theme-border) !important;
}

.border-fo4-green-light {
  border-color: var(--theme-accent) !important;
}

.placeholder-fo4-green {
  color: var(--color-muted) !important;
}
```

**Advantages**:
- Minimal code changes (only add CSS to layout.css)
- Preserves existing class names
- Easy to maintain

**Disadvantages**:
- Adds technical debt (non-standard class names)
- Doesn't follow Twintrinsic conventions

---

### Option 2: Replace All fo4-* Classes with Theme-Aware Classes

Replace all instances of fo4-* classes with standard Tailwind theme classes as documented in the detailed fixes above.

**Advantages**:
- Follows Twintrinsic conventions
- Uses standard Tailwind utilities
- More maintainable long-term
- Demonstrates proper Twintrinsic usage

**Disadvantages**:
- More code changes required
- Higher risk of introducing bugs

---

## Recommended Approach

**Phase 1**: Define fo4-* class mappings in `src/routes/layout.css` (Option 1)
- This provides immediate theme support with minimal risk
- Allows testing theme changes across all pages

**Phase 2**: Gradually migrate to standard theme classes (Option 2)
- Start with one page (e.g., hacking) as proof of concept
- Migrate other pages incrementally
- Remove fo4-* class mappings once all pages are migrated

---

## Testing Checklist

After implementing fixes, verify:

- [ ] All pages render correctly with default (Enclave Green) theme
- [ ] All pages render correctly with other themes (Vault-Tec Yellow, Brotherhood Steel, Nuka-Cola Red, Institute Purple)
- [ ] Theme toggle (if implemented) works correctly
- [ ] No visual artifacts or broken styling
- [ ] Text contrast remains accessible across all themes
- [ ] Interactive elements (buttons, inputs) maintain proper hover/focus states
- [ ] Twintrinsic components (App, Sidebar, TreeMenu) integrate seamlessly with theme

---

## Additional Considerations

### Rounded Corners

The bobbleheads and magazines pages use `rounded-lg` and `rounded-full` classes. For a more authentic Fallout terminal aesthetic, consider:

- Replacing `rounded-lg` with `rounded-none` (sharp corners)
- Or replacing with `rounded-sm` (slightly rounded)
- Progress bars could use `rounded-none` for terminal-style appearance

This is optional and depends on desired aesthetic - current rounded corners may be intentional for a more modern look.

### Font Family

The app uses `font-mono` in app.html which is appropriate for a terminal-style interface. This should be preserved.

### Browser-Native Styling

Per Twintrinsic philosophy, ensure:
- Use CSS for styling instead of JavaScript where possible
- Leverage browser-native features (CSS variables, native form styling)
- Minimize custom JavaScript for theme switching (use CSS prefers-color-scheme or data attributes)

---

## Summary

**Total Pages Requiring Changes**: 5
- armor/+page.svelte (40+ replacements)
- weapons/+page.svelte (35+ replacements)
- hacking/+page.svelte (20+ replacements)
- workshop/+page.svelte (25+ replacements)
- perks/+page.svelte (10+ replacements)
- app.html (2 replacements)

**Total Estimated Replacements**: ~130+ class name changes

**Twintrinsic Component Changes**: None required (already theme-aware)

**Recommended Implementation**: Two-phase approach - first add CSS mappings, then gradually migrate to standard classes.
