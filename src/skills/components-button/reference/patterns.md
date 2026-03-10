# Button Component — Common Patterns Reference

## Basic Variants

```html
<!-- Primary action -->
<sgds-button>Save</sgds-button>

<!-- Secondary action -->
<sgds-button variant="outline">Cancel</sgds-button>

<!-- Destructive action -->
<sgds-button tone="danger">Delete Account</sgds-button>
```

## Button Group (Action Pair)

Always place the primary action on the right in a horizontal group.

```html
<div class="sgds:flex sgds:gap-2 sgds:justify-end">
  <sgds-button variant="outline">Cancel</sgds-button>
  <sgds-button variant="primary">Confirm</sgds-button>
</div>
```

## Form Submission

```html
<form id="profile-form" action="/profile" method="post">
  <input name="name" type="text" placeholder="Full name">

  <div class="sgds:flex sgds:gap-2 sgds:mt-4">
    <sgds-button type="reset" variant="ghost">Clear</sgds-button>
    <sgds-button type="submit">Save Profile</sgds-button>
  </div>
</form>
```

## Button Outside Form

```html
<form id="search-form">
  <input name="q" type="search">
</form>

<!-- Lives outside the form but still submits it via the form attribute -->
<sgds-button type="submit" form="search-form">Search</sgds-button>
```

## Loading State

Show `loading` while an async action is in progress to prevent double-submission.

```html
<sgds-button id="save-btn">Save</sgds-button>

<script>
  const btn = document.querySelector('#save-btn');
  btn.addEventListener('click', async () => {
    btn.loading = true;
    await saveData();
    btn.loading = false;
  });
</script>
```

## With Icons

```html
<!-- Icon on the left -->
<sgds-button>
  <sgds-icon slot="leftIcon" name="arrow-left"></sgds-icon>
  Back
</sgds-button>

<!-- Icon on the right -->
<sgds-button>
  Continue
  <sgds-icon slot="rightIcon" name="arrow-right"></sgds-icon>
</sgds-button>

<!-- Icons on both sides -->
<sgds-button>
  <sgds-icon slot="leftIcon" name="download"></sgds-icon>
  Download Report
  <sgds-icon slot="rightIcon" name="file-earmark-arrow-down"></sgds-icon>
</sgds-button>
```

## Link Button (Navigation)

Renders as an `<a>` element — use for navigation, not form actions.

```html
<!-- Internal navigation -->
<sgds-button href="/dashboard">Go to Dashboard</sgds-button>

<!-- External link -->
<sgds-button href="https://www.gov.sg" target="_blank">Visit Gov.sg</sgds-button>

<!-- File download -->
<sgds-button href="/files/report.pdf" download="annual-report.pdf" variant="outline">
  <sgds-icon slot="leftIcon" name="download"></sgds-icon>
  Download Report
</sgds-button>
```

## Full Width (Mobile / Stacked Layout)

```html
<sgds-button fullWidth>Sign In</sgds-button>
```

## Disabled State

```html
<sgds-button disabled>Submit</sgds-button>

<!-- Explain why to the user when not self-evident -->
<sgds-button disabled ariaLabel="Complete all required fields to submit">Submit</sgds-button>
```

## Event Handling

```html
<sgds-button id="action-btn">Perform Action</sgds-button>

<script>
  const btn = document.querySelector('#action-btn');

  btn.addEventListener('sgds-focus', () => {
    console.log('button focused');
  });

  btn.addEventListener('sgds-blur', () => {
    console.log('button blurred');
  });
</script>
```

## React Usage

For React import paths and event syntax, see **[sgds-components-setup](../../components-setup/SKILL.md)**.

The key decision: React 19+ uses the native `<sgds-button>` tag directly; React 18 and below uses the `SgdsButton` wrapper from `@govtechsg/sgds-web-component/react/button`.

## Icon-Only Buttons

For buttons with no visible text, prefer `<sgds-icon-button>` — it manages `aria-label` and sizing automatically.

```html
<!-- ✅ Prefer this -->
<sgds-icon-button name="x-lg" ariaLabel="Close"></sgds-icon-button>

<!-- ❌ Avoid — manual aria management required -->
<sgds-button ariaLabel="Close">
  <sgds-icon slot="leftIcon" name="x-lg"></sgds-icon>
</sgds-button>
```
