# Footer

**Purpose**: The mandatory Singapore Government site footer. Must appear on all `.gov.sg` websites. Contains required legal links and supports custom column content.

**Components**: `<sgds-footer>` + `<sgds-footer-item>`

---

## Usage

```html
<!-- Mandatory government footer with required legal links -->
<sgds-footer
  agencyName="Ministry of Example"
  agencyUrl="https://www.moe.gov.sg"
  copyrightLiner="© 2024 Ministry of Example"
  lastUpdatedDate="01 Jan 2024">

  <!-- Privacy, Terms of Use are mandatory for .gov.sg sites -->
  <sgds-footer-item slot="links">
    <a href="/privacy">Privacy Statement</a>
  </sgds-footer-item>
  <sgds-footer-item slot="links">
    <a href="/terms">Terms of Use</a>
  </sgds-footer-item>
  <sgds-footer-item slot="links">
    <a href="/sitemap">Sitemap</a>
  </sgds-footer-item>
  <sgds-footer-item slot="links">
    <a href="/contact">Contact Us</a>
  </sgds-footer-item>
</sgds-footer>

<!-- With navigation columns -->
<sgds-footer
  agencyName="GovTech Singapore"
  agencyUrl="https://www.tech.gov.sg">

  <!-- First column -->
  <sgds-footer-item slot="col-1" header="About">
    <a href="/about/mission">Our Mission</a>
    <a href="/about/team">Leadership Team</a>
    <a href="/about/careers">Careers</a>
  </sgds-footer-item>

  <!-- Second column -->
  <sgds-footer-item slot="col-2" header="Products">
    <a href="/products/singpass">SingPass</a>
    <a href="/products/myinfo">MyInfo</a>
  </sgds-footer-item>

  <!-- Required links -->
  <sgds-footer-item slot="links">
    <a href="/privacy">Privacy</a>
  </sgds-footer-item>
  <sgds-footer-item slot="links">
    <a href="/terms">Terms of Use</a>
  </sgds-footer-item>
</sgds-footer>

<!-- Fluid (full width) footer -->
<sgds-footer
  fluid
  agencyName="Agency Name">
  <sgds-footer-item slot="links">
    <a href="/privacy">Privacy</a>
  </sgds-footer-item>
</sgds-footer>
```

---

## `<sgds-footer>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `agencyName` | string | — | Name of the government agency |
| `agencyUrl` | string | — | Agency website URL |
| `copyrightLiner` | string | — | Copyright text (auto-generated if omitted) |
| `lastUpdatedDate` | string | — | Last updated date string |
| `fluid` | boolean | `false` | Stretches footer to full viewport width |

## Slots

| Slot | Content |
|---|---|
| `links` | Bottom link row items (Privacy, Terms, etc.) |
| `col-1` | First navigation column |
| `col-2` | Second navigation column |
| `col-3` | Third navigation column |
| `col-4` | Fourth navigation column |
| `description` | Agency description text |

## `<sgds-footer-item>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `header` | string | — | Column heading text |

---

## Notes

- **Mandatory on all `.gov.sg` websites**: Privacy Statement and Terms of Use links are required by IM8 policy.
- `<sgds-footer>` must be placed at the very bottom of the page layout.
- Place in `slot="links"` for bottom row links; use `slot="col-*"` for navigation columns.
