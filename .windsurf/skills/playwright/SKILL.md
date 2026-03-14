---
name: playwright
description: Guide for writing and running Playwright e2e tests for SvelteKit applications
---

# Playwright Testing Skill

## Overview
Playwright is a testing framework for end-to-end (e2e) testing of web applications. Use this skill when writing tests that verify user workflows, interactions, and visual behavior across pages.

## Setup & Configuration

### Running Tests
```bash
# Run all e2e tests
pnpm test:e2e

# Run tests in headed mode (see browser)
pnpm test:e2e --headed

# Run specific test file
pnpm test:e2e tests/e2e/hacking.test.ts

# Run tests matching pattern
pnpm test:e2e --grep "button"

# Debug mode (step through with inspector)
pnpm test:e2e --debug
```

### Configuration
Tests are configured in `playwright.config.ts`. Key settings:
- **Base URL**: `http://localhost:5173` (dev server) or `http://localhost:4173` (preview)
- **Browsers**: Chromium, Firefox, WebKit
- **Timeout**: 30 seconds per test
- **Retries**: 2 retries on CI, 0 locally

## Test Structure

### Basic Test Template
```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test("should do something", async ({ page }) => {
    // 1. Navigate to page
    await page.goto("/path");
    
    // 2. Interact with elements
    await page.click("button");
    await page.fill("input", "text");
    
    // 3. Assert expectations
    await expect(page.locator("h1")).toContainText("Expected");
  });
});
```

## Common Patterns

### Navigation
```typescript
// Navigate to a route
await page.goto("/hacking");

// Go back/forward
await page.goBack();
await page.goForward();

// Wait for navigation
await page.goto("/path");
await page.waitForURL("/new-path");
```

### Finding Elements
```typescript
// By role (preferred for accessibility)
page.getByRole("button", { name: "Submit" })
page.getByRole("textbox", { name: "Username" })
page.getByRole("heading", { level: 1 })

// By label text
page.getByLabel("Email")

// By placeholder
page.getByPlaceholder("Enter name")

// By test ID (add data-testid to HTML)
page.getByTestId("submit-button")

// CSS selector (last resort)
page.locator(".button-class")
```

### User Interactions
```typescript
// Click
await page.click("button");
await page.getByRole("button").click();

// Type text
await page.fill("input", "text");
await page.getByLabel("Email").fill("user@example.com");

// Select option
await page.selectOption("select", "option-value");

// Check/uncheck
await page.check("input[type=checkbox]");
await page.uncheck("input[type=checkbox]");

// Keyboard
await page.press("input", "Enter");
await page.keyboard.press("Escape");
```

### Assertions
```typescript
// Visibility
await expect(page.locator("h1")).toBeVisible();
await expect(page.locator(".hidden")).toBeHidden();

// Text content
await expect(page.locator("h1")).toContainText("Title");
await expect(page.locator("h1")).toHaveText("Exact Title");

// Attributes
await expect(page.locator("button")).toHaveAttribute("disabled");
await expect(page.locator("input")).toHaveValue("text");

// Count
await expect(page.locator("li")).toHaveCount(5);

// Classes
await expect(page.locator("button")).toHaveClass("active");
```

### Waiting
```typescript
// Wait for element to be visible
await page.locator("h1").waitFor({ state: "visible" });

// Wait for navigation
await page.waitForURL("/new-path");

// Wait for specific timeout
await page.waitForTimeout(1000);

// Wait for function
await page.waitForFunction(() => document.querySelectorAll("li").length > 0);
```

## ⚠️ Critical: Avoid Timeouts & Hard Waits

**Hard timeouts (`waitForTimeout`) and unnecessary waits are the #1 cause of flaky tests in CI.** They fail unpredictably across browsers and environments.

### ❌ DON'T DO THIS
```typescript
// Hard timeout - will fail randomly in CI
await page.waitForTimeout(1000);
await new Promise(r => setTimeout(r, 2000));

// Implicit waits without condition
await page.goto("/");
await page.waitForTimeout(500); // "Just in case"
await page.click("button");
```

### ✅ DO THIS INSTEAD: Use Assertions (Preferred)
```typescript
// Use assertions instead of waits - Playwright automatically waits for the condition
await expect(page.locator("success-message")).toBeVisible();

// Assertion with navigation
await page.goto("/form");
await page.click("submit");
await expect(page).toHaveURL("/success");

// Assertion for element readiness
await expect(page.getByRole("button")).toBeEnabled();
await page.getByRole("button").click();

// Assertion for text content
await expect(page.locator("h1")).toContainText("Success");
```

