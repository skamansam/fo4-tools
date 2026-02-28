# AGENTS

## Mission
Fallout 4 Tools is a specialized Svelte/SvelteKit application that showcases practical use cases for the Twintrinsic component library. This project demonstrates how to build feature-rich tools (hacking solver, armor workbench, weapon workbench) while validating Twintrinsic components in real-world scenarios. Changes should maintain a clean, focused codebase that exercises Twintrinsic's capabilities while providing genuine utility to users.

## Core Responsibilities
1. **Tool development** – Build and refine the three core tools (Hacking, Armor Workbench, Weapon Workbench) using Twintrinsic components and Tailwind 4 utilities.
2. **Component validation** – Test Twintrinsic components in realistic scenarios, report issues, and provide feedback to the upstream library.
3. **Data management** – Maintain clean JSON data structures for armor and weapon customization options; ensure data accuracy and completeness.
4. **Testing coverage** – Add Playwright e2e tests for each tool's core workflows; maintain a fast, meaningful test baseline.
5. **Tooling & config** – Keep Vite, SvelteKit, Tailwind 4, and Twintrinsic integration smooth; resolve path aliases and dependency issues as they arise.

## Toolbelt & Scripts
Use `pnpm` (preferred) or `npm` to run the scripts below:

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Run the Vite-powered SvelteKit dev server for local iteration. |
| `pnpm build` / `pnpm preview` | Produce and inspect the optimized bundle before publishing. |
| `pnpm check` | `svelte-check` type/diagnostic sweep synced with the repo tsconfig. |
| `pnpm test:e2e` | Run Playwright tests; keep a fast, meaningful baseline. |
| `pnpm test` | Run all tests (currently e2e only). |

## Project Structure

```
fo4-tools/
├── src/
│   ├── lib/
│   │   ├── data/
│   │   │   ├── armor.json        # Armor pieces and mods
│   │   │   └── weapons.json      # Weapons and mods
│   │   └── index.ts
│   ├── routes/
│   │   ├── +layout.svelte        # Main layout with Twintrinsic App/Sidebar
│   │   ├── +page.svelte          # Home page
│   │   ├── hacking/
│   │   │   └── +page.svelte      # Hacking tool
│   │   ├── armor/
│   │   │   └── +page.svelte      # Armor workbench
│   │   └── weapons/
│   │       └── +page.svelte      # Weapon workbench
│   └── app.html
├── tests/
│   └── e2e/
│       ├── hacking.test.ts
│       ├── armor.test.ts
│       └── weapons.test.ts
├── PLAN.md                        # Feature specifications
├── AGENTS.md                      # This file
└── README.md
```

## Collaboration Guidelines
- **Twintrinsic-first**: Prefer Twintrinsic components (Button, Card, Input, etc.) over custom HTML. Report any component gaps or issues.
- **Data-driven**: Keep tool logic separate from UI. Use JSON files for armor/weapon data; load and transform as needed.
- **Testing discipline**: Add Playwright e2e tests for new tool features. Test user workflows, not implementation details.
- **Clean commits**: Small, focused commits with clear messages. Link to PLAN.md items when applicable.
- **Fallout 4 accuracy**: Verify armor/weapon data against in-game sources; document any simplifications or omissions.

## Suggested Agent Workflow
1. **Sync + install** – `pnpm install`, ensure `pnpm check` passes, verify Twintrinsic path alias works.
2. **Plan** – Review PLAN.md for the tool being worked on; outline feature delta and test strategy.
3. **Implement** – Develop in `src/routes/…`, using Twintrinsic components and Tailwind 4 utilities.
4. **Validate** – Run `pnpm check`, test locally with `pnpm dev`, add Playwright e2e tests.
5. **Document** – Update PLAN.md progress, add inline comments for complex logic, commit with clear message.
6. **Review readiness** – Ensure tests pass, no type errors, and Twintrinsic components are used idiomatically.

## Twintrinsic Integration Notes
- **Path aliases**: Vite is configured to resolve `twintrinsic` to the local library at `../twintrinsic/src/lib/index.ts`.
- **Watch mode**: Vite watches both `src/` and `../twintrinsic/` for changes; hot reload should work across both projects.
- **Component imports**: Import from `twintrinsic` directly (e.g., `import { Button, Card } from 'twintrinsic'`).
- **Icon system**: Use Twintrinsic's Icon component with Iconify icons; configure iconset via `setIconset()` if needed.
- **Theme tokens**: Tailwind 4 theme tokens are defined in `src/routes/layout.css` using `@theme`; available as both CSS variables and Tailwind utilities.

## Common Tasks

### Adding a new tool feature
1. Update PLAN.md with feature spec.
2. Create/update route in `src/routes/{tool}/+page.svelte`.
3. Add Playwright test in `tests/e2e/{tool}.test.ts`.
4. Use Twintrinsic components (Button, Card, Input, etc.) for UI.
5. Load data from JSON if applicable.
6. Run `pnpm dev` to test locally.
7. Commit with message like: "feat: Add {feature} to {tool} tool".

### Adding armor/weapon data
1. Edit `src/lib/data/armor.json` or `src/lib/data/weapons.json`.
2. Verify structure matches existing entries.
3. Test in the respective tool page.
4. Commit with message like: "data: Add {item} to {armor|weapons} data".

### Debugging Twintrinsic issues
1. Check if the issue is in fo4-tools or Twintrinsic by testing the component in Twintrinsic's Storybook.
2. If in Twintrinsic, file an issue or PR in the upstream repo.
3. If in fo4-tools, check component props, event handlers, and Tailwind class application.
4. Use browser DevTools to inspect rendered HTML and CSS.

## Communication
- Prefer GitHub issues for bugs or feature requests.
- Use PR descriptions to link to PLAN.md items and explain changes.
- Flag blockers early with reproduction steps and error output.
- When reporting Twintrinsic issues, include component name, props used, and expected vs. actual behavior.

## Notes
- Keep the app lightweight and focused on the three core tools.
- Validate Fallout 4 data accuracy; document any game mechanics simplifications.
- Test across breakpoints if UI is responsive.
- Ensure accessibility: semantic HTML, ARIA labels, keyboard navigation where applicable.
