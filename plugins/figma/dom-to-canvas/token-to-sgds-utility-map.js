re;
/**
 * SGDS Token Mapping: SGDS Tailwind ↔ CSS Variable ↔ Figma Token (with Variable ID)
 *
 * Usage:
 *   import { tokenMap, findByFigmaToken, findBySgdsTailwind, findByCssVar } from './token-to-sgds-utility-map.js';
 *
 * Each entry:
 *   { sgdsTailwind, cssVar, figmaToken, figmaVariableId }
 *
 * - sgdsTailwind:      The full sgds:* utility class (e.g. "sgds:bg-primary-default")
 * - cssVar:           The CSS custom property (e.g. --sgds-spacer-4)
 * - figmaToken:       The Figma variable name (slash-separated, e.g. sgds/spacer/4)
 * - figmaVariableId:  The Figma REST API VariableID
 */

export const tokenMap = [
  // ─── Spacing (Padding/Margin) ───────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:p-none",
    cssVar: "--sgds-spacer-0",
    figmaToken: "sgds/spacer/0",
    figmaVariableId: "VariableID:8865:8006"
  },
  {
    sgdsTailwind: "sgds:p-3-xs",
    cssVar: "--sgds-spacer-1",
    figmaToken: "sgds/spacer/1",
    figmaVariableId: "VariableID:8865:8007"
  },
  {
    sgdsTailwind: "sgds:p-2-xs",
    cssVar: "--sgds-spacer-2",
    figmaToken: "sgds/spacer/2",
    figmaVariableId: "VariableID:8865:8008"
  },
  {
    sgdsTailwind: "sgds:p-xs",
    cssVar: "--sgds-spacer-3",
    figmaToken: "sgds/spacer/3",
    figmaVariableId: "VariableID:8865:8009"
  },
  {
    sgdsTailwind: "sgds:p-sm",
    cssVar: "--sgds-spacer-4",
    figmaToken: "sgds/spacer/4",
    figmaVariableId: "VariableID:8865:8010"
  },
  {
    sgdsTailwind: "sgds:p-md",
    cssVar: "--sgds-spacer-5",
    figmaToken: "sgds/spacer/5",
    figmaVariableId: "VariableID:8865:8011"
  },
  {
    sgdsTailwind: "sgds:p-lg",
    cssVar: "--sgds-spacer-6",
    figmaToken: "sgds/spacer/6",
    figmaVariableId: "VariableID:10248:18476"
  },
  {
    sgdsTailwind: "sgds:p-xl",
    cssVar: "--sgds-spacer-7",
    figmaToken: "sgds/spacer/7",
    figmaVariableId: "VariableID:10248:18477"
  },
  {
    sgdsTailwind: "sgds:p-2-xl",
    cssVar: "--sgds-spacer-8",
    figmaToken: "sgds/spacer/8",
    figmaVariableId: "VariableID:10248:18478"
  },
  {
    sgdsTailwind: "sgds:p-3-xl",
    cssVar: "--sgds-spacer-9",
    figmaToken: "sgds/spacer/9",
    figmaVariableId: "VariableID:15592:18438"
  },
  {
    sgdsTailwind: "sgds:p-4-xl",
    cssVar: "--sgds-spacer-10",
    figmaToken: "sgds/spacer/10",
    figmaVariableId: "VariableID:15592:22367"
  },
  {
    sgdsTailwind: "sgds:p-5-xl",
    cssVar: "--sgds-spacer-11",
    figmaToken: "sgds/spacer/11",
    figmaVariableId: "VariableID:15592:24825"
  },

  // ─── Layout Spacing ─────────────────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:p-layout-xs",
    cssVar: "--sgds-layout-padding-xs",
    figmaToken: "sgds/layout/padding/xs",
    figmaVariableId: "VariableID:32826:947"
  },
  {
    sgdsTailwind: "sgds:p-layout-sm",
    cssVar: "--sgds-layout-padding-sm",
    figmaToken: "sgds/layout/padding/sm",
    figmaVariableId: "VariableID:32826:946"
  },
  {
    sgdsTailwind: "sgds:p-layout-md",
    cssVar: "--sgds-layout-padding-md",
    figmaToken: "sgds/layout/padding/md",
    figmaVariableId: "VariableID:32826:945"
  },
  {
    sgdsTailwind: "sgds:p-layout-lg",
    cssVar: "--sgds-layout-padding-lg",
    figmaToken: "sgds/layout/padding/lg",
    figmaVariableId: "VariableID:32826:944"
  },
  {
    sgdsTailwind: "sgds:p-layout-xl",
    cssVar: "--sgds-layout-padding-xl",
    figmaToken: "sgds/layout/padding/xl",
    figmaVariableId: "VariableID:32826:943"
  },

  // ─── Component Spacing ──────────────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:p-component-xs",
    cssVar: "--sgds-component-padding-xs",
    figmaToken: "sgds/component/padding/xs",
    figmaVariableId: "VariableID:32826:1002"
  },
  {
    sgdsTailwind: "sgds:p-component-sm",
    cssVar: "--sgds-component-padding-sm",
    figmaToken: "sgds/component/padding/sm",
    figmaVariableId: "VariableID:32826:1000"
  },
  {
    sgdsTailwind: "sgds:p-component-md",
    cssVar: "--sgds-component-padding-md",
    figmaToken: "sgds/component/padding/md",
    figmaVariableId: "VariableID:32826:999"
  },
  {
    sgdsTailwind: "sgds:p-component-lg",
    cssVar: "--sgds-component-padding-lg",
    figmaToken: "sgds/component/padding/lg",
    figmaVariableId: "VariableID:32826:1001"
  },
  {
    sgdsTailwind: "sgds:p-component-xl",
    cssVar: "--sgds-component-padding-xl",
    figmaToken: "sgds/component/padding/xl",
    figmaVariableId: "VariableID:32826:998"
  },

  // ─── Gap ────────────────────────────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:gap-none",
    cssVar: "--sgds-gap-none",
    figmaToken: "sgds/gap/none",
    figmaVariableId: "VariableID:29937:84894"
  },
  {
    sgdsTailwind: "sgds:gap-2-xs",
    cssVar: "--sgds-gap-2-xs",
    figmaToken: "sgds/gap/2-xs",
    figmaVariableId: "VariableID:29937:84892"
  },
  {
    sgdsTailwind: "sgds:gap-xs",
    cssVar: "--sgds-gap-xs",
    figmaToken: "sgds/gap/xs",
    figmaVariableId: "VariableID:29937:84893"
  },
  {
    sgdsTailwind: "sgds:gap-sm",
    cssVar: "--sgds-gap-sm",
    figmaToken: "sgds/gap/sm",
    figmaVariableId: "VariableID:29937:84891"
  },
  {
    sgdsTailwind: "sgds:gap-md",
    cssVar: "--sgds-gap-md",
    figmaToken: "sgds/gap/md",
    figmaVariableId: "VariableID:29937:84890"
  },
  {
    sgdsTailwind: "sgds:gap-lg",
    cssVar: "--sgds-gap-lg",
    figmaToken: "sgds/gap/lg",
    figmaVariableId: "VariableID:29937:84889"
  },
  {
    sgdsTailwind: "sgds:gap-xl",
    cssVar: "--sgds-gap-xl",
    figmaToken: "sgds/gap/xl",
    figmaVariableId: "VariableID:29937:84888"
  },
  {
    sgdsTailwind: "sgds:gap-2-xl",
    cssVar: "--sgds-gap-2-xl",
    figmaToken: "sgds/gap/2-xl",
    figmaVariableId: "VariableID:29937:84887"
  },
  {
    sgdsTailwind: "sgds:gap-3-xl",
    cssVar: "--sgds-gap-3-xl",
    figmaToken: "sgds/gap/3-xl",
    figmaVariableId: "VariableID:29937:84886"
  },

  // ─── Text Gap ───────────────────────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:gap-text-2-xs",
    cssVar: "--sgds-text-gap-2-xs",
    figmaToken: "sgds/text-gap/2-xs",
    figmaVariableId: "VariableID:32826:910"
  },
  {
    sgdsTailwind: "sgds:gap-text-xs",
    cssVar: "--sgds-text-gap-xs",
    figmaToken: "sgds/text-gap/xs",
    figmaVariableId: "VariableID:32826:908"
  },
  {
    sgdsTailwind: "sgds:gap-text-sm",
    cssVar: "--sgds-text-gap-sm",
    figmaToken: "sgds/text-gap/sm",
    figmaVariableId: "VariableID:32826:906"
  },
  {
    sgdsTailwind: "sgds:gap-text-md",
    cssVar: "--sgds-text-gap-md",
    figmaToken: "sgds/text-gap/md",
    figmaVariableId: "VariableID:32826:907"
  },
  {
    sgdsTailwind: "sgds:gap-text-lg",
    cssVar: "--sgds-text-gap-lg",
    figmaToken: "sgds/text-gap/lg",
    figmaVariableId: "VariableID:32826:905"
  },
  {
    sgdsTailwind: "sgds:gap-text-xl",
    cssVar: "--sgds-text-gap-xl",
    figmaToken: "sgds/text-gap/xl",
    figmaVariableId: "VariableID:32826:909"
  },
  {
    sgdsTailwind: "sgds:gap-text-2-xl",
    cssVar: "--sgds-text-gap-2-xl",
    figmaToken: "sgds/text-gap/2-xl",
    figmaVariableId: "VariableID:32826:904"
  },

  // ─── Layout Gap ─────────────────────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:gap-layout-2-xs",
    cssVar: "--sgds-layout-gap-2-xs",
    figmaToken: "sgds/layout/gap/2-xs",
    figmaVariableId: "VariableID:32878:3555"
  },
  {
    sgdsTailwind: "sgds:gap-layout-xs",
    cssVar: "--sgds-layout-gap-xs",
    figmaToken: "sgds/layout/gap/xs",
    figmaVariableId: "VariableID:32826:967"
  },
  {
    sgdsTailwind: "sgds:gap-layout-sm",
    cssVar: "--sgds-layout-gap-sm",
    figmaToken: "sgds/layout/gap/sm",
    figmaVariableId: "VariableID:32826:965"
  },
  {
    sgdsTailwind: "sgds:gap-layout-md",
    cssVar: "--sgds-layout-gap-md",
    figmaToken: "sgds/layout/gap/md",
    figmaVariableId: "VariableID:32826:964"
  },
  {
    sgdsTailwind: "sgds:gap-layout-lg",
    cssVar: "--sgds-layout-gap-lg",
    figmaToken: "sgds/layout/gap/lg",
    figmaVariableId: "VariableID:32826:966"
  },
  {
    sgdsTailwind: "sgds:gap-layout-xl",
    cssVar: "--sgds-layout-gap-xl",
    figmaToken: "sgds/layout/gap/xl",
    figmaVariableId: "VariableID:32826:963"
  },

  // ─── Component Gap ──────────────────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:gap-component-xs",
    cssVar: "--sgds-component-gap-xs",
    figmaToken: "sgds/component/gap/xs",
    figmaVariableId: "VariableID:32826:1019"
  },
  {
    sgdsTailwind: "sgds:gap-component-sm",
    cssVar: "--sgds-component-gap-sm",
    figmaToken: "sgds/component/gap/sm",
    figmaVariableId: "VariableID:32826:1018"
  },
  {
    sgdsTailwind: "sgds:gap-component-md",
    cssVar: "--sgds-component-gap-md",
    figmaToken: "sgds/component/gap/md",
    figmaVariableId: "VariableID:32826:1016"
  },
  {
    sgdsTailwind: "sgds:gap-component-lg",
    cssVar: "--sgds-component-gap-lg",
    figmaToken: "sgds/component/gap/lg",
    figmaVariableId: "VariableID:32826:1015"
  },
  {
    sgdsTailwind: "sgds:gap-component-xl",
    cssVar: "--sgds-component-gap-xl",
    figmaToken: "sgds/component/gap/xl",
    figmaVariableId: "VariableID:32826:1017"
  },

  // ─── Form Gap ───────────────────────────────────────────────────────────────
  // Note: Figma has sgds/form/gap (single token), CSS has sgds-form-gap-{sm,md,lg,xl,2-xl}
  // These may not have 1:1 Figma variable matches for each size

  // ─── Background Colors (Base) ──────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:bg-default",
    cssVar: "--sgds-bg-default",
    figmaToken: "sgds/bg-default",
    figmaVariableId: "VariableID:15472:16952"
  },
  {
    sgdsTailwind: "sgds:bg-alternate",
    cssVar: "--sgds-bg-alternate",
    figmaToken: "sgds/bg-alternate",
    figmaVariableId: "VariableID:15745:1580"
  },
  {
    sgdsTailwind: "sgds:bg-fixed-light",
    cssVar: "--sgds-bg-fixed-light",
    figmaToken: "sgds/bg-fixed-light",
    figmaVariableId: "VariableID:23073:24"
  },
  {
    sgdsTailwind: "sgds:bg-fixed-dark",
    cssVar: "--sgds-bg-fixed-dark",
    figmaToken: "sgds/bg-fixed-dark",
    figmaVariableId: "VariableID:23073:23"
  },
  {
    sgdsTailwind: "sgds:bg-overlay",
    cssVar: "--sgds-bg-overlay",
    figmaToken: "sgds/bg-overlay",
    figmaVariableId: "VariableID:18670:4168"
  },
  {
    sgdsTailwind: "sgds:bg-translucent",
    cssVar: "--sgds-bg-translucent",
    figmaToken: "sgds/bg-translucent",
    figmaVariableId: "VariableID:15953:3767"
  },
  {
    sgdsTailwind: "sgds:bg-translucent-subtle",
    cssVar: "--sgds-bg-translucent-subtle",
    figmaToken: "sgds/bg-translucent-subtle",
    figmaVariableId: "VariableID:16578:9746"
  },
  {
    sgdsTailwind: "sgds:bg-transparent",
    cssVar: "--sgds-bg-transparent",
    figmaToken: "sgds/bg-transparent",
    figmaVariableId: "VariableID:15679:11646"
  },
  {
    sgdsTailwind: "sgds:bg-translucent-inverse",
    cssVar: "--sgds-bg-translucent-inverse",
    figmaToken: "sgds/bg-translucent-inverse",
    figmaVariableId: "VariableID:31378:15472"
  },
  {
    sgdsTailwind: "sgds:bg-translucent-fixed-dark",
    cssVar: "--sgds-bg-translucent-fixed-dark",
    figmaToken: "sgds/bg-translucent-fixed-dark",
    figmaVariableId: "VariableID:30948:4175"
  },
  {
    sgdsTailwind: "sgds:bg-translucent-fixed-light",
    cssVar: "--sgds-bg-translucent-fixed-light",
    figmaToken: "sgds/bg-translucent-fixed-light",
    figmaVariableId: "VariableID:31378:15501"
  },

  // ─── Background Colors (Surface) ───────────────────────────────────────────
  {
    sgdsTailwind: "sgds:bg-surface-default",
    cssVar: "--sgds-surface-default",
    figmaToken: "sgds/surface-default",
    figmaVariableId: "VariableID:23073:10776"
  },
  {
    sgdsTailwind: "sgds:bg-surface-raised",
    cssVar: "--sgds-surface-raised",
    figmaToken: "sgds/surface-raised",
    figmaVariableId: "VariableID:23073:10777"
  },
  {
    sgdsTailwind: "sgds:bg-surface-inverse",
    cssVar: "--sgds-surface-inverse",
    figmaToken: "sgds/surface-inverse",
    figmaVariableId: "VariableID:24691:33495"
  },
  {
    sgdsTailwind: "sgds:bg-surface-fixed-light",
    cssVar: "--sgds-surface-fixed-light",
    figmaToken: "sgds/surface-fixed-light",
    figmaVariableId: "VariableID:24691:33724"
  },
  {
    sgdsTailwind: "sgds:bg-surface-fixed-dark",
    cssVar: "--sgds-surface-fixed-dark",
    figmaToken: "sgds/surface-fixed-dark",
    figmaVariableId: "VariableID:24691:33725"
  },

  // ─── Background Colors (Primary) ───────────────────────────────────────────
  {
    sgdsTailwind: "sgds:bg-primary-default",
    cssVar: "--sgds-primary-bg-default",
    figmaToken: "sgds/primary/bg-default",
    figmaVariableId: "VariableID:13041:1749"
  },
  {
    sgdsTailwind: "sgds:bg-primary-muted",
    cssVar: "--sgds-primary-bg-muted",
    figmaToken: "sgds/primary/bg-muted",
    figmaVariableId: "VariableID:13049:40280"
  },
  {
    sgdsTailwind: "sgds:bg-primary-translucent",
    cssVar: "--sgds-primary-bg-translucent",
    figmaToken: "sgds/primary/bg-translucent",
    figmaVariableId: "VariableID:15842:10379"
  },
  {
    sgdsTailwind: "sgds:bg-primary-surface-default",
    cssVar: "--sgds-primary-surface-default",
    figmaToken: "sgds/primary/surface-default",
    figmaVariableId: "VariableID:24694:62719"
  },
  {
    sgdsTailwind: "sgds:bg-primary-surface-emphasis",
    cssVar: "--sgds-primary-surface-emphasis",
    figmaToken: "sgds/primary/surface-emphasis",
    figmaVariableId: "VariableID:24694:62720"
  },
  {
    sgdsTailwind: "sgds:bg-primary-surface-muted",
    cssVar: "--sgds-primary-surface-muted",
    figmaToken: "sgds/primary/surface-muted",
    figmaVariableId: "VariableID:24694:62721"
  },
  {
    sgdsTailwind: "sgds:bg-primary-surface-translucent",
    cssVar: "--sgds-primary-surface-translucent",
    figmaToken: "sgds/primary/surface-translucent",
    figmaVariableId: "VariableID:24711:81969"
  },

  // ─── Background Colors (Accent) ────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:bg-accent-default",
    cssVar: "--sgds-accent-bg-default",
    figmaToken: "sgds/accent/bg-default",
    figmaVariableId: "VariableID:28816:19990"
  },
  {
    sgdsTailwind: "sgds:bg-accent-muted",
    cssVar: "--sgds-accent-bg-muted",
    figmaToken: "sgds/accent/bg-muted",
    figmaVariableId: "VariableID:28816:19991"
  },
  {
    sgdsTailwind: "sgds:bg-accent-surface-default",
    cssVar: "--sgds-accent-surface-default",
    figmaToken: "sgds/accent/surface-default",
    figmaVariableId: "VariableID:28816:19993"
  },
  {
    sgdsTailwind: "sgds:bg-accent-surface-emphasis",
    cssVar: "--sgds-accent-surface-emphasis",
    figmaToken: "sgds/accent/surface-emphasis",
    figmaVariableId: "VariableID:28816:19994"
  },
  {
    sgdsTailwind: "sgds:bg-accent-surface-muted",
    cssVar: "--sgds-accent-surface-muted",
    figmaToken: "sgds/accent/surface-muted",
    figmaVariableId: "VariableID:28816:19995"
  },

  // ─── Background Colors (Success) ───────────────────────────────────────────
  {
    sgdsTailwind: "sgds:bg-success-default",
    cssVar: "--sgds-success-bg-default",
    figmaToken: "sgds/success/bg-default",
    figmaVariableId: "VariableID:13032:39768"
  },
  {
    sgdsTailwind: "sgds:bg-success-muted",
    cssVar: "--sgds-success-bg-muted",
    figmaToken: "sgds/success/bg-muted",
    figmaVariableId: "VariableID:13049:40282"
  },
  {
    sgdsTailwind: "sgds:bg-success-surface-default",
    cssVar: "--sgds-success-surface-default",
    figmaToken: "sgds/success/surface-default",
    figmaVariableId: "VariableID:24694:63660"
  },
  {
    sgdsTailwind: "sgds:bg-success-surface-emphasis",
    cssVar: "--sgds-success-surface-emphasis",
    figmaToken: "sgds/success/surface-emphasis",
    figmaVariableId: "VariableID:24694:63661"
  },
  {
    sgdsTailwind: "sgds:bg-success-surface-muted",
    cssVar: "--sgds-success-surface-muted",
    figmaToken: "sgds/success/surface-muted",
    figmaVariableId: "VariableID:24694:63662"
  },

  // ─── Background Colors (Danger) ────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:bg-danger-default",
    cssVar: "--sgds-danger-bg-default",
    figmaToken: "sgds/danger/bg-default",
    figmaVariableId: "VariableID:13032:39769"
  },
  {
    sgdsTailwind: "sgds:bg-danger-muted",
    cssVar: "--sgds-danger-bg-muted",
    figmaToken: "sgds/danger/bg-muted",
    figmaVariableId: "VariableID:13049:40283"
  },
  {
    sgdsTailwind: "sgds:bg-danger-surface-default",
    cssVar: "--sgds-danger-surface-default",
    figmaToken: "sgds/danger/surface-default",
    figmaVariableId: "VariableID:24694:65226"
  },
  {
    sgdsTailwind: "sgds:bg-danger-surface-emphasis",
    cssVar: "--sgds-danger-surface-emphasis",
    figmaToken: "sgds/danger/surface-emphasis",
    figmaVariableId: "VariableID:24694:65227"
  },
  {
    sgdsTailwind: "sgds:bg-danger-surface-muted",
    cssVar: "--sgds-danger-surface-muted",
    figmaToken: "sgds/danger/surface-muted",
    figmaVariableId: "VariableID:24694:65228"
  },
  {
    sgdsTailwind: "sgds:bg-danger-surface-translucent",
    cssVar: "--sgds-danger-surface-translucent",
    figmaToken: "sgds/danger/surface-translucent",
    figmaVariableId: "VariableID:26540:30569"
  },

  // ─── Background Colors (Warning) ───────────────────────────────────────────
  {
    sgdsTailwind: "sgds:bg-warning-default",
    cssVar: "--sgds-warning-bg-default",
    figmaToken: "sgds/warning/bg-default",
    figmaVariableId: "VariableID:15953:9730"
  },
  {
    sgdsTailwind: "sgds:bg-warning-muted",
    cssVar: "--sgds-warning-bg-muted",
    figmaToken: "sgds/warning/bg-muted",
    figmaVariableId: "VariableID:15953:9731"
  },
  {
    sgdsTailwind: "sgds:bg-warning-surface-default",
    cssVar: "--sgds-warning-surface-default",
    figmaToken: "sgds/warning/surface-default",
    figmaVariableId: "VariableID:24694:65340"
  },
  {
    sgdsTailwind: "sgds:bg-warning-surface-emphasis",
    cssVar: "--sgds-warning-surface-emphasis",
    figmaToken: "sgds/warning/surface-emphasis",
    figmaVariableId: "VariableID:24694:65341"
  },
  {
    sgdsTailwind: "sgds:bg-warning-surface-muted",
    cssVar: "--sgds-warning-surface-muted",
    figmaToken: "sgds/warning/surface-muted",
    figmaVariableId: "VariableID:24694:65342"
  },

  // ─── Background Colors (Purple) ────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:bg-purple-default",
    cssVar: "--sgds-purple-bg-default",
    figmaToken: "sgds/purple/bg-default",
    figmaVariableId: "VariableID:28816:20010"
  },
  {
    sgdsTailwind: "sgds:bg-purple-muted",
    cssVar: "--sgds-purple-bg-muted",
    figmaToken: "sgds/purple/bg-muted",
    figmaVariableId: "VariableID:28816:20011"
  },
  {
    sgdsTailwind: "sgds:bg-purple-surface-default",
    cssVar: "--sgds-purple-surface-default",
    figmaToken: "sgds/purple/surface-default",
    figmaVariableId: "VariableID:28816:20012"
  },
  {
    sgdsTailwind: "sgds:bg-purple-surface-emphasis",
    cssVar: "--sgds-purple-surface-emphasis",
    figmaToken: "sgds/purple/surface-emphasis",
    figmaVariableId: "VariableID:28816:20013"
  },
  {
    sgdsTailwind: "sgds:bg-purple-surface-muted",
    cssVar: "--sgds-purple-surface-muted",
    figmaToken: "sgds/purple/surface-muted",
    figmaVariableId: "VariableID:28816:20014"
  },

  // ─── Background Colors (Cyan) ──────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:bg-cyan-default",
    cssVar: "--sgds-cyan-bg-default",
    figmaToken: "sgds/cyan/bg-default",
    figmaVariableId: "VariableID:28816:20022"
  },
  {
    sgdsTailwind: "sgds:bg-cyan-muted",
    cssVar: "--sgds-cyan-bg-muted",
    figmaToken: "sgds/cyan/bg-muted",
    figmaVariableId: "VariableID:28816:20023"
  },
  {
    sgdsTailwind: "sgds:bg-cyan-surface-default",
    cssVar: "--sgds-cyan-surface-default",
    figmaToken: "sgds/cyan/surface-default",
    figmaVariableId: "VariableID:28816:20024"
  },
  {
    sgdsTailwind: "sgds:bg-cyan-surface-emphasis",
    cssVar: "--sgds-cyan-surface-emphasis",
    figmaToken: "sgds/cyan/surface-emphasis",
    figmaVariableId: "VariableID:28816:20025"
  },
  {
    sgdsTailwind: "sgds:bg-cyan-surface-muted",
    cssVar: "--sgds-cyan-surface-muted",
    figmaToken: "sgds/cyan/surface-muted",
    figmaVariableId: "VariableID:28816:20026"
  },

  // ─── Background Colors (Neutral) ───────────────────────────────────────────
  {
    sgdsTailwind: "sgds:bg-neutral-default",
    cssVar: "--sgds-neutral-bg-default",
    figmaToken: "sgds/neutral/bg-default",
    figmaVariableId: "VariableID:15786:48802"
  },
  {
    sgdsTailwind: "sgds:bg-neutral-muted",
    cssVar: "--sgds-neutral-bg-muted",
    figmaToken: "sgds/neutral/bg-muted",
    figmaVariableId: "VariableID:15786:48803"
  },
  {
    sgdsTailwind: "sgds:bg-neutral-surface-default",
    cssVar: "--sgds-neutral-surface-default",
    figmaToken: "sgds/neutral/surface-default",
    figmaVariableId: "VariableID:24757:67307"
  },
  {
    sgdsTailwind: "sgds:bg-neutral-surface-emphasis",
    cssVar: "--sgds-neutral-surface-emphasis",
    figmaToken: "sgds/neutral/surface-emphasis",
    figmaVariableId: "VariableID:24757:67308"
  },
  {
    sgdsTailwind: "sgds:bg-neutral-surface-muted",
    cssVar: "--sgds-neutral-surface-muted",
    figmaToken: "sgds/neutral/surface-muted",
    figmaVariableId: "VariableID:24757:67309"
  },

  // ─── Background Colors (Form) ──────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:bg-form-surface-default",
    cssVar: "--sgds-form-surface-default",
    figmaToken: "sgds/form/surface-default",
    figmaVariableId: "VariableID:29838:66195"
  },
  {
    sgdsTailwind: "sgds:bg-form-surface-raised",
    cssVar: "--sgds-form-surface-raised",
    figmaToken: "sgds/form/surface-raised",
    figmaVariableId: "VariableID:29838:66187"
  },
  {
    sgdsTailwind: "sgds:bg-form-surface-emphasis",
    cssVar: "--sgds-form-surface-emphasis",
    figmaToken: "sgds/form/surface-emphasis",
    figmaVariableId: "VariableID:29838:66188"
  },
  {
    sgdsTailwind: "sgds:bg-form-surface-subtle",
    cssVar: "--sgds-form-surface-subtle",
    figmaToken: "sgds/form/surface-subtle",
    figmaVariableId: "VariableID:29838:66185"
  },
  {
    sgdsTailwind: "sgds:bg-form-surface-muted",
    cssVar: "--sgds-form-surface-muted",
    figmaToken: "sgds/form/surface-muted",
    figmaVariableId: "VariableID:29838:66184"
  },
  {
    sgdsTailwind: "sgds:bg-form-surface-inverse",
    cssVar: "--sgds-form-surface-inverse",
    figmaToken: "sgds/form/surface-inverse",
    figmaVariableId: "VariableID:29838:66183"
  },
  {
    sgdsTailwind: "sgds:bg-form-surface-fixed-light",
    cssVar: "--sgds-form-surface-fixed-light",
    figmaToken: "sgds/form/surface-fixed-light",
    figmaVariableId: "VariableID:29838:66182"
  },
  {
    sgdsTailwind: "sgds:bg-form-surface-fixed-dark",
    cssVar: "--sgds-form-surface-fixed-dark",
    figmaToken: "sgds/form/surface-fixed-dark",
    figmaVariableId: "VariableID:29838:66186"
  },
  {
    sgdsTailwind: "sgds:bg-form-primary-surface-default",
    cssVar: "--sgds-form-primary-surface-default",
    figmaToken: "sgds/form/primary/surface-default",
    figmaVariableId: "VariableID:29838:66205"
  },
  {
    sgdsTailwind: "sgds:bg-form-primary-surface-emphasis",
    cssVar: "--sgds-form-primary-surface-emphasis",
    figmaToken: "sgds/form/primary/surface-emphasis",
    figmaVariableId: "VariableID:29838:66204"
  },
  {
    sgdsTailwind: "sgds:bg-form-success-surface-default",
    cssVar: "--sgds-form-success-surface-default",
    figmaToken: "sgds/form/success/surface-default",
    figmaVariableId: "VariableID:29838:66215"
  },
  {
    sgdsTailwind: "sgds:bg-form-danger-surface-default",
    cssVar: "--sgds-form-danger-surface-default",
    figmaToken: "sgds/form/danger/surface-default",
    figmaVariableId: "VariableID:29838:66228"
  },

  // ─── Text Colors (Base) ────────────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:text-default",
    cssVar: "--sgds-color-default",
    figmaToken: "sgds/color-default",
    figmaVariableId: "VariableID:15274:2680"
  },
  {
    sgdsTailwind: "sgds:text-subtle",
    cssVar: "--sgds-color-subtle",
    figmaToken: "sgds/color-subtle",
    figmaVariableId: "VariableID:16129:5695"
  },
  {
    sgdsTailwind: "sgds:text-muted",
    cssVar: "--sgds-color-muted",
    figmaToken: "sgds/color-muted",
    figmaVariableId: "VariableID:15760:11158"
  },
  {
    sgdsTailwind: "sgds:text-inverse",
    cssVar: "--sgds-color-inverse",
    figmaToken: "sgds/color-inverse",
    figmaVariableId: "VariableID:15748:4610"
  },
  {
    sgdsTailwind: "sgds:text-fixed-light",
    cssVar: "--sgds-color-fixed-light",
    figmaToken: "sgds/color-fixed-light",
    figmaVariableId: "VariableID:24691:62708"
  },
  {
    sgdsTailwind: "sgds:text-fixed-dark",
    cssVar: "--sgds-color-fixed-dark",
    figmaToken: "sgds/color-fixed-dark",
    figmaVariableId: "VariableID:24691:62709"
  },
  {
    sgdsTailwind: "sgds:text-transparent",
    cssVar: "--sgds-color-transparent",
    figmaToken: "sgds/color-transparent",
    figmaVariableId: "VariableID:15760:15194"
  },

  // ─── Text Colors (Typography Roles) ────────────────────────────────────────
  {
    sgdsTailwind: "sgds:text-display-default",
    cssVar: "--sgds-display-color-default",
    figmaToken: "sgds/display/color-default",
    figmaVariableId: "VariableID:8105:8607"
  },
  {
    sgdsTailwind: "sgds:text-display-subtle",
    cssVar: "--sgds-display-color-subtle",
    figmaToken: "sgds/display/color-subtle",
    figmaVariableId: "VariableID:8810:3966"
  },
  {
    sgdsTailwind: "sgds:text-heading-default",
    cssVar: "--sgds-heading-color-default",
    figmaToken: "sgds/heading/color-default",
    figmaVariableId: "VariableID:15760:46540"
  },
  {
    sgdsTailwind: "sgds:text-heading-subtle",
    cssVar: "--sgds-heading-color-subtle",
    figmaToken: "sgds/heading/color-subtle",
    figmaVariableId: "VariableID:15760:46541"
  },
  {
    sgdsTailwind: "sgds:text-body-default",
    cssVar: "--sgds-body-color-default",
    figmaToken: "sgds/body/color-default",
    figmaVariableId: "VariableID:15760:46628"
  },
  {
    sgdsTailwind: "sgds:text-body-subtle",
    cssVar: "--sgds-body-color-subtle",
    figmaToken: "sgds/body/color-subtle",
    figmaVariableId: "VariableID:15760:46629"
  },
  {
    sgdsTailwind: "sgds:text-label-default",
    cssVar: "--sgds-label-color-default",
    figmaToken: "sgds/label/color-default",
    figmaVariableId: "VariableID:15760:46655"
  },
  {
    sgdsTailwind: "sgds:text-label-subtle",
    cssVar: "--sgds-label-color-subtle",
    figmaToken: "sgds/label/color-subtle",
    figmaVariableId: "VariableID:15760:46656"
  },
  {
    sgdsTailwind: "sgds:text-link-default",
    cssVar: "--sgds-link-color-default",
    figmaToken: "sgds/link/color-default",
    figmaVariableId: "VariableID:15760:41734"
  },
  {
    sgdsTailwind: "sgds:text-link-emphasis",
    cssVar: "--sgds-link-color-emphasis",
    figmaToken: "sgds/link/color-emphasis",
    figmaVariableId: "VariableID:15760:41735"
  },

  // ─── Text Colors (Semantic Tones) ──────────────────────────────────────────
  {
    sgdsTailwind: "sgds:text-primary-default",
    cssVar: "--sgds-primary-color-default",
    figmaToken: "sgds/primary/color-default",
    figmaVariableId: "VariableID:15679:27013"
  },
  {
    sgdsTailwind: "sgds:text-primary-emphasis",
    cssVar: "--sgds-primary-color-emphasis",
    figmaToken: "sgds/primary/color-emphasis",
    figmaVariableId: "VariableID:13049:40293"
  },
  {
    sgdsTailwind: "sgds:text-primary-fixed-light",
    cssVar: "--sgds-primary-color-fixed-light",
    figmaToken: "sgds/primary/color-fixed-light",
    figmaVariableId: "VariableID:24694:62724"
  },
  {
    sgdsTailwind: "sgds:text-primary-fixed-dark",
    cssVar: "--sgds-primary-color-fixed-dark",
    figmaToken: "sgds/primary/color-fixed-dark",
    figmaVariableId: "VariableID:24694:62725"
  },
  {
    sgdsTailwind: "sgds:text-accent-default",
    cssVar: "--sgds-accent-color-default",
    figmaToken: "sgds/accent/color-default",
    figmaVariableId: "VariableID:28816:19997"
  },
  {
    sgdsTailwind: "sgds:text-accent-emphasis",
    cssVar: "--sgds-accent-color-emphasis",
    figmaToken: "sgds/accent/color-emphasis",
    figmaVariableId: "VariableID:28816:19998"
  },
  {
    sgdsTailwind: "sgds:text-accent-fixed-light",
    cssVar: "--sgds-accent-color-fixed-light",
    figmaToken: "sgds/accent/color-fixed-light",
    figmaVariableId: "VariableID:28816:19999"
  },
  {
    sgdsTailwind: "sgds:text-accent-fixed-dark",
    cssVar: "--sgds-accent-color-fixed-dark",
    figmaToken: "sgds/accent/color-fixed-dark",
    figmaVariableId: "VariableID:28816:20000"
  },
  {
    sgdsTailwind: "sgds:text-success-default",
    cssVar: "--sgds-success-color-default",
    figmaToken: "sgds/success/color-default",
    figmaVariableId: "VariableID:13049:40296"
  },
  {
    sgdsTailwind: "sgds:text-success-emphasis",
    cssVar: "--sgds-success-color-emphasis",
    figmaToken: "sgds/success/color-emphasis",
    figmaVariableId: "VariableID:15748:8788"
  },
  {
    sgdsTailwind: "sgds:text-success-fixed-light",
    cssVar: "--sgds-success-color-fixed-light",
    figmaToken: "sgds/success/color-fixed-light",
    figmaVariableId: "VariableID:24694:63665"
  },
  {
    sgdsTailwind: "sgds:text-success-fixed-dark",
    cssVar: "--sgds-success-color-fixed-dark",
    figmaToken: "sgds/success/color-fixed-dark",
    figmaVariableId: "VariableID:24694:63666"
  },
  {
    sgdsTailwind: "sgds:text-danger-default",
    cssVar: "--sgds-danger-color-default",
    figmaToken: "sgds/danger/color-default",
    figmaVariableId: "VariableID:13049:40298"
  },
  {
    sgdsTailwind: "sgds:text-danger-emphasis",
    cssVar: "--sgds-danger-color-emphasis",
    figmaToken: "sgds/danger/color-emphasis",
    figmaVariableId: "VariableID:15760:9110"
  },
  {
    sgdsTailwind: "sgds:text-danger-fixed-light",
    cssVar: "--sgds-danger-color-fixed-light",
    figmaToken: "sgds/danger/color-fixed-light",
    figmaVariableId: "VariableID:24694:65231"
  },
  {
    sgdsTailwind: "sgds:text-danger-fixed-dark",
    cssVar: "--sgds-danger-color-fixed-dark",
    figmaToken: "sgds/danger/color-fixed-dark",
    figmaVariableId: "VariableID:24694:65232"
  },
  {
    sgdsTailwind: "sgds:text-warning-default",
    cssVar: "--sgds-warning-color-default",
    figmaToken: "sgds/warning/color-default",
    figmaVariableId: "VariableID:15953:9733"
  },
  {
    sgdsTailwind: "sgds:text-warning-emphasis",
    cssVar: "--sgds-warning-color-emphasis",
    figmaToken: "sgds/warning/color-emphasis",
    figmaVariableId: "VariableID:15953:9734"
  },
  {
    sgdsTailwind: "sgds:text-warning-fixed-light",
    cssVar: "--sgds-warning-color-fixed-light",
    figmaToken: "sgds/warning/color-fixed-light",
    figmaVariableId: "VariableID:24694:65634"
  },
  {
    sgdsTailwind: "sgds:text-warning-fixed-dark",
    cssVar: "--sgds-warning-color-fixed-dark",
    figmaToken: "sgds/warning/color-fixed-dark",
    figmaVariableId: "VariableID:24694:65635"
  },
  {
    sgdsTailwind: "sgds:text-purple-default",
    cssVar: "--sgds-purple-color-default",
    figmaToken: "sgds/purple/color-default",
    figmaVariableId: "VariableID:28816:20015"
  },
  {
    sgdsTailwind: "sgds:text-purple-emphasis",
    cssVar: "--sgds-purple-color-emphasis",
    figmaToken: "sgds/purple/color-emphasis",
    figmaVariableId: "VariableID:28816:20016"
  },
  {
    sgdsTailwind: "sgds:text-purple-fixed-light",
    cssVar: "--sgds-purple-color-fixed-light",
    figmaToken: "sgds/purple/color-fixed-light",
    figmaVariableId: "VariableID:28816:20017"
  },
  {
    sgdsTailwind: "sgds:text-purple-fixed-dark",
    cssVar: "--sgds-purple-color-fixed-dark",
    figmaToken: "sgds/purple/color-fixed-dark",
    figmaVariableId: "VariableID:28816:20018"
  },
  {
    sgdsTailwind: "sgds:text-cyan-default",
    cssVar: "--sgds-cyan-color-default",
    figmaToken: "sgds/cyan/color-default",
    figmaVariableId: "VariableID:28816:20027"
  },
  {
    sgdsTailwind: "sgds:text-cyan-emphasis",
    cssVar: "--sgds-cyan-color-emphasis",
    figmaToken: "sgds/cyan/color-emphasis",
    figmaVariableId: "VariableID:28816:20028"
  },
  {
    sgdsTailwind: "sgds:text-cyan-fixed-light",
    cssVar: "--sgds-cyan-color-fixed-light",
    figmaToken: "sgds/cyan/color-fixed-light",
    figmaVariableId: "VariableID:28816:20029"
  },
  {
    sgdsTailwind: "sgds:text-cyan-fixed-dark",
    cssVar: "--sgds-cyan-color-fixed-dark",
    figmaToken: "sgds/cyan/color-fixed-dark",
    figmaVariableId: "VariableID:28816:20030"
  },
  {
    sgdsTailwind: "sgds:text-neutral-default",
    cssVar: "--sgds-neutral-color-default",
    figmaToken: "sgds/neutral/color-default",
    figmaVariableId: "VariableID:15786:48805"
  },
  {
    sgdsTailwind: "sgds:text-neutral-emphasis",
    cssVar: "--sgds-neutral-color-emphasis",
    figmaToken: "sgds/neutral/color-emphasis",
    figmaVariableId: "VariableID:24757:67310"
  },
  {
    sgdsTailwind: "sgds:text-neutral-fixed-light",
    cssVar: "--sgds-neutral-color-fixed-light",
    figmaToken: "sgds/neutral/color-fixed-light",
    figmaVariableId: "VariableID:24757:67313"
  },
  {
    sgdsTailwind: "sgds:text-neutral-fixed-dark",
    cssVar: "--sgds-neutral-color-fixed-dark",
    figmaToken: "sgds/neutral/color-fixed-dark",
    figmaVariableId: "VariableID:24757:67314"
  },

  // ─── Text Colors (Form) ────────────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:text-form-default",
    cssVar: "--sgds-form-color-default",
    figmaToken: "sgds/form/color-default",
    figmaVariableId: "VariableID:29838:66193"
  },
  {
    sgdsTailwind: "sgds:text-form-subtle",
    cssVar: "--sgds-form-color-subtle",
    figmaToken: "sgds/form/color-subtle",
    figmaVariableId: "VariableID:29838:66194"
  },
  {
    sgdsTailwind: "sgds:text-form-muted",
    cssVar: "--sgds-form-color-muted",
    figmaToken: "sgds/form/color-muted",
    figmaVariableId: "VariableID:29838:66190"
  },
  {
    sgdsTailwind: "sgds:text-form-inverse",
    cssVar: "--sgds-form-color-inverse",
    figmaToken: "sgds/form/color-inverse",
    figmaVariableId: "VariableID:29838:66189"
  },
  {
    sgdsTailwind: "sgds:text-form-fixed-light",
    cssVar: "--sgds-form-color-fixed-light",
    figmaToken: "sgds/form/color-fixed-light",
    figmaVariableId: "VariableID:29838:66191"
  },
  {
    sgdsTailwind: "sgds:text-form-fixed-dark",
    cssVar: "--sgds-form-color-fixed-dark",
    figmaToken: "sgds/form/color-fixed-dark",
    figmaVariableId: "VariableID:29838:66192"
  },
  {
    sgdsTailwind: "sgds:text-form-primary-default",
    cssVar: "--sgds-form-primary-color-default",
    figmaToken: "sgds/form/primary/color-default",
    figmaVariableId: "VariableID:29838:66203"
  },
  {
    sgdsTailwind: "sgds:text-form-success-default",
    cssVar: "--sgds-form-success-color-default",
    figmaToken: "sgds/form/success/color-default",
    figmaVariableId: "VariableID:29838:66214"
  },
  {
    sgdsTailwind: "sgds:text-form-danger-default",
    cssVar: "--sgds-form-danger-color-default",
    figmaToken: "sgds/form/danger/color-default",
    figmaVariableId: "VariableID:29838:66226"
  },

  // ─── Border Colors (Base) ──────────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:border-default",
    cssVar: "--sgds-border-color-default",
    figmaToken: "sgds/border-color-default",
    figmaVariableId: "VariableID:15274:2679"
  },
  {
    sgdsTailwind: "sgds:border-emphasis",
    cssVar: "--sgds-border-color-emphasis",
    figmaToken: "sgds/border-color-emphasis",
    figmaVariableId: "VariableID:16740:4626"
  },
  {
    sgdsTailwind: "sgds:border-muted",
    cssVar: "--sgds-border-color-muted",
    figmaToken: "sgds/border-color-muted",
    figmaVariableId: "VariableID:15760:11159"
  },
  {
    sgdsTailwind: "sgds:border-fixed-light",
    cssVar: "--sgds-border-color-fixed-light",
    figmaToken: "sgds/border-color-fixed-light",
    figmaVariableId: "VariableID:24757:54941"
  },
  {
    sgdsTailwind: "sgds:border-fixed-dark",
    cssVar: "--sgds-border-color-fixed-dark",
    figmaToken: "sgds/border-color-fixed-dark",
    figmaVariableId: "VariableID:24757:54942"
  },
  {
    sgdsTailwind: "sgds:border-translucent",
    cssVar: "--sgds-border-color-translucent",
    figmaToken: "sgds/border-color-translucent",
    figmaVariableId: "VariableID:18478:6594"
  },
  {
    sgdsTailwind: "sgds:border-transparent",
    cssVar: "--sgds-border-color-transparent",
    figmaToken: "sgds/border-color-transparent",
    figmaVariableId: "VariableID:15760:15195"
  },

  // ─── Border Colors (Semantic Tones) ────────────────────────────────────────
  {
    sgdsTailwind: "sgds:border-primary-default",
    cssVar: "--sgds-primary-border-color-default",
    figmaToken: "sgds/primary/border-color-default",
    figmaVariableId: "VariableID:13049:40286"
  },
  {
    sgdsTailwind: "sgds:border-primary-emphasis",
    cssVar: "--sgds-primary-border-color-emphasis",
    figmaToken: "sgds/primary/border-color-emphasis",
    figmaVariableId: "VariableID:15748:3841"
  },
  {
    sgdsTailwind: "sgds:border-primary-muted",
    cssVar: "--sgds-primary-border-color-muted",
    figmaToken: "sgds/primary/border-color-muted",
    figmaVariableId: "VariableID:24694:62768"
  },
  {
    sgdsTailwind: "sgds:border-accent-default",
    cssVar: "--sgds-accent-border-color-default",
    figmaToken: "sgds/accent/border-color-default",
    figmaVariableId: "VariableID:28816:20001"
  },
  {
    sgdsTailwind: "sgds:border-accent-emphasis",
    cssVar: "--sgds-accent-border-color-emphasis",
    figmaToken: "sgds/accent/border-color-emphasis",
    figmaVariableId: "VariableID:28816:20002"
  },
  {
    sgdsTailwind: "sgds:border-accent-muted",
    cssVar: "--sgds-accent-border-color-muted",
    figmaToken: "sgds/accent/border-color-muted",
    figmaVariableId: "VariableID:28816:20003"
  },
  {
    sgdsTailwind: "sgds:border-success-default",
    cssVar: "--sgds-success-border-color-default",
    figmaToken: "sgds/success/border-color-default",
    figmaVariableId: "VariableID:13049:40295"
  },
  {
    sgdsTailwind: "sgds:border-success-emphasis",
    cssVar: "--sgds-success-border-color-emphasis",
    figmaToken: "sgds/success/border-color-emphasis",
    figmaVariableId: "VariableID:15748:8790"
  },
  {
    sgdsTailwind: "sgds:border-success-muted",
    cssVar: "--sgds-success-border-color-muted",
    figmaToken: "sgds/success/border-color-muted",
    figmaVariableId: "VariableID:24694:63693"
  },
  {
    sgdsTailwind: "sgds:border-danger-default",
    cssVar: "--sgds-danger-border-color-default",
    figmaToken: "sgds/danger/border-color-default",
    figmaVariableId: "VariableID:13049:40297"
  },
  {
    sgdsTailwind: "sgds:border-danger-emphasis",
    cssVar: "--sgds-danger-border-color-emphasis",
    figmaToken: "sgds/danger/border-color-emphasis",
    figmaVariableId: "VariableID:15760:9109"
  },
  {
    sgdsTailwind: "sgds:border-danger-muted",
    cssVar: "--sgds-danger-border-color-muted",
    figmaToken: "sgds/danger/border-color-muted",
    figmaVariableId: "VariableID:24694:65233"
  },
  {
    sgdsTailwind: "sgds:border-warning-default",
    cssVar: "--sgds-warning-border-color-default",
    figmaToken: "sgds/warning/border-color-default",
    figmaVariableId: "VariableID:15953:9735"
  },
  {
    sgdsTailwind: "sgds:border-warning-emphasis",
    cssVar: "--sgds-warning-border-color-emphasis",
    figmaToken: "sgds/warning/border-color-emphasis",
    figmaVariableId: "VariableID:15953:9737"
  },
  {
    sgdsTailwind: "sgds:border-warning-muted",
    cssVar: "--sgds-warning-border-color-muted",
    figmaToken: "sgds/warning/border-color-muted",
    figmaVariableId: "VariableID:24694:65636"
  },
  {
    sgdsTailwind: "sgds:border-purple-default",
    cssVar: "--sgds-purple-border-color-default",
    figmaToken: "sgds/purple/border-color-default",
    figmaVariableId: "VariableID:28816:20019"
  },
  {
    sgdsTailwind: "sgds:border-purple-emphasis",
    cssVar: "--sgds-purple-border-color-emphasis",
    figmaToken: "sgds/purple/border-color-emphasis",
    figmaVariableId: "VariableID:28816:20020"
  },
  {
    sgdsTailwind: "sgds:border-purple-muted",
    cssVar: "--sgds-purple-border-color-muted",
    figmaToken: "sgds/purple/border-color-muted",
    figmaVariableId: "VariableID:28816:20021"
  },
  {
    sgdsTailwind: "sgds:border-cyan-default",
    cssVar: "--sgds-cyan-border-color-default",
    figmaToken: "sgds/cyan/border-color-default",
    figmaVariableId: "VariableID:28816:20031"
  },
  {
    sgdsTailwind: "sgds:border-cyan-emphasis",
    cssVar: "--sgds-cyan-border-color-emphasis",
    figmaToken: "sgds/cyan/border-color-emphasis",
    figmaVariableId: "VariableID:28816:20032"
  },
  {
    sgdsTailwind: "sgds:border-cyan-muted",
    cssVar: "--sgds-cyan-border-color-muted",
    figmaToken: "sgds/cyan/border-color-muted",
    figmaVariableId: "VariableID:28816:20033"
  },
  {
    sgdsTailwind: "sgds:border-neutral-default",
    cssVar: "--sgds-neutral-border-color-default",
    figmaToken: "sgds/neutral/border-color-default",
    figmaVariableId: "VariableID:15786:48807"
  },
  {
    sgdsTailwind: "sgds:border-neutral-emphasis",
    cssVar: "--sgds-neutral-border-color-emphasis",
    figmaToken: "sgds/neutral/border-color-emphasis",
    figmaVariableId: "VariableID:15786:48809"
  },
  {
    sgdsTailwind: "sgds:border-neutral-muted",
    cssVar: "--sgds-neutral-border-color-muted",
    figmaToken: "sgds/neutral/border-color-muted",
    figmaVariableId: "VariableID:15786:48808"
  },

  // ─── Border Colors (Form) ──────────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:border-form-success-default",
    cssVar: "--sgds-form-success-border-color-default",
    figmaToken: "sgds/form/success/border-color-default",
    figmaVariableId: "VariableID:29838:66213"
  },
  {
    sgdsTailwind: "sgds:border-form-danger-default",
    cssVar: "--sgds-form-danger-border-color-default",
    figmaToken: "sgds/form/danger/border-color-default",
    figmaVariableId: "VariableID:29838:66227"
  },

  // ─── Border Width ───────────────────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:border-0",
    cssVar: "--sgds-border-width-0",
    figmaToken: "sgds/border-width/0",
    figmaVariableId: "VariableID:15627:8430"
  },
  {
    sgdsTailwind: "sgds:border-1",
    cssVar: "--sgds-border-width-1",
    figmaToken: "sgds/border-width/1",
    figmaVariableId: "VariableID:8983:311"
  },
  {
    sgdsTailwind: "sgds:border-2",
    cssVar: "--sgds-border-width-2",
    figmaToken: "sgds/border-width/2",
    figmaVariableId: "VariableID:15627:8431"
  },
  {
    sgdsTailwind: "sgds:border-3",
    cssVar: "--sgds-border-width-3",
    figmaToken: "sgds/border-width/3",
    figmaVariableId: "VariableID:15627:8432"
  },
  {
    sgdsTailwind: "sgds:border-4",
    cssVar: "--sgds-border-width-4",
    figmaToken: "sgds/border-width/4",
    figmaVariableId: "VariableID:15722:7468"
  },
  {
    sgdsTailwind: "sgds:border-form-default",
    cssVar: "--sgds-form-border-width-default",
    figmaToken: "sgds/form/border-width/default",
    figmaVariableId: "VariableID:29838:66124"
  },
  {
    sgdsTailwind: "sgds:border-form-thick",
    cssVar: "--sgds-form-border-width-thick",
    figmaToken: "sgds/form/border-width/emphasis",
    figmaVariableId: "VariableID:29838:66123"
  },

  // ─── Border Radius ──────────────────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:rounded-none",
    cssVar: "--sgds-border-radius-none",
    figmaToken: "sgds/border-radius/none",
    figmaVariableId: "VariableID:15627:7994"
  },
  {
    sgdsTailwind: "sgds:rounded-xs",
    cssVar: "--sgds-border-radius-xs",
    figmaToken: "sgds/border-radius/xs",
    figmaVariableId: "VariableID:16029:13382"
  },
  {
    sgdsTailwind: "sgds:rounded-sm",
    cssVar: "--sgds-border-radius-sm",
    figmaToken: "sgds/border-radius/sm",
    figmaVariableId: "VariableID:8865:8675"
  },
  {
    sgdsTailwind: "sgds:rounded-md",
    cssVar: "--sgds-border-radius-md",
    figmaToken: "sgds/border-radius/md",
    figmaVariableId: "VariableID:15627:7995"
  },
  {
    sgdsTailwind: "sgds:rounded-lg",
    cssVar: "--sgds-border-radius-lg",
    figmaToken: "sgds/border-radius/lg",
    figmaVariableId: "VariableID:16671:9962"
  },
  {
    sgdsTailwind: "sgds:rounded-xl",
    cssVar: "--sgds-border-radius-xl",
    figmaToken: "sgds/border-radius/xl",
    figmaVariableId: "VariableID:15627:7996"
  },
  {
    sgdsTailwind: "sgds:rounded-2-xl",
    cssVar: "--sgds-border-radius-2-xl",
    figmaToken: "sgds/border-radius/2-xl",
    figmaVariableId: "VariableID:15627:7997"
  },
  {
    sgdsTailwind: "sgds:rounded-3-xl",
    cssVar: "--sgds-border-radius-3-xl",
    figmaToken: "sgds/border-radius/3-xl",
    figmaVariableId: "VariableID:32358:80366"
  },
  {
    sgdsTailwind: "sgds:rounded-full",
    cssVar: "--sgds-border-radius-full",
    figmaToken: "sgds/border-radius/full",
    figmaVariableId: "VariableID:15627:7998"
  },
  // Form border radius (single token in Figma)
  {
    sgdsTailwind: "sgds:rounded-form-none",
    cssVar: "--sgds-form-border-radius-none",
    figmaToken: "sgds/form/border-radius",
    figmaVariableId: "VariableID:29838:66122"
  },
  {
    sgdsTailwind: "sgds:rounded-form-xs",
    cssVar: "--sgds-form-border-radius-xs",
    figmaToken: "sgds/form/border-radius",
    figmaVariableId: "VariableID:29838:66122"
  },
  {
    sgdsTailwind: "sgds:rounded-form-sm",
    cssVar: "--sgds-form-border-radius-sm",
    figmaToken: "sgds/form/border-radius",
    figmaVariableId: "VariableID:29838:66122"
  },
  {
    sgdsTailwind: "sgds:rounded-form-md",
    cssVar: "--sgds-form-border-radius-md",
    figmaToken: "sgds/form/border-radius",
    figmaVariableId: "VariableID:29838:66122"
  },
  {
    sgdsTailwind: "sgds:rounded-form-full",
    cssVar: "--sgds-form-border-radius-full",
    figmaToken: "sgds/form/border-radius",
    figmaVariableId: "VariableID:29838:66122"
  },

  // ─── Typography — Font Size ─────────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:text-display-sm",
    cssVar: "--sgds-font-size-display-sm",
    figmaToken: "sgds/font-size/display/sm",
    figmaVariableId: "VariableID:32818:970"
  },
  {
    sgdsTailwind: "sgds:text-display-md",
    cssVar: "--sgds-font-size-display-md",
    figmaToken: "sgds/font-size/display/md",
    figmaVariableId: "VariableID:32818:969"
  },
  {
    sgdsTailwind: "sgds:text-display-lg",
    cssVar: "--sgds-font-size-display-lg",
    figmaToken: "sgds/font-size/display/lg",
    figmaVariableId: "VariableID:32818:968"
  },
  {
    sgdsTailwind: "sgds:text-heading-sm",
    cssVar: "--sgds-font-size-heading-sm",
    figmaToken: "sgds/font-size/heading/sm",
    figmaVariableId: "VariableID:32818:971"
  },
  {
    sgdsTailwind: "sgds:text-heading-md",
    cssVar: "--sgds-font-size-heading-md",
    figmaToken: "sgds/font-size/heading/md",
    figmaVariableId: "VariableID:32818:972"
  },
  {
    sgdsTailwind: "sgds:text-heading-lg",
    cssVar: "--sgds-font-size-heading-lg",
    figmaToken: "sgds/font-size/heading/lg",
    figmaVariableId: "VariableID:32818:973"
  },
  {
    sgdsTailwind: "sgds:text-heading-xl",
    cssVar: "--sgds-font-size-heading-xl",
    figmaToken: "sgds/font-size/heading/xl",
    figmaVariableId: "VariableID:32818:998"
  },
  {
    sgdsTailwind: "sgds:text-subtitle-sm",
    cssVar: "--sgds-font-size-subtitle-sm",
    figmaToken: "sgds/font-size/subtitle/sm",
    figmaVariableId: "VariableID:32818:1000"
  },
  {
    sgdsTailwind: "sgds:text-subtitle-md",
    cssVar: "--sgds-font-size-subtitle-md",
    figmaToken: "sgds/font-size/subtitle/md",
    figmaVariableId: "VariableID:32818:999"
  },
  {
    sgdsTailwind: "sgds:text-body-sm",
    cssVar: "--sgds-font-size-body-sm",
    figmaToken: "sgds/font-size/body/sm",
    figmaVariableId: "VariableID:32818:1001"
  },
  {
    sgdsTailwind: "sgds:text-body-md",
    cssVar: "--sgds-font-size-body-md",
    figmaToken: "sgds/font-size/body/md",
    figmaVariableId: "VariableID:32818:1002"
  },
  {
    sgdsTailwind: "sgds:text-body-lg",
    cssVar: "--sgds-font-size-body-lg",
    figmaToken: "sgds/font-size/body/lg",
    figmaVariableId: "VariableID:32818:1003"
  },
  {
    sgdsTailwind: "sgds:text-label-xs",
    cssVar: "--sgds-font-size-label-xs",
    figmaToken: "sgds/font-size/label/xs",
    figmaVariableId: "VariableID:32818:1004"
  },
  {
    sgdsTailwind: "sgds:text-label-sm",
    cssVar: "--sgds-font-size-label-sm",
    figmaToken: "sgds/font-size/label/sm",
    figmaVariableId: "VariableID:32818:1005"
  },
  {
    sgdsTailwind: "sgds:text-label-md",
    cssVar: "--sgds-font-size-label-md",
    figmaToken: "sgds/font-size/label/md",
    figmaVariableId: "VariableID:32818:1006"
  },
  {
    sgdsTailwind: "sgds:text-label-lg",
    cssVar: "--sgds-font-size-label-lg",
    figmaToken: "sgds/font-size/label/lg",
    figmaVariableId: "VariableID:32818:1007"
  },
  {
    sgdsTailwind: "sgds:text-caption-md",
    cssVar: "--sgds-font-size-caption-md",
    figmaToken: "sgds/font-size/caption/md",
    figmaVariableId: "VariableID:32818:1008"
  },
  {
    sgdsTailwind: "sgds:text-overline-md",
    cssVar: "--sgds-font-size-overline-md",
    figmaToken: "sgds/font-size/overline/md",
    figmaVariableId: "VariableID:32818:1009"
  },
  {
    sgdsTailwind: "sgds:text-link-xs",
    cssVar: "--sgds-font-size-link-xs",
    figmaToken: "sgds/font-size/link/xs",
    figmaVariableId: "VariableID:33070:83625"
  },
  {
    sgdsTailwind: "sgds:text-link-sm",
    cssVar: "--sgds-font-size-link-sm",
    figmaToken: "sgds/font-size/link/sm",
    figmaVariableId: "VariableID:33070:83623"
  },
  {
    sgdsTailwind: "sgds:text-link-md",
    cssVar: "--sgds-font-size-link-md",
    figmaToken: "sgds/font-size/link/md",
    figmaVariableId: "VariableID:33070:83622"
  },
  {
    sgdsTailwind: "sgds:text-link-lg",
    cssVar: "--sgds-font-size-link-lg",
    figmaToken: "sgds/font-size/link/lg",
    figmaVariableId: "VariableID:33070:83624"
  },

  // ─── Typography — Font Weight ───────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:font-light",
    cssVar: "--sgds-font-weight-light",
    figmaToken: "sgds/font-weight/light",
    figmaVariableId: "VariableID:15627:8434"
  },
  {
    sgdsTailwind: "sgds:font-regular",
    cssVar: "--sgds-font-weight-regular",
    figmaToken: "sgds/font-weight/regular",
    figmaVariableId: "VariableID:15627:8435"
  },
  {
    sgdsTailwind: "sgds:font-semibold",
    cssVar: "--sgds-font-weight-semibold",
    figmaToken: "sgds/font-weight/semibold",
    figmaVariableId: "VariableID:15627:8436"
  },
  {
    sgdsTailwind: "sgds:font-bold",
    cssVar: "--sgds-font-weight-bold",
    figmaToken: "sgds/font-weight/bold",
    figmaVariableId: "VariableID:15627:8437"
  },

  // ─── Typography — Line Height ───────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:leading-3-xs",
    cssVar: "--sgds-line-height-3-xs",
    figmaToken: "sgds/line-height/3-xs",
    figmaVariableId: "VariableID:32818:1059"
  },
  {
    sgdsTailwind: "sgds:leading-2-xs",
    cssVar: "--sgds-line-height-2-xs",
    figmaToken: "sgds/line-height/2-xs",
    figmaVariableId: "VariableID:32818:1058"
  },
  {
    sgdsTailwind: "sgds:leading-xs",
    cssVar: "--sgds-line-height-xs",
    figmaToken: "sgds/line-height/xs",
    figmaVariableId: "VariableID:32818:1057"
  },
  {
    sgdsTailwind: "sgds:leading-sm",
    cssVar: "--sgds-line-height-sm",
    figmaToken: "sgds/line-height/sm",
    figmaVariableId: "VariableID:32818:1053"
  },
  {
    sgdsTailwind: "sgds:leading-md",
    cssVar: "--sgds-line-height-md",
    figmaToken: "sgds/line-height/md",
    figmaVariableId: "VariableID:32818:1056"
  },
  {
    sgdsTailwind: "sgds:leading-lg",
    cssVar: "--sgds-line-height-lg",
    figmaToken: "sgds/line-height/lg",
    figmaVariableId: "VariableID:32818:1055"
  },
  {
    sgdsTailwind: "sgds:leading-xl",
    cssVar: "--sgds-line-height-xl",
    figmaToken: "sgds/line-height/xl",
    figmaVariableId: "VariableID:32818:1052"
  },
  {
    sgdsTailwind: "sgds:leading-2-xl",
    cssVar: "--sgds-line-height-2-xl",
    figmaToken: "sgds/line-height/2-xl",
    figmaVariableId: "VariableID:32818:1051"
  },
  {
    sgdsTailwind: "sgds:leading-3-xl",
    cssVar: "--sgds-line-height-3-xl",
    figmaToken: "sgds/line-height/3-xl",
    figmaVariableId: "VariableID:32818:1054"
  },

  // ─── Typography — Letter Spacing ────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:tracking-tighter",
    cssVar: "--sgds-letter-spacing-tighter",
    figmaToken: "sgds/letter-spacing/tighter",
    figmaVariableId: "VariableID:15627:8439"
  },
  {
    sgdsTailwind: "sgds:tracking-tight",
    cssVar: "--sgds-letter-spacing-tight",
    figmaToken: "sgds/letter-spacing/tight",
    figmaVariableId: "VariableID:15627:8442"
  },
  {
    sgdsTailwind: "sgds:tracking-normal",
    cssVar: "--sgds-letter-spacing-normal",
    figmaToken: "sgds/letter-spacing/normal",
    figmaVariableId: "VariableID:15627:8443"
  },
  {
    sgdsTailwind: "sgds:tracking-wide",
    cssVar: "--sgds-letter-spacing-wide",
    figmaToken: "sgds/letter-spacing/wide",
    figmaVariableId: "VariableID:15627:8444"
  },
  {
    sgdsTailwind: "sgds:tracking-wider",
    cssVar: "--sgds-letter-spacing-wider",
    figmaToken: "sgds/letter-spacing/wider",
    figmaVariableId: "VariableID:15722:7469"
  },

  // ─── Opacity ────────────────────────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:opacity-0",
    cssVar: "--sgds-opacity-0",
    figmaToken: "sgds/opacity/0",
    figmaVariableId: "VariableID:15722:10365"
  },
  {
    sgdsTailwind: "sgds:opacity-3",
    cssVar: "--sgds-opacity-3",
    figmaToken: "sgds/opacity/3",
    figmaVariableId: "VariableID:29284:18642"
  },
  {
    sgdsTailwind: "sgds:opacity-5",
    cssVar: "--sgds-opacity-5",
    figmaToken: "sgds/opacity/5",
    figmaVariableId: "VariableID:16471:1966"
  },
  {
    sgdsTailwind: "sgds:opacity-10",
    cssVar: "--sgds-opacity-10",
    figmaToken: "sgds/opacity/10",
    figmaVariableId: "VariableID:15722:10367"
  },
  {
    sgdsTailwind: "sgds:opacity-20",
    cssVar: "--sgds-opacity-20",
    figmaToken: "sgds/opacity/20",
    figmaVariableId: "VariableID:15722:10366"
  },
  {
    sgdsTailwind: "sgds:opacity-30",
    cssVar: "--sgds-opacity-30",
    figmaToken: "sgds/opacity/30",
    figmaVariableId: "VariableID:15722:10368"
  },
  {
    sgdsTailwind: "sgds:opacity-40",
    cssVar: "--sgds-opacity-40",
    figmaToken: "sgds/opacity/40",
    figmaVariableId: "VariableID:15722:10369"
  },
  {
    sgdsTailwind: "sgds:opacity-50",
    cssVar: "--sgds-opacity-50",
    figmaToken: "sgds/opacity/50",
    figmaVariableId: "VariableID:8865:9174"
  },
  {
    sgdsTailwind: "sgds:opacity-60",
    cssVar: "--sgds-opacity-60",
    figmaToken: "sgds/opacity/60",
    figmaVariableId: "VariableID:15722:10370"
  },
  {
    sgdsTailwind: "sgds:opacity-70",
    cssVar: "--sgds-opacity-70",
    figmaToken: "sgds/opacity/70",
    figmaVariableId: "VariableID:15722:10371"
  },
  {
    sgdsTailwind: "sgds:opacity-80",
    cssVar: "--sgds-opacity-80",
    figmaToken: "sgds/opacity/80",
    figmaVariableId: "VariableID:15722:10372"
  },
  {
    sgdsTailwind: "sgds:opacity-90",
    cssVar: "--sgds-opacity-90",
    figmaToken: "sgds/opacity/90",
    figmaVariableId: "VariableID:15722:10373"
  },
  {
    sgdsTailwind: "sgds:opacity-100",
    cssVar: "--sgds-opacity-100",
    figmaToken: "sgds/opacity/100",
    figmaVariableId: "VariableID:15722:10374"
  },

  // ─── Container ──────────────────────────────────────────────────────────────
  {
    sgdsTailwind: "sgds:w-container",
    cssVar: "--sgds-container-width",
    figmaToken: "sgds/container/width",
    figmaVariableId: "VariableID:32837:12197"
  },
  {
    sgdsTailwind: "sgds:max-w-container-md",
    cssVar: "--sgds-container-max-width-md",
    figmaToken: "sgds/container/max-width/md",
    figmaVariableId: "VariableID:30108:24615"
  },
  {
    sgdsTailwind: "sgds:max-w-container-lg",
    cssVar: "--sgds-container-max-width-lg",
    figmaToken: "sgds/container/max-width/lg",
    figmaVariableId: "VariableID:28535:22042"
  },
  {
    sgdsTailwind: "sgds:max-w-container-xl",
    cssVar: "--sgds-container-max-width-xl",
    figmaToken: "sgds/container/max-width/xl",
    figmaVariableId: "VariableID:28535:22041"
  },
  {
    sgdsTailwind: "sgds:max-w-container-2-xl",
    cssVar: "--sgds-container-max-width-2-xl",
    figmaToken: "sgds/container/max-width/2-xl",
    figmaVariableId: "VariableID:28535:22040"
  },
  {
    sgdsTailwind: "sgds:max-w-container-3-xl",
    cssVar: "--sgds-container-max-width-3-xl",
    figmaToken: "sgds/container/max-width/3-xl",
    figmaVariableId: "VariableID:30011:13828"
  }
];

