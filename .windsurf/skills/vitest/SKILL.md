---
name: vitest
description: Guide for writing Vitest unit tests for Svelte components and utilities
---

# Vitest Testing Skill

## Overview
Vitest is a unit testing framework optimized for Vite projects. Use this skill when writing tests for individual components, utilities, and functions in isolation.

## Setup & Configuration

### Running Tests
```bash
# Run all unit tests
pnpm test:unit

# Run tests in watch mode (re-run on file changes)
pnpm test:unit --watch

# Run specific test file
pnpm test:unit tests/unit/Input.test.ts

# Run tests matching pattern
pnpm test:unit --grep "button"

# Run with coverage report
pnpm test:unit --coverage

# Debug mode (open inspector)
pnpm test:unit --inspect-brk
```

### Configuration
Tests are configured in `vitest.config.ts`. Key settings:
- **Environment**: `jsdom` (browser-like environment for DOM testing)
- **Globals**: `true` (no need to import `describe`, `it`, `expect`)
- **Coverage**: Configured to track statement, branch, function, and line coverage

## Test Structure

### Basic Test Template
```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import Component from "$lib/components/Component/Component.svelte";

describe("Component", () => {
  it("should render with default props", () => {
    render(Component);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should handle prop changes", () => {
    const { component } = render(Component, { props: { label: "Click me" } });
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

## Common Patterns

### Testing Svelte Components

#### Rendering Components
```typescript
import { render } from "@testing-library/svelte";
import Component from "$lib/components/Component/Component.svelte";

// Basic render
render(Component);

// With props
render(Component, {
  props: {
    label: "Submit",
    disabled: false,
  },
});

// With slots
render(Component, {
  slots: {
    default: "Slot content",
  },
});
```

#### Querying Elements
```typescript
import { screen } from "@testing-library/svelte";

// By role (preferred for accessibility)
screen.getByRole("button", { name: "Submit" })
screen.getByRole("textbox", { name: "Username" })
screen.getByRole("heading", { level: 1 })

// By label text
screen.getByLabelText("Email")

// By placeholder
screen.getByPlaceholderText("Enter name")

// By test ID
screen.getByTestId("submit-button")

// By text content
screen.getByText("Click me")

// Query variants (don't throw if not found)
screen.queryByRole("button")
screen.queryByText("Not found")

// Find variants (async, waits for element)
await screen.findByRole("button")
```

#### User Interactions
```typescript
import { fireEvent } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

// Preferred: userEvent (simulates real user behavior)
const user = userEvent.setup();
await user.click(button);
await user.type(input, "text");
await user.selectOptions(select, "option-value");

// Legacy: fireEvent (direct event dispatch)
fireEvent.click(button);
fireEvent.change(input, { target: { value: "text" } });
```

#### Testing Props & Events
```typescript
it("should call callback when clicked", async () => {
  const handleClick = vi.fn();
  render(Component, {
    props: {
      onClick: handleClick,
    },
  });

  const button = screen.getByRole("button");
  await userEvent.click(button);

  expect(handleClick).toHaveBeenCalledOnce();
  expect(handleClick).toHaveBeenCalledWith(expect.any(Event));
});

it("should update when props change", async () => {
  const { component } = render(Component, {
    props: { label: "Initial" },
  });

  expect(screen.getByText("Initial")).toBeInTheDocument();

  await component.$set({ label: "Updated" });

  expect(screen.getByText("Updated")).toBeInTheDocument();
});
```

### Testing Utilities & Functions

#### Basic Function Tests
```typescript
import { describe, it, expect } from "vitest";
import { add, multiply } from "$lib/utils/math";

describe("Math utilities", () => {
  it("should add two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("should multiply two numbers", () => {
    expect(multiply(2, 3)).toBe(6);
  });

  it("should handle edge cases", () => {
    expect(add(0, 0)).toBe(0);
    expect(multiply(0, 5)).toBe(0);
  });
});
```

#### Testing Async Functions
```typescript
it("should fetch data", async () => {
  const data = await fetchUser(1);
  expect(data.id).toBe(1);
  expect(data.name).toBeDefined();
});

it("should handle errors", async () => {
  await expect(fetchUser(-1)).rejects.toThrow("Invalid ID");
});
```

#### Mocking Functions
```typescript
import { vi } from "vitest";

it("should call API", async () => {
  const mockFetch = vi.fn().mockResolvedValue({ ok: true });
  global.fetch = mockFetch;

  await myFunction();

  expect(mockFetch).toHaveBeenCalledWith("/api/data");
});

