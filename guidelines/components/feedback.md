# Feedback Components

Components that communicate system state, validation results, and loading: alert, toast, system banner, badge, spinner, skeleton, and progress bar.

---

## When to Use Which

| Need | Component |
|---|---|
| Inline page feedback (success, error, warning, info) | `<sgds-alert>` |
| Brief non-blocking overlay notification | `<sgds-toast>` |
| Global page-level message (maintenance, outage) | `<sgds-system-banner>` |
| Status label on a record or item | `<sgds-badge>` |
| Content loading or async action in progress | `<sgds-spinner>` |
| Placeholder while content loads (skeleton screens) | `<sgds-skeleton>` |
| Progress through a multi-step process | `<sgds-progress-bar>` |

---

## `<sgds-alert>` — Inline Contextual Feedback

Use for messages directly related to content on the current page. Appears inline, near the relevant section.

**When NOT to use:**
- Interruptive critical decisions → use `<sgds-modal>`
- Global messaging → use `<sgds-system-banner>`
- Brief auto-dismiss notifications → use `<sgds-toast>`

```jsx
{/* Info alert */}
<sgds-alert show variant="info" title="Application Received">
  <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
  <div>Your application has been submitted. <sgds-alert-link href="/status">Track status</sgds-alert-link></div>
</sgds-alert>

{/* Success alert */}
<sgds-alert show variant="success" title="Changes Saved">
  <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
  <div>Your profile has been updated successfully.</div>
</sgds-alert>

{/* Error alert */}
<sgds-alert show variant="danger" title="Submission Failed">
  <sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
  <div>Please fix the errors below before submitting.</div>
</sgds-alert>

{/* Warning alert */}
<sgds-alert show variant="warning" title="Session Expiring">
  <sgds-icon slot="icon" name="exclamation-triangle-fill"></sgds-icon>
  <div>Your session will expire in 5 minutes.</div>
</sgds-alert>

{/* Dismissible alert */}
<sgds-alert show variant="info" title="New Feature Available" dismissible>
  <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
  <div>Check out the new dashboard view.</div>
</sgds-alert>

{/* Outlined (lower emphasis) */}
<sgds-alert show variant="info" title="Note" outlined>
  <div>This is a supporting informational message.</div>
</sgds-alert>
```

**Key rules:**
- `show` must be set to `true` for the alert to be visible
- Use `<sgds-alert-link>` (not `<a>`) for any link inside the alert body
- `title` accepts plain text only — no HTML
- Icon slot is optional; omit for a text-only alert
- Severity stacking order: Danger > Warning > Info > Success > Neutral

**Variant decision:**

| Context | `variant` |
|---|---|
| Informational | `info` (default) |
| Positive / completed | `success` |
| Error / destructive | `danger` |
| Caution | `warning` |
| Neutral / subdued | `neutral` |

---

## `<sgds-toast>` and `<sgds-toast-container>` — Overlay Notifications

Use for brief, non-blocking notifications triggered by user actions or system events. Always wrap toasts in `<sgds-toast-container>` to position them correctly.

```jsx
{/* Toast container — position once in your app layout */}
<sgds-toast-container position="bottom-end">
  <sgds-toast
    title="File Uploaded"
    show
    autohide
    delay={5000}
  >
    <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
    <div>report.pdf has been uploaded successfully.</div>
  </sgds-toast>
</sgds-toast-container>
```

**Container positions:** `top-start`, `top-center`, `top-end`, `bottom-start`, `bottom-center`, `bottom-end`.

---

## `<sgds-system-banner>` — Global Page Banner

Use for site-wide or page-level announcements — maintenance windows, service outages, important notices.

```jsx
<sgds-system-banner variant="warning" show dismissible>
  Scheduled maintenance on 15 Jan 2025, 2–4am. Some services may be unavailable.
</sgds-system-banner>
```

Place at the very top of the page, above `<sgds-masthead>`.

---

## `<sgds-badge>` — Status and Category Label

Use to highlight status, category, or short descriptive metadata on records, cards, and table rows.

```jsx
{/* Status badges */}
<sgds-badge variant="success">Active</sgds-badge>
<sgds-badge variant="danger">Rejected</sgds-badge>
<sgds-badge variant="warning">Pending</sgds-badge>
<sgds-badge variant="neutral">Draft</sgds-badge>
<sgds-badge variant="accent">In Review</sgds-badge>

{/* Outlined style */}
<sgds-badge variant="primary" outlined>Featured</sgds-badge>

{/* Dismissible tag */}
<sgds-badge dismissible onsgds-dismiss={handleDismiss}>TypeScript</sgds-badge>
```

**Variant decision:**

| Status | `variant` |
|---|---|
| Active, approved, complete | `success` |
| Error, rejected, failed | `danger` |
| Pending, caution | `warning` |
| Draft, inactive, neutral | `neutral` |
| In progress, informational | `accent` |
| Brand, featured | `primary` |

---

## `<sgds-spinner>` — Loading Indicator

Use to communicate that content is loading or an action is processing.

```jsx
{/* Default */}
<sgds-spinner></sgds-spinner>

{/* With label */}
<sgds-spinner>Loading…</sgds-spinner>

{/* Sizes: xs | sm | md (default) | lg | xl */}
<sgds-spinner size="lg"></sgds-spinner>

{/* On a dark/primary background */}
<div class="sgds:bg-primary-default sgds:p-4">
  <sgds-spinner tone="fixed-light"></sgds-spinner>
</div>
```

---

## `<sgds-skeleton>` — Loading Placeholder

Use for skeleton screens — placeholder shapes that appear while content loads. Prevents layout shift.

```jsx
{/* Text line placeholder */}
<sgds-skeleton></sgds-skeleton>

{/* Simulate a card loading state */}
<div class="sgds:flex sgds:flex-col sgds:gap-component-sm">
  <sgds-skeleton width="60%" height="20px"></sgds-skeleton>
  <sgds-skeleton width="100%" height="16px"></sgds-skeleton>
  <sgds-skeleton width="80%" height="16px"></sgds-skeleton>
</div>
```

---

## `<sgds-progress-bar>` — Step or Task Progress

Use to show progress through a multi-step process or the completion percentage of a task.

```jsx
<sgds-progress-bar value="65" max="100" label="Step 3 of 5"></sgds-progress-bar>
```

**Variants:** `primary` (default), `success`, `danger`, `warning`.
