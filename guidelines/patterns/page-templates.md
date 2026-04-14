# Page Templates

Ready-to-use full-page recipes. Every template builds on the Application Shell — always include `<sgds-masthead>`, `<sgds-mainnav>`, and `<sgds-footer>` on every page.

---

## Quick Decision Guide

| What you're building | Template |
|---|---|
| Internal tool, admin portal, analytics dashboard | Dashboard |
| Login / sign-in / authentication | Login |
| Settings, profile, multi-section data entry | Form Page |
| Record list with search, filters, pagination | List Page |
| Agency profile, team intro, achievements | About Us |

---

## Visual Hierarchy Principles

Apply these to all templates:

**1. Layer backgrounds to create depth**
- Page canvas: `sgds:bg-surface-default`
- Cards / panels: `sgds:bg-surface-raised` (lifts off the page)
- Nested panels: `sgds:bg-surface-overlay` (use sparingly)

**2. Use semantic spacing — never raw numbers**
- Between page sections: `sgds:gap-layout-md`
- Section padding: `sgds:p-layout-md`
- Inside a card: `sgds:p-component-md`
- Between card rows: `sgds:gap-component-sm`

**3. Card anatomy**
Every card: `sgds:p-component-md` padding, `sgds:gap-layout-md` row gap, `sgds:rounded-lg` radius, `sgds:shadow-1` shadow.

**4. Action hierarchy**
- Primary action → `<sgds-button variant="primary">`
- Secondary / cancel → `<sgds-button variant="outline">`
- Destructive → `<sgds-button tone="danger">`

**5. Muted labels, prominent values** (stat cards, description lists)
- Label: `sgds:text-label-sm sgds:text-muted`
- Value: `sgds:text-heading-md sgds:font-semibold sgds:text-default`

---

## Dashboard Template

**Use for:** internal tools, admin portals, operations dashboards, analytics views.

**Layout:** Sidebar App (`sgds-container-sidebar`) with sticky top bar.

**Structure:**
1. Sticky header (masthead + mainnav)
2. Sidebar column (`<sgds-sidenav>` or `<sgds-sidebar>`)
3. Main content area:
   - Page header with title + primary action (e.g. Export)
   - Stat cards row (4-column grid)
   - Chart section (ECharts — see [data-visualisation.md](../data-visualisation.md))
   - Data table with search and filter bar
   - Pagination footer

```jsx
{/* Stat card row */}
<div className="sgds-grid">
  {["Total", "Active", "Pending", "Rejected"].map((label, i) => (
    <div key={i} className="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3">
      <div className="sgds:bg-surface-raised sgds:rounded-lg sgds:p-component-md sgds:shadow-1">
        <div className="sgds:text-label-sm sgds:text-muted">{label}</div>
        <div className="sgds:text-heading-lg sgds:font-semibold sgds:text-default">1,248</div>
      </div>
    </div>
  ))}
</div>
```

---

## Login Template

**Use for:** sign-in, sign-up, forgot password, OTP verification.

**Layout:** Simple App — centred card on full-height background.

**Structure:**
1. App branding (logo + name)
2. Auth card:
   - Card title ("Sign In")
   - Email and password inputs
   - Primary submit button (full width)
   - Divider with "or" label
   - SSO option (e.g. Singpass)
   - Sign-up / forgot password link

```jsx
<div className="sgds:min-h-screen sgds:flex sgds:items-center sgds:justify-center sgds:bg-surface-default sgds:p-layout-md">
  <div className="sgds:w-full sgds:max-w-md">

    {/* Branding */}
    <div className="sgds:text-center sgds:mb-8">
      <h1 className="sgds:text-heading-lg sgds:font-bold">MyApp</h1>
      <p className="sgds:text-body-md sgds:text-muted">Sign in to your account</p>
    </div>

    {/* Auth card */}
    <div className="sgds:bg-surface-raised sgds:rounded-lg sgds:p-component-lg sgds:shadow-1">
      <form id="login-form" className="sgds:flex sgds:flex-col sgds:gap-component-sm">
        <sgds-input type="email" label="Email" name="email" required hasFeedback="both"></sgds-input>
        <sgds-input type="password" label="Password" name="password" required hasFeedback="both"></sgds-input>
        <sgds-button type="submit" fullWidth>Sign In</sgds-button>
      </form>

      <sgds-divider className="sgds:my-6">or sign in with</sgds-divider>

      <sgds-button variant="outline" fullWidth href="/auth/singpass">
        <sgds-icon slot="leftIcon" name="person-badge"></sgds-icon>
        Sign in with Singpass
      </sgds-button>

      <p className="sgds:text-body-sm sgds:text-center sgds:mt-4 sgds:text-muted">
        Don't have an account? <sgds-link href="/register">Sign up</sgds-link>
      </p>
    </div>

  </div>
</div>
```