// ─── Lookup Helpers ─────────────────────────────────────────────────────────────

/** Map keyed by Figma token name → entry */
export const byFigmaToken = new Map(tokenMap.map(e => [e.figmaToken, e]));

/** Map keyed by Figma VariableID → entry */
export const byFigmaVariableId = new Map(tokenMap.map(e => [e.figmaVariableId, e]));

/** Map keyed by CSS variable → entry */
export const byCssVar = new Map(tokenMap.map(e => [e.cssVar, e]));

/** Map keyed by SGDS Tailwind class → entry */
export const bySgdsTailwind = new Map(tokenMap.map(e => [e.sgdsTailwind, e]));

/**
 * Find mapping entry by Figma token name.
 * @param {string} figmaToken - e.g. "sgds/primary/bg-default"
 */
export function findByFigmaToken(figmaToken) {
  return byFigmaToken.get(figmaToken) || null;
}

/**
 * Find mapping entry by Figma Variable ID.
 * @param {string} variableId - e.g. "VariableID:13041:1749"
 */
export function findByFigmaVariableId(variableId) {
  return byFigmaVariableId.get(variableId) || null;
}

/**
 * Find mapping entry by CSS custom property.
 * @param {string} cssVar - e.g. "--sgds-primary-bg-default"
 */
