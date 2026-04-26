# Theming Fixes Plan

**Objective**: Ensure all UI elements in the fo4-tools app respect the global theme, maintaining visual consistency across all pages.

## Issues to Address

- [ ] **Sidebar menu icons** – Currently purple, should match text color (use global theme color)
- [ ] **Search input placeholders** – Placeholder text on quests page needs theme styling
- [ ] **Checkbox colors** – Checkboxes in lists are blue, should use global theme color
- [ ] **Perks page table** – Currently white background, should match themed styling of other pages
- [ ] **Bobblehead page** – Needs full theme styling to match rest of app
- [ ] **Magazine page** – Needs full theme styling to match rest of app

## Implementation Strategy

1. **Audit theme tokens** – Review `src/routes/layout.css` and Twintrinsic theme configuration
2. **Sidebar icons** – Update icon color classes in sidebar component to use theme color variable
3. **Input placeholders** – Apply theme-aware placeholder styling to search inputs
4. **Checkbox styling** – Verify Twintrinsic Checkbox component respects theme; apply overrides if needed
5. **Perks table** – Apply background and text color theme classes to table component
6. **Bobblehead page** – Create/update page with themed card layouts and components
7. **Magazine page** – Create/update page with themed card layouts and components
8. **Testing** – Verify all pages render consistently with theme applied

## Notes
- Prioritize using Twintrinsic components where possible
- Use Tailwind theme utilities (e.g., `text-primary`, `bg-secondary`) for consistency
- Test across light/dark theme modes if applicable
