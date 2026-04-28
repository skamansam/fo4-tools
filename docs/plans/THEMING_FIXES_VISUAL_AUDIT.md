# Theming Fixes Checklist

**Date**: April 25, 2026
**Objective**: Ensure all pages in fo4-tools app respect the global theme system with correct borders, backgrounds, text colors, and fonts inspired by Fallout 4.

## Summary

**5 pages need theme fixes** while **6 pages already use theme colors correctly**.

---

## Implementation Plan

Replace custom `fo4-*` classes with proper Tailwind 4 theme classes. The theme is defined in `src/routes/layout.css` using Tailwind 4's `@theme` syntax with CSS variables.

### Hacking Page (/hacking)
- [ ] Replace `bg-fo4-black` with `bg-surface`
- [ ] Replace `bg-fo4-dark` with `bg-background`
- [ ] Replace `bg-fo4-green` with `bg-primary-500`
- [ ] Replace `text-fo4-green` with `text-text`
- [ ] Replace `text-fo4-green-light` with `text-primary-300`
- [ ] Replace `border-fo4-green` with `border-primary-500`
- [ ] Replace `placeholder-fo4-green` with `placeholder-muted`
- [ ] Test hacking page with all themes

### Armor Page (/armor)
- [ ] Replace all `bg-fo4-black` with `bg-surface`
- [ ] Replace all `bg-fo4-dark` with `bg-background`
- [ ] Replace all `bg-fo4-green` with `bg-primary-500`
- [ ] Replace all `text-fo4-green` with `text-text`
- [ ] Replace all `text-fo4-green-light` with `text-primary-300`
- [ ] Replace all `border-fo4-green` with `border-primary-500`
- [ ] Replace all `border-fo4-green-light` with `border-primary-300`
- [ ] Update button hover states to use theme classes
- [ ] Test armor page with all themes

### Weapons Page (/weapons)
- [ ] Replace all `bg-fo4-black` with `bg-surface`
- [ ] Replace all `bg-fo4-dark` with `bg-background`
- [ ] Replace all `bg-fo4-green` with `bg-primary-500`
- [ ] Replace all `text-fo4-green` with `text-text`
- [ ] Replace all `text-fo4-green-light` with `text-primary-300`
- [ ] Replace all `border-fo4-green` with `border-primary-500`
- [ ] Replace all `border-fo4-green-light` with `border-primary-300`
- [ ] Update button hover states to use theme classes
- [ ] Test weapons page with all themes

### Workshop Page (/workshop)
- [ ] Replace all `bg-fo4-black` with `bg-surface`
- [ ] Replace all `bg-fo4-dark` with `bg-background`
- [ ] Replace all `bg-fo4-green` with `bg-primary-500`
- [ ] Replace all `text-fo4-green` with `text-text`
- [ ] Replace all `text-fo4-green-light` with `text-primary-300`
- [ ] Replace `text-fo4-yellow` with `text-warning-500`
- [ ] Replace all `border-fo4-green` with `border-primary-500`
- [ ] Replace `placeholder-fo4-green` with `placeholder-muted`
- [ ] Update button hover states to use theme classes
- [ ] Test workshop page with all themes

### Perks Page (/perks)
- [ ] Replace `bg-primary-500` with `bg-primary-500` (already correct, verify)
- [ ] Replace `bg-neutral-50 dark:bg-neutral-900` with `bg-surface`
- [ ] Replace `bg-white dark:bg-neutral-950` with `bg-background`
- [ ] Replace `text-neutral-900 dark:text-white` with `text-text`
- [ ] Replace `text-neutral-600 dark:text-neutral-400` with `text-muted`
- [ ] Replace `border-neutral-200 dark:border-neutral-800` with `border-primary-500`
- [ ] Test perks page with all themes

---

## Testing Checklist

After implementing fixes for each page, verify:

- [ ] Page renders correctly with default (Enclave Green) theme
- [ ] Page renders correctly with Vault-Tec Yellow theme
- [ ] Page renders correctly with Brotherhood Steel theme
- [ ] Page renders correctly with Nuka-Cola Red theme
- [ ] Page renders correctly with Institute Purple theme
- [ ] Theme toggle on theme page works correctly
- [ ] No visual artifacts or broken styling
- [ ] Text contrast remains accessible across all themes
- [ ] Interactive elements (buttons, inputs) maintain proper hover/focus states
- [ ] Fallout 4 terminal aesthetic is preserved (mono font, sharp corners, etc.)

---

## Uniformity Issues Found (Post-Initial Fixes)

After implementing the initial fo4-* class replacements, visual inspection revealed additional uniformity issues:

### Main Page (/) - FIXED ✓
- [x] Tool cards now use `border-primary-500` styling
- [x] Cards use visible borders with hover effects
- [x] Consistent with panel styling on other pages

### Quests Page (/quests) - FIXED ✓
- [x] All panels now use `border-primary-500` styling
- [x] Table borders match `border-primary-500` styling
- [x] Table background matches `bg-surface` theme

### Bobbleheads Page (/bobbleheads) - PARTIAL FIX, MORE WORK NEEDED
- [x] Cards now have `border-primary-500` borders
- [x] Card background matches `bg-surface`
- [ ] Main container lacks `border-2 border-primary-500 p-6 bg-surface` styling
- [ ] Header section should be wrapped in bordered panel like quests page
- [ ] Progress bar section lacks `border-2 border-primary-500` styling
- [ ] Category headers should be in bordered panels or match quests page structure
- [ ] Cards use `rounded-lg` which quests page doesn't use
- [ ] Card padding is `p-4` instead of `p-6` used in quests page
- [ ] Info/note sections should use `border-2 border-primary-500` instead of missing borders