### Why Assertions Are Better Than Waits
**Assertions are ASSERTIVE** – they automatically wait with built-in retries until the condition is met or timeout is reached. This is safer than explicit waits because:
- Playwright retries the assertion multiple times before failing
- Works consistently across all browsers (Chromium, Firefox, WebKit)
- More readable: `expect(...).toBeVisible()` clearly states what you're testing
- No arbitrary timeouts that might work locally but fail in CI

### Why This Matters
- **Cross-browser failures**: Chromium, Firefox, and WebKit have different rendering speeds. A 1-second timeout works locally but fails in CI.
- **Flaky tests**: Hard waits create race conditions that pass sometimes and fail others.
- **Slow test suites**: Unnecessary waits add up to minutes of wasted test time.

### When Explicit Waits Are Acceptable
Only use `waitFor*` methods when you need to wait WITHOUT asserting:
- Waiting for network to settle: `waitForLoadState()` (only when absolutely necessary)
- Waiting for a function condition: `waitForFunction()` with a real condition

For navigation, use the assertion `await expect(page).toHaveURL("/path")` instead of `waitForURL()` – it provides clearer error messages and is more reliable.

In most cases, use assertions instead.

## Best Practices

### 1. Use Semantic Locators
✅ **Good**: `page.getByRole("button", { name: "Submit" })`
❌ **Bad**: `page.locator(".btn-submit")`

### 2. Test User Workflows, Not Implementation
✅ **Good**: "User can submit form and see success message"
❌ **Bad**: "Component state changes to submitted"

### 3. Keep Tests Independent
- Each test should be able to run in any order
- Don't rely on previous test state
- Use `test.beforeEach()` for setup

### 4. Use Meaningful Test Names
✅ **Good**: `test("should display error when email is invalid")`
❌ **Bad**: `test("email validation")`

### 5. Avoid Hard Waits
✅ **Good**: `await expect(page.locator("success")).toBeVisible()`
❌ **Bad**: `await page.waitForTimeout(1000)`

### 6. Test Accessibility
```typescript
// Test keyboard navigation
await page.keyboard.press("Tab");
await expect(page.locator("button")).toBeFocused();

// Test ARIA labels
await expect(page.locator("[aria-label='Close']")).toBeVisible();
```

## Example: Complete Test Suite

```typescript
import { test, expect } from "@playwright/test";

test.describe("Hacking Tool", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to tool before each test
    await page.goto("/hacking");
  });

  test("should display hacking interface", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Hacking" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Start" })).toBeVisible();
  });

  test("should start hacking sequence", async ({ page }) => {
    await page.getByRole("button", { name: "Start" }).click();
    await expect(page.locator("[data-testid='sequence']")).toBeVisible();
  });

  test("should handle incorrect guess", async ({ page }) => {
    await page.getByRole("button", { name: "Start" }).click();
    await page.getByRole("button", { name: "Wrong" }).click();
    await expect(page.getByText("Incorrect")).toBeVisible();
  });
});
```

## Debugging Tips

### 1. Use `--debug` Flag
```bash
pnpm test:e2e --debug
```
Opens Playwright Inspector to step through test.

### 2. Add Screenshots/Videos
```typescript
test("should work", async ({ page }) => {
  // ... test code ...
  await page.screenshot({ path: "screenshot.png" });
});
```

### 3. Log Page Content
```typescript
console.log(await page.content()); // Full HTML
console.log(await page.textContent()); // All text
```

### 4. Use `page.pause()`
```typescript
test("should work", async ({ page }) => {
  await page.goto("/");
  await page.pause(); // Pauses execution, open inspector
});
```

## File Organization

Tests should be organized by feature:
```
tests/e2e/
├── hacking.test.ts      # Hacking tool tests
├── armor.test.ts        # Armor workbench tests
└── weapons.test.ts      # Weapon workbench tests
```

## Checklist for Writing Tests

- [ ] Test has descriptive name
- [ ] Test is independent (can run in any order)
- [ ] Test uses semantic locators (getByRole, getByLabel, etc.)
- [ ] Test verifies user-visible behavior
- [ ] Test includes setup in `beforeEach` if needed
- [ ] Test has clear assertions
- [ ] Test passes locally with `pnpm test:e2e`
- [ ] Test doesn't use hard waits (waitForTimeout)