export function findByCssVar(cssVar) {
  return byCssVar.get(cssVar) || null;
}

/**
 * Find mapping entry by SGDS Tailwind class.
 * @param {string} sgdsTailwindClass - e.g. "sgds:bg-primary-default"
 */
export function findBySgdsTailwind(sgdsTailwindClass) {
  return bySgdsTailwind.get(sgdsTailwindClass) || null;
}

// ─── Typography: SGDS Utility Classes → Figma Text Style Mapping ────────────────
// Maps the combination of sgds:* typography classes to the corresponding Figma text style.
// When the plugin encounters these class combinations on a text element,
// it should apply the Figma text style via figma.importStyleByKeyAsync(key).
//
// Each entry:
//   { sgdsClasses, figmaTextStyleName, figmaTextStyleKey, figmaTextStyleNodeId }
//
// - sgdsClasses:          Array of utility classes that identify this typography style
// - figmaTextStyleName:   Figma text style name (e.g. "heading/md-semibold")
// - figmaTextStyleKey:    Figma style key for importStyleByKeyAsync
// - figmaTextStyleNodeId: Figma node ID of the style

export const textStyleMap = [
  // ─── Display ──────────────────────────────────────────────────────────────────
  {
    sgdsClasses: ["sgds:text-display-lg", "sgds:font-bold"],
    figmaTextStyleName: "display/lg-bold",
    figmaTextStyleKey: "2a178cc4310fd777ff879d05a4dfd7268868990d",
    figmaTextStyleNodeId: "15403:2420"
  },
  {
    sgdsClasses: ["sgds:text-display-lg", "sgds:font-light"],
    figmaTextStyleName: "display/lg-light",
    figmaTextStyleKey: "789b7227c8d1f5b76f5ca0e9628e866bf782ed44",
    figmaTextStyleNodeId: "15403:5463"
  },
  {
    sgdsClasses: ["sgds:text-display-md", "sgds:font-bold"],
    figmaTextStyleName: "display/md-bold",
    figmaTextStyleKey: "5189154e0f3fdadd3b954dd81d38b1ed8a33a892",
    figmaTextStyleNodeId: "15403:5464"
  },
  {
    sgdsClasses: ["sgds:text-display-md", "sgds:font-light"],
    figmaTextStyleName: "display/md-light",
    figmaTextStyleKey: "871770a02d23acbf40864421447982a8476e09b9",
    figmaTextStyleNodeId: "15403:5465"
  },
  {
    sgdsClasses: ["sgds:text-display-sm", "sgds:font-bold"],
    figmaTextStyleName: "display/sm-bold",
    figmaTextStyleKey: "9c918eb31b1a158eba26c9b49fbfb68b0849648a",
    figmaTextStyleNodeId: "15403:5466"
  },
  {
    sgdsClasses: ["sgds:text-display-sm", "sgds:font-light"],
    figmaTextStyleName: "display/sm-light",
    figmaTextStyleKey: "6a21766611d21803cd7f9f2d0b5e064a486d0789",
    figmaTextStyleNodeId: "15403:5467"
  },

  // ─── Heading ──────────────────────────────────────────────────────────────────
  {
    sgdsClasses: ["sgds:text-heading-xl", "sgds:font-bold"],
    figmaTextStyleName: "heading/xl-bold",
    figmaTextStyleKey: "5cdb65eba3153b242bb8e142d1af1e672bede286",
    figmaTextStyleNodeId: "15403:5468"
  },
  {
    sgdsClasses: ["sgds:text-heading-xl", "sgds:font-light"],
    figmaTextStyleName: "heading/xl-light",
    figmaTextStyleKey: "eca3cbd7d550ff6ed872e49a2d4eaab33e15f3f4",
    figmaTextStyleNodeId: "15403:5469"
  },
  {
    sgdsClasses: ["sgds:text-heading-lg", "sgds:font-bold"],
    figmaTextStyleName: "heading/lg-bold",
    figmaTextStyleKey: "eb581c5cdeb4e766d3f7ee70eb06c5a5e6b7d7e2",
    figmaTextStyleNodeId: "15403:5470"
  },
  {
    sgdsClasses: ["sgds:text-heading-lg", "sgds:font-light"],
    figmaTextStyleName: "heading/lg-light",
    figmaTextStyleKey: "405fb91bd5a8d5cc4a277dafaa13a165271f3473",
    figmaTextStyleNodeId: "15403:5471"
  },
  {
    sgdsClasses: ["sgds:text-heading-md", "sgds:font-semibold"],
    figmaTextStyleName: "heading/md-semibold",
    figmaTextStyleKey: "1d726367767f3ae67690847d13e811d14bdfb18b",
    figmaTextStyleNodeId: "15403:5472"
  },
  {
    sgdsClasses: ["sgds:text-heading-md", "sgds:font-light"],
    figmaTextStyleName: "heading/md-light",
    figmaTextStyleKey: "87a8cbdfff5b88619a1267457affc5135ebfea7e",
    figmaTextStyleNodeId: "15403:5473"
  },
  {
    sgdsClasses: ["sgds:text-heading-sm", "sgds:font-semibold"],
    figmaTextStyleName: "heading/sm-semibold",
    figmaTextStyleKey: "916f07c16a469b02c0cccb3761df0649ed23c7a1",
    figmaTextStyleNodeId: "15403:5474"
  },
  {
    sgdsClasses: ["sgds:text-heading-sm", "sgds:font-light"],
    figmaTextStyleName: "heading/sm-light",
    figmaTextStyleKey: "3ddbd27fbf6674ca1d7ca51dc41776d5f7fdcef8",
    figmaTextStyleNodeId: "15403:5475"
  },

  // ─── Subtitle ─────────────────────────────────────────────────────────────────
  {
    sgdsClasses: ["sgds:text-subtitle-md", "sgds:font-semibold"],
    figmaTextStyleName: "subtitle/md-semibold",
    figmaTextStyleKey: "2f5eaef26d8b2a987ce63291e59110a5c49a0604",
    figmaTextStyleNodeId: "15441:10016"
  },
  {
    sgdsClasses: ["sgds:text-subtitle-md", "sgds:font-light"],
    figmaTextStyleName: "subtitle/md-light",
    figmaTextStyleKey: "9613843760694cd923f78e7a1fb0f99476828464",
    figmaTextStyleNodeId: "15441:10017"
  },
  {
    sgdsClasses: ["sgds:text-subtitle-sm", "sgds:font-semibold"],
    figmaTextStyleName: "subtitle/sm-semibold",
    figmaTextStyleKey: "8881a0b233ca1b5d3247c13dc5c4f78dcd038daf",
    figmaTextStyleNodeId: "15632:41545"
  },
  {
    sgdsClasses: ["sgds:text-subtitle-sm", "sgds:font-light"],
    figmaTextStyleName: "subtitle/sm-light",
    figmaTextStyleKey: "a25bb36cbc9da02d057b7c019f86bfb9f008e752",
    figmaTextStyleNodeId: "15632:41546"
  },

  // ─── Body ─────────────────────────────────────────────────────────────────────
  {
    sgdsClasses: ["sgds:text-body-lg", "sgds:font-semibold"],
    figmaTextStyleName: "body/lg-semibold",
    figmaTextStyleKey: "8e357183f095194ec405a0a5e7a3d8ef047167cd",
    figmaTextStyleNodeId: "15403:5476"
  },
  {
    sgdsClasses: ["sgds:text-body-lg", "sgds:font-regular"],
    figmaTextStyleName: "body/lg-regular",
    figmaTextStyleKey: "24983871c35b856959db6db763ce4cbf2d7aae25",
    figmaTextStyleNodeId: "15403:5477"
  },
  {
    sgdsClasses: ["sgds:text-body-md", "sgds:font-semibold"],
    figmaTextStyleName: "body/md-semibold",
    figmaTextStyleKey: "4fc6466df19f9e755a2c87d615468dfdc3823e74",
    figmaTextStyleNodeId: "15403:5480"
  },
  {
    sgdsClasses: ["sgds:text-body-md", "sgds:font-regular"],
    figmaTextStyleName: "body/md-regular",
    figmaTextStyleKey: "52251808f011d65ab25e06b5279429b11ed08537",
    figmaTextStyleNodeId: "15403:5481"
  },
  {
    sgdsClasses: ["sgds:text-body-sm", "sgds:font-semibold"],
    figmaTextStyleName: "body/sm-semibold",
    figmaTextStyleKey: "3760f584e4a888883759bfec6805f78258d31a36",
    figmaTextStyleNodeId: "15403:5482"
  },
  {
    sgdsClasses: ["sgds:text-body-sm", "sgds:font-regular"],
    figmaTextStyleName: "body/sm-regular",
    figmaTextStyleKey: "f5344762f1bf81b31311f18d79ce5d5b8bc3eb1a",
    figmaTextStyleNodeId: "15403:5483"
  },

  // ─── Label ────────────────────────────────────────────────────────────────────
  {
    sgdsClasses: ["sgds:text-label-lg", "sgds:font-semibold"],
    figmaTextStyleName: "label/lg-semibold",
    figmaTextStyleKey: "9c97f0835e0d03a39fc16f8a5efa68d1bbd911f2",
    figmaTextStyleNodeId: "15403:5484"
  },
  {
    sgdsClasses: ["sgds:text-label-lg", "sgds:font-regular"],
    figmaTextStyleName: "label/lg-regular",
    figmaTextStyleKey: "60e08d075b01433409e0fbacd1d9310a3692b4c6",
    figmaTextStyleNodeId: "15403:5485"
  },
  {
    sgdsClasses: ["sgds:text-label-md", "sgds:font-semibold"],
    figmaTextStyleName: "label/md-semibold",
    figmaTextStyleKey: "f525dd0459769ca64b7b517ad4984b824991d6f4",
    figmaTextStyleNodeId: "15403:5487"
  },
  {
    sgdsClasses: ["sgds:text-label-md", "sgds:font-regular"],
    figmaTextStyleName: "label/md-regular",
    figmaTextStyleKey: "091a52e640efb2b226b0e9bd09e3cebd5ed1fa46",
    figmaTextStyleNodeId: "15403:5488"
  },
  {
    sgdsClasses: ["sgds:text-label-md", "sgds:font-light"],
    figmaTextStyleName: "label/md-light",
    figmaTextStyleKey: "b13a5819976d89b3f42ef6b8699592bdf7b5722c",
    figmaTextStyleNodeId: "15403:5489"
  },
  {
    sgdsClasses: ["sgds:text-label-sm", "sgds:font-semibold"],
    figmaTextStyleName: "label/sm-semibold",
    figmaTextStyleKey: "1f764a9519b5ef804034cc46b28016403f677a24",
    figmaTextStyleNodeId: "15403:5490"
  },
  {
    sgdsClasses: ["sgds:text-label-sm", "sgds:font-regular"],
    figmaTextStyleName: "label/sm-regular",
    figmaTextStyleKey: "d646a23a2d863eb76808abf09926d31701a60069",
    figmaTextStyleNodeId: "15403:5491"
  },
  {
    sgdsClasses: ["sgds:text-label-xs", "sgds:font-semibold"],
    figmaTextStyleName: "label/xs-semibold",
    figmaTextStyleKey: "5ae7d2f3911320924aa4842caae68fc1bdc50aaa",
    figmaTextStyleNodeId: "28758:1419"
  },
  {
    sgdsClasses: ["sgds:text-label-xs", "sgds:font-regular"],
    figmaTextStyleName: "label/xs-regular",
    figmaTextStyleKey: "0689ac64b7fe5fcd0390903699ecf043da3cf9ad",
    figmaTextStyleNodeId: "28717:4074"
  },

  // ─── Caption ──────────────────────────────────────────────────────────────────
  {
    sgdsClasses: ["sgds:text-caption-md", "sgds:font-semibold"],
    figmaTextStyleName: "caption/semibold",
    figmaTextStyleKey: "a030edd30bf585cbe7fa2ee318d43af22f863808",
    figmaTextStyleNodeId: "15403:5492"
  },
  {
    sgdsClasses: ["sgds:text-caption-md", "sgds:font-regular"],
    figmaTextStyleName: "caption/regular",
    figmaTextStyleKey: "6f3122ebc05a0e3e80454130c336dc109c4766bf",
    figmaTextStyleNodeId: "15403:5493"
  },

  // ─── Overline ─────────────────────────────────────────────────────────────────
  {
    sgdsClasses: ["sgds:text-overline-md", "sgds:font-semibold"],
    figmaTextStyleName: "overline/semibold",
    figmaTextStyleKey: "91b5a1aa4150a2388273052eda2db77d93632b1c",
    figmaTextStyleNodeId: "15403:5496"
  },
  {
    sgdsClasses: ["sgds:text-overline-md", "sgds:font-regular"],
    figmaTextStyleName: "overline/regular",
    figmaTextStyleKey: "789fb85cfbf7dd1e36b1b965b80630c5819d2750",
    figmaTextStyleNodeId: "15403:5497"
  },

  // ─── Link ─────────────────────────────────────────────────────────────────────
  {
    sgdsClasses: ["sgds:text-link-lg", "sgds:font-regular"],
    figmaTextStyleName: "link/lg-regular",
    figmaTextStyleKey: "3979e066b25df430a94d9c4ceed95944187f47e8",
    figmaTextStyleNodeId: "15403:5505"
  },
  {
    sgdsClasses: ["sgds:text-link-md", "sgds:font-regular"],
    figmaTextStyleName: "link/md-regular",
    figmaTextStyleKey: "87188208ce4f91a6228866e944e4972748126f2c",
    figmaTextStyleNodeId: "15403:5507"
  },
  {
    sgdsClasses: ["sgds:text-link-sm", "sgds:font-regular"],
    figmaTextStyleName: "link/sm-regular",
    figmaTextStyleKey: "fa2f2c18f51f5934cc9454f8f52c45fc29b45c45",
    figmaTextStyleNodeId: "15403:5509"
  },
  {
    sgdsClasses: ["sgds:text-link-xs", "sgds:font-regular"],
    figmaTextStyleName: "link/xs-regular",
    figmaTextStyleKey: "6548ed6193a03c8869d3146eb2fbd331c3858d8f",
    figmaTextStyleNodeId: "29048:83324"
  },

  // ─── List ─────────────────────────────────────────────────────────────────────
  {
    sgdsClasses: ["sgds:text-body-lg"],
    figmaTextStyleName: "list/lg-regular",
    figmaTextStyleKey: "2927582678e8795b655b3de64cd9ae34a874d905",
    figmaTextStyleNodeId: "38795:3180",
    listOnly: true
  },
  {
    sgdsClasses: ["sgds:text-body-md"],
    figmaTextStyleName: "list/md-regular",
    figmaTextStyleKey: "2d333e403dd8892d95b20be2e033ec78727c6f56",
    figmaTextStyleNodeId: "38795:3182",
    listOnly: true
  },
  {
    sgdsClasses: ["sgds:text-body-sm"],
    figmaTextStyleName: "list/sm-regular",
    figmaTextStyleKey: "7614fc2e5918cbc0ebcfbaabfec840ac79eab956",
    figmaTextStyleNodeId: "38795:3184",
    listOnly: true
  }
];