### Magazines Page (/magazines) - PARTIAL FIX, MORE WORK NEEDED
- [x] Cards now have `border-primary-500` borders
- [x] Card background matches `bg-surface`
- [ ] Main container lacks `border-2 border-primary-500 p-6 bg-surface` styling
- [ ] Header section should be wrapped in bordered panel like quests page
- [ ] Progress bar section lacks `border-2 border-primary-500` styling
- [ ] Info box uses `border-l-4` instead of `border-2 border-primary-500` like quests
- [ ] Category headers should be in bordered panels or match quests page structure
- [ ] Cards use `rounded-lg` which quests page doesn't use
- [ ] Card padding is `p-3` instead of `p-6` used in quests page
- [ ] DLC magazines section lacks `border-2 border-primary-500` styling
- [ ] All sections use `rounded-lg` which quests page doesn't use

### Player Page (/player) - FIXED ✓
- [x] Components now use `border-primary-500` borders
- [x] Backgrounds match `bg-surface` and `bg-background`
- [x] All theme-* classes replaced with Tailwind 4 theme classes

### Perks Page (/perks) - PARTIAL FIX, MORE WORK NEEDED
- [x] Neutral colors replaced with text-muted
- [ ] Header section should be wrapped in `border-2 border-primary-500 p-6 bg-surface` panel like quests page
- [ ] Missing overall progress section with Progress component like quests page
- [ ] Twintrinsic Table component borders don't match `border-primary-500` styling
- [ ] Table cells use `bg-surface` but borders may be inconsistent with quests page panel styling
- [ ] Table-based layout doesn't match card-based layout of quests page
- [ ] Consider restructuring to use card-based panels like quests page for consistency

### Theme Page (/theme) - FIXED ✓
- [x] Theme selector cards now match panel styling
- [x] Borders match `border-primary-500` theme
- [x] All theme-* classes replaced with Tailwind 4 theme classes for page structure

---

## Pages Already Using Theme Colors Correctly (Initial Assessment)

These pages were marked as correct in initial audit but may need updates based on uniformity review:

- [x] Main Page (/) - Fixed border styling updates
- [x] Quests Page (/quests) - Fixed table border updates
- [ ] Bobbleheads Page (/bobbleheads) - Partially fixed card borders, needs structural updates
- [ ] Magazines Page (/magazines) - Partially fixed card borders, needs structural updates
- [x] Player Page (/player) - Fixed component border verification
- [ ] Perks Page (/perks) - Partially fixed neutral colors, needs structural updates
- [x] Theme Page (/theme) - Fixed card border verification

---

## Remaining Work

### Bobbleheads Page
- Restructure main container to match quests page layout
- Add bordered panels to header and progress sections
- Remove `rounded-lg` classes
- Update card padding to `p-6`
- Add borders to category headers

### Magazines Page
- Restructure main container to match quests page layout
- Add bordered panels to header and progress sections
- Change info box from `border-l-4` to `border-2 border-primary-500`
- Remove `rounded-lg` classes
- Update card padding to `p-6`
- Add border to DLC magazines section

### Perks Page
- Add bordered panel to header section
- Add overall progress section with Progress component
- Consider restructuring from table-based to card-based layout for consistency

---

## Class Replacement Reference

Use these replacements when migrating from fo4-* classes to Tailwind 4 theme classes:

| fo4-* Class | Tailwind 4 Class |
|-------------|-----------------|
| `bg-fo4-black` | `bg-surface` |
| `bg-fo4-dark` | `bg-background` |
| `bg-fo4-green` | `bg-primary-500` |
| `text-fo4-green` | `text-text` |
| `text-fo4-green-light` | `text-primary-300` |
| `text-fo4-yellow` | `text-warning-500` |
| `border-fo4-green` | `border-primary-500` |
| `border-fo4-green-light` | `border-primary-300` |
| `placeholder-fo4-green` | `placeholder-muted` |

For Perks page neutral colors:
| Neutral Class | Tailwind 4 Class |
|---------------|-----------------|
| `bg-neutral-50 dark:bg-neutral-900` | `bg-surface` |
| `bg-white dark:bg-neutral-950` | `bg-background` |
| `bg-primary-500` | `bg-primary-500` (keep) |
| `text-neutral-900 dark:text-white` | `text-text` |
| `text-neutral-600 dark:text-neutral-400` | `text-muted` |
| `border-neutral-200 dark:border-neutral-800` | `border-primary-500` |

---

## Screenshots Reference

All screenshots saved to project root:
- `main-page.png` - ✅ Correct
- `hacking-page.png` - ❌ Needs fixing
- `armor-page.png` - ❌ Needs fixing
- `weapons-page.png` - ❌ Needs fixing
- `quests-page.png` - ✅ Correct
- `workshop-page.png` - ❌ Needs fixing
- `perks-page.png` - ❌ Needs fixing
- `bobbleheads-page.png` - ✅ Correct
- `magazines-page.png` - ✅ Correct
- `player-page.png` - ✅ Correct
- `theme-page.png` - ✅ Correct
