# Combo Box

**Purpose**: Searchable dropdown field that filters options as the user types. Supports single-select and multi-select, async data loading, and custom filter functions.

**Components**: `<sgds-combo-box>` + `<sgds-combo-box-option>`

---

## Usage

```html
<!-- Single select combo box -->
<sgds-combo-box label="Country" placeholder="Type to search...">
  <sgds-combo-box-option value="sg">Singapore</sgds-combo-box-option>
  <sgds-combo-box-option value="my">Malaysia</sgds-combo-box-option>
  <sgds-combo-box-option value="au">Australia</sgds-combo-box-option>
  <sgds-combo-box-option value="us">United States</sgds-combo-box-option>
</sgds-combo-box>

<!-- Multi-select -->
<sgds-combo-box label="Technologies" multiSelect placeholder="Select all that apply">
  <sgds-combo-box-option value="js">JavaScript</sgds-combo-box-option>
  <sgds-combo-box-option value="ts">TypeScript</sgds-combo-box-option>
  <sgds-combo-box-option value="py">Python</sgds-combo-box-option>
  <sgds-combo-box-option value="go">Go</sgds-combo-box-option>
</sgds-combo-box>

<!-- With hint text and clearable button -->
<sgds-combo-box
  label="Framework"
  hintText="Choose your frontend framework"
  clearable>
  <sgds-combo-box-option value="react">React</sgds-combo-box-option>
  <sgds-combo-box-option value="vue">Vue</sgds-combo-box-option>
  <sgds-combo-box-option value="angular">Angular</sgds-combo-box-option>
</sgds-combo-box>

<!-- Disabled option -->
<sgds-combo-box label="Status">
  <sgds-combo-box-option value="active">Active</sgds-combo-box-option>
  <sgds-combo-box-option value="inactive" disabled>Inactive (unavailable)</sgds-combo-box-option>
</sgds-combo-box>

<!-- Async loading via JavaScript -->
<sgds-combo-box id="async-cb" label="Search Users" async placeholder="Type to search...">
</sgds-combo-box>
<script>
  const comboBox = document.getElementById("async-cb");
  comboBox.addEventListener("sgds-input", async (e) => {
    const query = e.target.value;
    const results = await fetchUsers(query); // your async function
    comboBox.innerHTML = results
      .map(user => `<sgds-combo-box-option value="${user.id}">${user.name}</sgds-combo-box-option>`)
      .join("");
  });
</script>

<!-- Listen to selection -->
<sgds-combo-box id="cb" label="Select One">
  <sgds-combo-box-option value="a">Option A</sgds-combo-box-option>
  <sgds-combo-box-option value="b">Option B</sgds-combo-box-option>
</sgds-combo-box>
<script>
  document.getElementById("cb").addEventListener("sgds-select", (e) => {
    console.log("selected:", e.target.value);
  });
</script>
```

---

## `<sgds-combo-box>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `label` | string | — | Field label |
| `hintText` | string | — | Helper text below label |
| `name` | string | — | Form field name |
| `value` | string | — | Pre-selected value(s) |
| `placeholder` | string | — | Input placeholder text |
| `multiSelect` | boolean | `false` | Allow multiple selections |
| `clearable` | boolean | `false` | Show clear button |
| `badgeFullWidth` | boolean | `false` | Make badges fill full width in multiSelect mode |
| `async` | boolean | `false` | Disable built-in filtering (for async data) |
| `disabled` | boolean | `false` | Disables the field |
| `required` | boolean | `false` | Field is required |
| `hasFeedback` | boolean | `false` | Shows validation error message (pair with `invalidFeedback`) |
| `filterFunction` | function | — | Custom JS filter function — set via property |

## `<sgds-combo-box-option>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `value` | string | — | Option value |
| `disabled` | boolean | `false` | Disables the option |

## Events (`<sgds-combo-box>`)

| Event | When |
|---|---|
| `sgds-input` | User types in the search field |
| `sgds-select` | An option is selected |

---

## Notes

- Set `async` to `true` when fetching options dynamically — this disables client-side filtering.
- `filterFunction` is a JS property (not HTML attribute): `element.filterFunction = (value, query) => value.toLowerCase().includes(query.toLowerCase())`