---

## Form Page Template

**Use for:** settings pages, profile editing, entity creation with multiple form sections.

**Layout:** Simple App — 3-column grid with description column (1/3) and input column (2/3).

**Structure:**
1. Page header with title + Cancel/Save action pair (duplicated at bottom)
2. Sections, each with:
   - Left column: section title + description text
   - Right column: form inputs
3. `<sgds-divider>` between sections

```jsx
{/* Section layout */}
<div className="sgds-grid sgds:gap-layout-md">
  {/* Description column */}
  <div className="sgds-col-4 sgds-col-lg-4">
    <h2 className="sgds:text-heading-sm sgds:font-semibold">Personal Information</h2>
    <p className="sgds:text-body-md sgds:text-muted">Your name and contact details as registered.</p>
  </div>

  {/* Input column */}
  <div className="sgds-col-4 sgds-col-lg-8">
    <div className="sgds:bg-surface-raised sgds:rounded-lg sgds:p-component-md sgds:shadow-1">
      <div className="sgds:flex sgds:flex-col sgds:gap-component-sm">
        {/* Side-by-side fields */}
        <div className="sgds:grid sgds:grid-cols-2 sgds:gap-component-sm">
          <sgds-input label="First Name" name="firstName" required></sgds-input>
          <sgds-input label="Last Name" name="lastName" required></sgds-input>
        </div>
        <sgds-input type="email" label="Email Address" name="email" required></sgds-input>
        <sgds-select label="Country" name="country">
          <sgds-select-option value="sg">Singapore</sgds-select-option>
        </sgds-select>
      </div>
    </div>
  </div>
</div>
```

---

## List Page Template

**Use for:** record index pages, approval queues, search results, entity management.

**Layout:** Simple App (public) or Sidebar App (admin/internal).

**Structure:**
1. Page header with record count + "New Record" CTA button
2. Search and filter bar (search input + status/type dropdowns)
3. Data table with header background
4. Empty state (when no results)
5. Pagination footer with record count

```jsx
{/* Page header */}
<div className="sgds:flex sgds:items-center sgds:justify-between sgds:mb-layout-md">
  <div>
    <h1 className="sgds:text-heading-lg sgds:font-bold">Applications</h1>
    <p className="sgds:text-body-md sgds:text-muted">1,248 records</p>
  </div>
  <sgds-button href="/applications/new">
    <sgds-icon slot="leftIcon" name="plus-circle"></sgds-icon>
    New Application
  </sgds-button>
</div>

{/* Search + filter bar */}
<div className="sgds:flex sgds:gap-component-sm sgds:mb-layout-sm">
  <sgds-input type="search" label="" name="search" placeholder="Search by name or ID" className="sgds:flex-1">
    <sgds-icon-button slot="action" variant="ghost" name="search"></sgds-icon-button>
  </sgds-input>
  <sgds-select label="" name="status">
    <sgds-select-option value="">All Statuses</sgds-select-option>
    <sgds-select-option value="active">Active</sgds-select-option>
    <sgds-select-option value="pending">Pending</sgds-select-option>
  </sgds-select>
</div>

{/* Data table */}
<sgds-table>
  <sgds-table-row slot="header">
    <sgds-table-head>Name</sgds-table-head>
    <sgds-table-head>Status</sgds-table-head>
    <sgds-table-head>Date</sgds-table-head>
    <sgds-table-head>Actions</sgds-table-head>
  </sgds-table-row>
  {/* ... rows */}
</sgds-table>

{/* Pagination */}
<div className="sgds:flex sgds:items-center sgds:justify-between sgds:mt-layout-sm">
  <p className="sgds:text-body-sm sgds:text-muted">Showing 1–10 of 1,248</p>
  <sgds-pagination dataLength={1248} itemsPerPage={10} currentPage={1}></sgds-pagination>
</div>
```
