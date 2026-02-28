# Fallout 4 Tools - Development Plan

## Project Overview
A web application featuring three interactive tools that replicate mechanics from Fallout 4.

---

## Tool 1: Hacking

### Purpose
Replicate Fallout 4's terminal hacking mini-game. Players input a list of candidate words and likeness values to deduce the correct password.

### Features

#### Core Functionality
- **Word Input**: Users can add/remove words from a candidate list
- **Likeness Input**: For each word, users enter the likeness value (0-N, where N is the word length)
  - Likeness = number of characters in the correct position compared to the actual password
- **Solver Logic**: Algorithm that filters candidates based on likeness constraints
- **Solution Display**: Show the deduced password or list of remaining possibilities

#### UI Components
- Text input for adding words
- Number input for likeness values
- Word list display with edit/delete options
- "Solve" button to run the solver
- Results panel showing the answer or remaining candidates
- Optional: Step-by-step solver explanation

#### Constraints & Rules
- All words must be the same length
- Likeness value must be between 0 and word length
- Solver should eliminate words that don't match the likeness constraints

#### Example Workflow
1. User enters words: ["HACK", "BACK", "PACK", "LACK"]
2. User enters likeness for "HACK": 2 (meaning 2 characters match in position)
3. User enters likeness for "BACK": 1 (meaning 1 character matches in position)
4. Solver determines the actual password based on constraints

---

## Tool 2: Armor Workbench

### Purpose
Browse and explore armor customization options available in Fallout 4's armor workbench.

### Features

#### Core Functionality
- **Armor Selection**: Dropdown or list to select armor pieces (Head, Torso, Arms, Legs, etc.)
- **Customization Options**: Display available mods for selected armor
- **Mod Details**: Show mod name, effects, material cost, and components required
- **Build Planner**: Optional feature to plan a full armor build with total material costs

#### UI Components
- Armor piece selector (dropdown or tabs)
- Customization options list with descriptions
- Mod details panel (effects, costs, requirements)
- Optional: Material cost calculator for full builds
- Optional: Armor comparison view

#### Data Structure
Each armor piece should include:
- Name
- Base stats (damage resistance, energy resistance, weight)
- Available mods (with effects and costs)
- Mod categories (paint, armor plating, etc.)

#### Example Workflow
1. User selects "Combat Armor Chest Piece"
2. App displays available mods (Heavy Armor Plating, Polished Metal, etc.)
3. User clicks on a mod to see details (effects, material costs)
4. Optional: User builds a full armor set and sees total material requirements

---

## Tool 3: Weapon Workbench

### Purpose
Browse and explore weapon customization options available in Fallout 4's weapon workbench.

### Features

#### Core Functionality
- **Weapon Selection**: Dropdown or list to select weapons (Rifles, Pistols, Melee, etc.)
- **Customization Options**: Display available mods for selected weapon
- **Mod Details**: Show mod name, effects, material cost, and components required
- **Build Planner**: Optional feature to plan a weapon build with total material costs
- **Damage Calculator**: Optional feature to show how mods affect weapon damage

#### UI Components
- Weapon selector (dropdown or tabs by weapon type)
- Customization options list with descriptions
- Mod details panel (effects, costs, requirements)
- Optional: Damage calculator showing base vs. modded damage
- Optional: Material cost calculator for full builds
- Optional: Weapon comparison view

#### Data Structure
Each weapon should include:
- Name
- Weapon type (Rifle, Pistol, Melee, etc.)
- Base stats (damage, fire rate, accuracy, weight)
- Available mods (with effects and costs)
- Mod categories (barrel, stock, scope, etc.)

#### Example Workflow
1. User selects "Assault Rifle"
2. App displays available mods (Automatic Receiver, Powerful Receiver, etc.)
3. User clicks on a mod to see details (damage increase, material costs)
4. Optional: User builds a full weapon and sees total material requirements and final damage

---

## Development Phases

### Phase 1: Project Setup
- [ ] Initialize project (Svelte/SvelteKit or React)
- [ ] Set up styling (Tailwind CSS)
- [ ] Create project structure
- [ ] Set up routing (if needed)

### Phase 2: Hacking Tool
- [ ] Create UI components (input fields, word list, solver button)
- [ ] Implement solver algorithm
- [ ] Add validation and error handling
- [ ] Create tests for solver logic

### Phase 3: Armor Workbench
- [ ] Create armor data structure
- [ ] Build UI for armor selection and mod display
- [ ] Implement mod details panel
- [ ] Add material cost calculator (optional)

### Phase 4: Weapon Workbench
- [ ] Create weapon data structure
- [ ] Build UI for weapon selection and mod display
- [ ] Implement mod details panel
- [ ] Add damage calculator (optional)
- [ ] Add material cost calculator (optional)

### Phase 5: Polish & Deployment
- [ ] Responsive design testing
- [ ] Accessibility review
- [ ] Performance optimization
- [ ] Deployment setup

---

## Questions for Clarification

1. **Tech Stack**: Would you prefer Svelte/SvelteKit (matching your other projects) or a different framework?
2. **Data Source**: Should armor/weapon data be hardcoded, loaded from a JSON file, or fetched from an API?
3. **Scope**: Should we start with all three tools or prioritize one?
4. **Styling**: Any specific color scheme or design inspiration from Fallout 4?
5. **Optional Features**: Are the optional features (calculators, comparisons) high priority?

---

## Notes
- Keep the hacking solver logic clean and well-tested
- Consider using Fallout 4's visual style/color palette for theming
- Ensure responsive design for mobile and desktop
