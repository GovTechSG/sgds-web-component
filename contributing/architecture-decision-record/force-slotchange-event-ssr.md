# Force dispatch slotchange event for all slots in SSR 

## Status

Accepted

## Context

When web components are SSR, slotchange is not called in the first render/update. As a result components missed out on the initial render updates. See https://github.com/lit/lit/discussions/4697


## Decision

In SgdsElement, set up a boolean prop `ssr` which checks environment. 
When ssr is true, force dispatch a slotchange event once. This makes sure in CSR, nothing has changed.

## Consequences
 
This helps to patch the up the gap in rendering Lit components in SSR. 

## Date of proposal 

13/10/2025