# Datepicker

**Purpose**: Calendar date picker for selecting a single date or a date range. Value format is `DD/MM/YYYY`.

**Component**: `<sgds-datepicker>`

---

## Usage

```html
<!-- Single date picker -->
<sgds-datepicker
  label="Appointment Date"
  name="appointment"
  placeholder="DD/MM/YYYY">
</sgds-datepicker>

<!-- Date range picker -->
<sgds-datepicker
  label="Leave Period"
  name="leave"
  mode="range">
</sgds-datepicker>

<!-- Pre-set a value -->
<sgds-datepicker
  label="Date of Birth"
  name="dob"
  value="15/06/1990">
</sgds-datepicker>

<!-- Restrict selectable dates -->
<sgds-datepicker
  label="Event Date"
  name="event-date"
  minDate="2024-01-01"
  maxDate="2024-12-31">
</sgds-datepicker>

<!-- Drop direction -->
<sgds-datepicker label="Drop Up" drop="up"></sgds-datepicker>
<sgds-datepicker label="Drop Down (default)" drop="down"></sgds-datepicker>

<!-- With validation feedback -->
<sgds-datepicker
  label="Required Date"
  name="required-date"
  required
  hasFeedback
  invalidFeedback="Date is required">
</sgds-datepicker>

<!-- Read selected value -->
<sgds-datepicker id="dp" label="Select Date" name="chosen-date"></sgds-datepicker>
<script>
  document.getElementById("dp").addEventListener("sgds-change-date", (e) => {
    // Read from event.target.value, not event.detail
    console.log("Selected:", e.target.value); // Format: "DD/MM/YYYY" or "DD/MM/YYYY - DD/MM/YYYY"
  });
</script>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `label` | string | — | Field label |
| `hintText` | string | — | Helper text below label |
| `name` | string | — | Form field name |
| `value` | string | — | Initial date value (`DD/MM/YYYY`) |
| `placeholder` | string | `DD/MM/YYYY` | Input placeholder |
| `mode` | `single \| range` | `single` | Single date or date range selection |
| `minDate` | string | — | Earliest selectable date (ISO format: `YYYY-MM-DD`) |
| `maxDate` | string | — | Latest selectable date (ISO format: `YYYY-MM-DD`) |
| `drop` | `up \| down` | `down` | Calendar drop direction |
| `required` | boolean | `false` | Field is required |
| `hasFeedback` | boolean | `false` | Shows validation feedback |
| `disabled` | boolean | `false` | Disables the datepicker |

## Events

| Event | When | Reading Value |
|---|---|---|
| `sgds-change-date` | User selects a date | `event.target.value` — returns `"DD/MM/YYYY"` (single) or `"DD/MM/YYYY - DD/MM/YYYY"` (range) |

---

## Notes

- **Value format is `DD/MM/YYYY`** — not ISO format.
- `minDate` and `maxDate` accept ISO strings (`YYYY-MM-DD`), but the displayed and emitted value is always `DD/MM/YYYY`.
- Always read the selected value from `event.target.value`, **not** `event.detail`.
- For range mode, the emitted value is two dates joined with ` - ` (space-dash-space).