/**
 * Find the matching Figma text style for a class string that CONTAINS the required sgds classes.
 * Uses "contains" matching — the class string may have additional classes beyond the ones needed.
 * @param {string} classString - Space-separated class list (e.g. "sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default")
 * @returns {{ figmaTextStyleName, figmaTextStyleKey, figmaTextStyleNodeId } | null}
 */
export function findTextStyle(classString) {
  if (!classString) return null;
  for (var i = 0; i < textStyleMap.length; i++) {
    var entry = textStyleMap[i];
    if (entry.listOnly) continue; // skip list-specific styles for general matching
    var allMatch = entry.sgdsClasses.every(function (cls) {
      // Check if classString contains this class (as a whole word)
      return classString.indexOf(cls) >= 0;
    });
    if (allMatch) return entry;
  }
  return null;
}

// ─── Element Tag → Default Typography (from reboot.css) ─────────────────────────
// Maps HTML tags to their default SGDS typography properties
// Used when elements don't have explicit sgds:* classes

export const typographyMap = [
  {
    tag: "h1",
    fontSize: "--sgds-font-size-heading-xl",
    fontWeight: "--sgds-font-weight-bold",
    lineHeight: "--sgds-line-height-xl",
    letterSpacing: "--sgds-letter-spacing-tight",
    marginBottom: "--sgds-margin-lg",
    marginBottomVarId: "VariableID:29937:84956",
    figmaTextStyleKey: null // TODO: populate from discovered-variables.json textStyles
  },
  {
    tag: "h2",
    fontSize: "--sgds-font-size-heading-lg",
    fontWeight: "--sgds-font-weight-bold",
    lineHeight: "--sgds-line-height-lg",
    letterSpacing: "--sgds-letter-spacing-tight",
    marginBottom: "--sgds-margin-md",
    marginBottomVarId: "VariableID:29937:84957",
    figmaTextStyleKey: null
  },
  {
    tag: "h3",
    fontSize: "--sgds-font-size-heading-md",
    fontWeight: "--sgds-font-weight-semibold",
    lineHeight: "--sgds-line-height-md",
    letterSpacing: "--sgds-letter-spacing-tight",
    marginBottom: "--sgds-margin-md",
    marginBottomVarId: "VariableID:29937:84957",
    figmaTextStyleKey: null
  },
  {
    tag: "h4",
    fontSize: "--sgds-font-size-heading-sm",
    fontWeight: "--sgds-font-weight-semibold",
    lineHeight: "--sgds-line-height-sm",
    letterSpacing: "--sgds-letter-spacing-tight",
    marginBottom: "--sgds-margin-md",
    marginBottomVarId: "VariableID:29937:84957",
    figmaTextStyleKey: null
  },
  {
    tag: "h5",
    fontSize: "--sgds-font-size-subtitle-md",
    fontWeight: "--sgds-font-weight-semibold",
    lineHeight: "--sgds-line-height-xs",
    letterSpacing: "--sgds-letter-spacing-normal",
    marginBottom: "--sgds-margin-xs",
    marginBottomVarId: "VariableID:29937:84959",
    figmaTextStyleKey: null
  },
  {
    tag: "h6",
    fontSize: "--sgds-font-size-subtitle-sm",
    fontWeight: "--sgds-font-weight-semibold",
    lineHeight: "--sgds-line-height-2-xs",
    letterSpacing: "--sgds-letter-spacing-normal",
    marginBottom: "--sgds-margin-xs",
    marginBottomVarId: "VariableID:29937:84959",
    figmaTextStyleKey: null
  },
  {
    tag: "p",
    fontSize: "--sgds-font-size-body-md",
    fontWeight: "--sgds-font-weight-regular",
    lineHeight: "--sgds-line-height-xs",
    letterSpacing: "--sgds-letter-spacing-normal",
    marginBottom: "--sgds-paragraph-spacing-xl",
    marginBottomVarId: "VariableID:15627:8448",
    figmaTextStyleKey: null
  },
  {
    tag: "ol",
    fontSize: "--sgds-font-size-body-md",
    fontWeight: "--sgds-font-weight-regular",
    lineHeight: "--sgds-line-height-xs",
    letterSpacing: "--sgds-letter-spacing-normal",
    marginTop: "--sgds-margin-xs",
    marginTopVarId: "VariableID:29937:84959",
    paddingLeft: "--sgds-padding-2-xl",
    marginBottom: null,
    marginBottomVarId: null,
    figmaTextStyleKey: null
  },
  {
    tag: "ul",
    fontSize: "--sgds-font-size-body-md",
    fontWeight: "--sgds-font-weight-regular",
    lineHeight: "--sgds-line-height-xs",
    letterSpacing: "--sgds-letter-spacing-normal",
    marginTop: "--sgds-margin-xs",
    marginTopVarId: "VariableID:29937:84959",
    paddingLeft: "--sgds-padding-2-xl",
    marginBottom: null,
    marginBottomVarId: null,
    figmaTextStyleKey: null
  },
  {
    tag: "li",
    fontSize: "--sgds-font-size-body-md",
    fontWeight: "--sgds-font-weight-regular",
    lineHeight: "--sgds-line-height-xs",
    letterSpacing: "--sgds-letter-spacing-normal",
    marginTop: "--sgds-margin-xs",
    marginTopVarId: "VariableID:29937:84959",
    marginBottom: null,
    marginBottomVarId: null,
    figmaTextStyleKey: null
  },
  {
    tag: "caption",
    fontSize: "--sgds-font-size-caption-md",
    fontWeight: "--sgds-font-weight-regular",
    lineHeight: "--sgds-line-height-2-xs",
    letterSpacing: "--sgds-letter-spacing-normal",
    marginBottom: "--sgds-paragraph-spacing-md",
    marginBottomVarId: "VariableID:15722:7471",
    figmaTextStyleKey: null
  },
  {
    tag: "label",
    fontSize: "--sgds-font-size-body-md",
    fontWeight: "--sgds-font-weight-regular",
    lineHeight: "--sgds-line-height-xs",
    letterSpacing: "--sgds-letter-spacing-normal",
    marginBottom: null,
    marginBottomVarId: null,
    figmaTextStyleKey: null
  }
];

/** Map keyed by HTML tag → typography entry */
export const byTag = new Map(typographyMap.map(e => [e.tag, e]));

/**
 * Find typography mapping by HTML tag.
 * @param {string} tag - e.g. "h3", "p", "li"
 */
export function findTypographyByTag(tag) {
  return byTag.get(tag) || null;
}
