# SGDS Opacity Design Tokens

Opacity utilities use the `sgds:` prefix and do **not** require theme files.

---

## Available Values

| Class | Level | Typical use |
|---|---|---|
| `sgds:opacity-0` | 0% — fully transparent | Hidden elements, animated reveals |
| `sgds:opacity-5` | 5% | Near-invisible watermarks |
| `sgds:opacity-10` | 10% | Very faint patterns |
| `sgds:opacity-20` | 20% | Subtle background patterns |
| `sgds:opacity-25` | 25% | Disabled states, skeleton placeholders |
| `sgds:opacity-30` | 30% | Light overlays |
| `sgds:opacity-40` | 40% | Disabled content |
| `sgds:opacity-50` | 50% | Half-transparent (modal backdrops) |
| `sgds:opacity-60` | 60% | Moderate overlay |
| `sgds:opacity-70` | 70% | Hover reveal |
| `sgds:opacity-75` | 75% | Mostly visible popover |
| `sgds:opacity-80` | 80% | Near-opaque overlay |
| `sgds:opacity-90` | 90% | Almost fully visible |
| `sgds:opacity-95` | 95% | Very slightly transparent |
| `sgds:opacity-100` | 100% — fully opaque | Normal visible content (default) |

---

## Decision Guide

| Range | Typical use |
|---|---|
| 0–20% | Watermarks, subtle patterns |
| 25–40% | Disabled states, loading skeletons, image overlays |
| 50–70% | Modal/drawer backdrops, hover reveal |
| 75–90% | Popovers, semi-transparent cards, tooltip backgrounds |
| 95–100% | Normal visible content |

---

## Notes

- Prefer semantic text color tokens (`sgds:text-subtle`, `sgds:text-muted`) over opacity reduction for text content — they are more accessible.
- Combine opacity with CSS `transition` for smooth hover/reveal effects.
- Use `sgds:bg-overlay` for full-screen modal backdrops instead of manual opacity on a background.