it("should handle API errors", async () => {
  const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));
  global.fetch = mockFetch;

  await expect(myFunction()).rejects.toThrow("Network error");
});
```

### Setup & Teardown

#### Before/After Hooks
```typescript
describe("Component", () => {
  let component;

  beforeEach(() => {
    // Run before each test
    component = render(Component);
  });

  afterEach(() => {
    // Run after each test
    vi.clearAllMocks();
  });

  it("should work", () => {
    expect(component).toBeDefined();
  });
});
```

#### Setup Once
```typescript
describe("Database tests", () => {
  beforeAll(async () => {
    // Run once before all tests
    await setupDatabase();
  });

  afterAll(async () => {
    // Run once after all tests
    await teardownDatabase();
  });
});
```

## Assertions

### Common Assertions
```typescript
// Equality
expect(value).toBe(5);                    // Strict equality (===)
expect(value).toEqual({ a: 1 });          // Deep equality
expect(value).toStrictEqual({ a: 1 });    // Strict deep equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(5);
expect(value).toBeGreaterThanOrEqual(5);
expect(value).toBeLessThan(5);
expect(value).toBeLessThanOrEqual(5);
expect(value).toBeCloseTo(0.3, 5);        // Floating point

// Strings
expect(text).toContain("substring");
expect(text).toMatch(/regex/);

// Arrays
expect(array).toContain("item");
expect(array).toHaveLength(3);
expect(array).toEqual([1, 2, 3]);

// Objects
expect(obj).toHaveProperty("key");
expect(obj).toHaveProperty("key", "value");

// Functions
expect(fn).toThrow();
expect(fn).toThrow("error message");
expect(fn).toThrow(CustomError);

// Mocks
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledOnce();
expect(mockFn).toHaveBeenCalledWith(arg1, arg2);
expect(mockFn).toHaveBeenCalledTimes(3);
expect(mockFn).toHaveReturnedWith(value);

// DOM
expect(element).toBeInTheDocument();
expect(element).toBeVisible();
expect(element).toBeDisabled();
expect(element).toHaveAttribute("aria-label", "Close");
expect(element).toHaveClass("active");
expect(element).toHaveTextContent("Click me");
expect(element).toHaveValue("text");
```

## Best Practices

### 1. Test Behavior, Not Implementation
✅ **Good**: "Button should be disabled when form is invalid"
❌ **Bad**: "Component state property isDisabled should be true"

### 2. Use Semantic Queries
✅ **Good**: `screen.getByRole("button", { name: "Submit" })`
❌ **Bad**: `screen.getByTestId("btn-submit")`

### 3. Keep Tests Focused
- One assertion per test (or related assertions)
- Test one behavior per test
- Use descriptive test names

### 4. Avoid Implementation Details
```typescript
// ❌ Bad - testing internal state
expect(component.state.isOpen).toBe(true);

// ✅ Good - testing visible behavior
expect(screen.getByText("Modal content")).toBeVisible();
```

### 5. Use User Events Over Fire Events
```typescript
// ❌ Bad - doesn't simulate real user behavior
fireEvent.click(button);

// ✅ Good - simulates actual user interaction
const user = userEvent.setup();
await user.click(button);
```

### 6. Mock External Dependencies
```typescript
// ✅ Good - isolate component logic
vi.mock("$lib/api", () => ({
  fetchData: vi.fn().mockResolvedValue({ data: [] }),
}));
```

## Example: Complete Test Suite

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import Button from "$lib/components/Button/Button.svelte";

describe("Button Component", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render with label", () => {
    render(Button, { props: { label: "Click me" } });
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("should be disabled when disabled prop is true", () => {
    render(Button, { props: { label: "Click", disabled: true } });
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should call onClick callback when clicked", async () => {
    const handleClick = vi.fn();
    render(Button, {
      props: {
        label: "Click",
        onClick: handleClick,
      },
    });

    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    render(Button, {
      props: {
        label: "Click",
        disabled: true,
        onClick: handleClick,
      },
    });

    await user.click(screen.getByRole("button"));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should apply custom class", () => {
    render(Button, {
      props: {
        label: "Click",
        class: "custom-class",
      },
    });

    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });
});
```

## Coverage Goals

Aim for meaningful coverage:
- **Statements**: >80%
- **Branches**: >75%
- **Functions**: >80%
- **Lines**: >80%

Focus on testing critical paths and edge cases, not just hitting coverage numbers.

## File Organization

Tests should mirror component structure:
```
src/lib/components/
├── Button/
│   ├── Button.svelte
│   └── Button.test.ts

tests/unit/
├── Button.test.ts
├── Input.test.ts
└── utils/
    └── math.test.ts
```

## Checklist for Writing Tests

- [ ] Test has descriptive name
- [ ] Test uses semantic queries (getByRole, getByLabel, etc.)
- [ ] Test verifies user-visible behavior
- [ ] Test is independent (can run in any order)
- [ ] External dependencies are mocked
- [ ] Uses userEvent instead of fireEvent
- [ ] Test passes locally with `pnpm test:unit`
- [ ] Coverage is meaningful (not just hitting percentages)
- [ ] No hardcoded delays or timeouts
- [ ] Cleanup happens automatically (no manual cleanup needed)
