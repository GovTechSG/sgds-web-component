# SSR Fix Attempts — NavElement willUpdate

## The Problem

`nav-element.ts` line 89: `this.breakpointReached = window.innerWidth < SIZES[this.expand]` in `willUpdate()` crashes during SSR with "window is not defined".

## What We Tried

### Attempt 1: Guard willUpdate + flip consumer defaults to false

**Changes:**
- `nav-element.ts`: wrapped `willUpdate` body with `if (typeof window !== "undefined")`
- Flipped `_breakpointReached` default from `true` to `false` in:
  - `sgds-mainnav-dropdown.ts`
  - `sgds-mainnav-profile.ts`
  - `sgds-appnav-profile.ts`
  - `nav-profile-element.ts`

**Result:** SSR error gone. Desktop view works. But **mobile view broken** — `mainnav-dropdown` stayed in desktop view even at mobile breakpoint. The consumer default of `false` (desktop) meant the context never pushed an update because the provider also defaults to `false`, so consumers never received the `true` (mobile) value when they should have.

### Attempt 2: Move breakpoint calc to firstUpdated

**Changes:**
- Removed `willUpdate` entirely
- Added `this.breakpointReached = window.innerWidth < SIZES[this.expand]` as first line of `firstUpdated`

**Result:** Same problem as Attempt 1. `firstUpdated` runs after the first render, so the initial render uses `breakpointReached = false` (default). The context provider `_breakpointReached` is also `false` by default, so `_onBreakpointReached(false)` in `_handleResize` doesn't trigger a context change. Consumers stuck on their defaults.

### Attempt 3: Move breakpoint calc to updated()

**Changes:**
- Put `this.breakpointReached = window.innerWidth < SIZES[this.expand]` in `updated()` instead of `willUpdate()`

**Result:** `updated()` runs after render (client-side only), so it avoids the SSR crash. But same consumer default problem — mobile view broken.

## Why Consumer Defaults Matter

The context flow:
1. `NavElement` (base) has `breakpointReached` (used in its own render template)
2. `SgdsMainnav` has `_breakpointReached` (context provider, default `false`)
3. `SgdsMainnavDropdown` has `_breakpointReached` (context consumer, default `true`)
4. `_handleResize()` calls `_onBreakpointReached(value)` which sets the provider's `_breakpointReached`

When provider default = `false` and consumer default = `true`:
- Desktop: provider stays `false`, consumer gets `false` from context on connection -> desktop view (correct)
- Mobile: provider gets set to `true` via `_onBreakpointReached(true)` -> context pushes `true` to consumer (correct)

When we flipped consumer defaults to `false`:
- Desktop: everything `false`, no context push needed (correct)
- Mobile: `_handleResize` detects breakpoint, sets provider to `true`... but something in the context propagation timing broke and the consumer didn't pick up the change during initial render cycle

## Key Insight

The consumer default of `true` is load-bearing for mobile-first rendering. Changing it breaks mobile view. But `willUpdate` running on the server causes the SSR crash.

## Current State (after git reset)

Back to commit `3ee8fc42` — visually correct on both mobile and desktop, but `willUpdate` still crashes on SSR.

## Still To Try

- Guard `willUpdate` with `typeof window` but KEEP consumer defaults as `true` (don't flip them). The SSR server HTML will render mobile layout from the consumers, but on the client `willUpdate` runs before first render and sets the correct value. Hydration should reconcile. Need to test if this causes hydration mismatch warnings.
- Use Lit's `isServer` import instead of `typeof window`
- Move the breakpoint logic entirely into `_handleResize` and ensure it force-pushes context even when value doesn't change (e.g., temporarily set to opposite then back, or use `requestUpdate` with property key)

## Separate Issue: Hydration Mismatch in mainnav-dropdown

`_handleSlotChange` and `_handleDesktopSlotChange` in `sgds-mainnav-dropdown.ts` mutate light DOM `<a>` elements (setting `href="javascript:void(0)"` and `tabindex="-1"` on disabled items). Server HTML has the original href, client rewrites it — causing React hydration mismatch warnings. Fix: add `if (this.ssr) return;` guard (same pattern as breadcrumb/link/sidenav-link fix in commit `eaf0eadb`).
