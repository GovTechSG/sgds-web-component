# Defer Slot Detection Until Hydration and Add SSR Props

## Status

Accepted

## Context

During server-side rendering (SSR), the `HasSlotController` relies on browser APIs, which are not available in the SSR environment.
When the controller attempts to check for slotted content on the server, it can cause rendering inconsistencies, timeouts in tests, or unexpected client-side mismatches upon hydration.

We need a reliable way to indicate whether a slot is present during SSR without executing browser-only logic, while ensuring that normal slot detection still works after hydration on the client.

## Decision

We introduce dedicated SSR indicator properties (e.g., `hasTitleSlot`, `hasDescriptionSlot`, `hasImageSlot`, etc.) that are set during SSR to represent slot presence.
`HasSlotController` checks are deferred and only executed after the component has hydrated (i.e., on the client, in lifecycle methods like `updated`).
This ensures that SSR markup generation is deterministic, while maintaining full reactivity and slot awareness post-hydration.

## Consequences

Easier:

- SSR rendering becomes stable and predictable.
- No more timeouts or slot detection errors in SSR or test environments.
- Client-side hydration now updates slot state safely once the DOM is interactive.

More difficult:

- Developers must maintain two mechanisms for slot detection: SSR props and runtime detection.
- SSR pipelines need to predefine slot-related properties when rendering components server-side.

## Date of proposal

07/10/2025
