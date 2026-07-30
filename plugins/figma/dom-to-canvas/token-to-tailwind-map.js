re/**
 * SGDS Token Mapping: SGDS Utility ↔ CSS Variable ↔ Figma Token (with Variable ID)
 *
 * Usage:
 *   import { tokenMap, findByFigmaToken, findBySgdsUtility, findByCssVar } from './token-to-sgds-utility-map.js';
 *
 * Each entry:
 *   { sgdsUtility, cssVar, figmaToken, figmaVariableId }
 *
 * - sgdsUtility:      The full sgds:* utility class (e.g. "sgds:bg-primary-default")
 * - cssVar:           The CSS custom property (e.g. --sgds-spacer-4)
 * - figmaToken:       The Figma variable name (slash-separated, e.g. sgds/spacer/4)
 * - figmaVariableId:  The Figma REST API VariableID
 */

export const tokenMap = [
  // ─── Spacing (Padding/Margin) ───────────────────────────────────────────────
  { sgdsUtility: "sgds:p-none", cssVar: "--sgds-spacer-0", figmaToken: "sgds/spacer/0", figmaVariableId: "VariableID:8865:8006" },
  { sgdsUtility: "sgds:p-3-xs", cssVar: "--sgds-spacer-1", figmaToken: "sgds/spacer/1", figmaVariableId: "VariableID:8865:8007" },
  { sgdsUtility: "sgds:p-2-xs", cssVar: "--sgds-spacer-2", figmaToken: "sgds/spacer/2", figmaVariableId: "VariableID:8865:8008" },
  { sgdsUtility: "sgds:p-xs", cssVar: "--sgds-spacer-3", figmaToken: "sgds/spacer/3", figmaVariableId: "VariableID:8865:8009" },
  { sgdsUtility: "sgds:p-sm", cssVar: "--sgds-spacer-4", figmaToken: "sgds/spacer/4", figmaVariableId: "VariableID:8865:8010" },
  { sgdsUtility: "sgds:p-md", cssVar: "--sgds-spacer-5", figmaToken: "sgds/spacer/5", figmaVariableId: "VariableID:8865:8011" },
  { sgdsUtility: "sgds:p-lg", cssVar: "--sgds-spacer-6", figmaToken: "sgds/spacer/6", figmaVariableId: "VariableID:10248:18476" },
  { sgdsUtility: "sgds:p-xl", cssVar: "--sgds-spacer-7", figmaToken: "sgds/spacer/7", figmaVariableId: "VariableID:10248:18477" },
  { sgdsUtility: "sgds:p-2-xl", cssVar: "--sgds-spacer-8", figmaToken: "sgds/spacer/8", figmaVariableId: "VariableID:10248:18478" },
  { sgdsUtility: "sgds:p-3-xl", cssVar: "--sgds-spacer-9", figmaToken: "sgds/spacer/9", figmaVariableId: "VariableID:15592:18438" },
  { sgdsUtility: "sgds:p-4-xl", cssVar: "--sgds-spacer-10", figmaToken: "sgds/spacer/10", figmaVariableId: "VariableID:15592:22367" },
  { sgdsUtility: "sgds:p-5-xl", cssVar: "--sgds-spacer-11", figmaToken: "sgds/spacer/11", figmaVariableId: "VariableID:15592:24825" },

  // ─── Layout Spacing ─────────────────────────────────────────────────────────
  { sgdsUtility: "sgds:p-layout-xs", cssVar: "--sgds-layout-padding-xs", figmaToken: "sgds/layout/padding/xs", figmaVariableId: "VariableID:32826:947" },
  { sgdsUtility: "sgds:p-layout-sm", cssVar: "--sgds-layout-padding-sm", figmaToken: "sgds/layout/padding/sm", figmaVariableId: "VariableID:32826:946" },
  { sgdsUtility: "sgds:p-layout-md", cssVar: "--sgds-layout-padding-md", figmaToken: "sgds/layout/padding/md", figmaVariableId: "VariableID:32826:945" },
  { sgdsUtility: "sgds:p-layout-lg", cssVar: "--sgds-layout-padding-lg", figmaToken: "sgds/layout/padding/lg", figmaVariableId: "VariableID:32826:944" },
  { sgdsUtility: "sgds:p-layout-xl", cssVar: "--sgds-layout-padding-xl", figmaToken: "sgds/layout/padding/xl", figmaVariableId: "VariableID:32826:943" },

  // ─── Component Spacing ──────────────────────────────────────────────────────
  { sgdsUtility: "sgds:p-component-xs", cssVar: "--sgds-component-padding-xs", figmaToken: "sgds/component/padding/xs", figmaVariableId: "VariableID:32826:1002" },
  { sgdsUtility: "sgds:p-component-sm", cssVar: "--sgds-component-padding-sm", figmaToken: "sgds/component/padding/sm", figmaVariableId: "VariableID:32826:1000" },
  { sgdsUtility: "sgds:p-component-md", cssVar: "--sgds-component-padding-md", figmaToken: "sgds/component/padding/md", figmaVariableId: "VariableID:32826:999" },
  { sgdsUtility: "sgds:p-component-lg", cssVar: "--sgds-component-padding-lg", figmaToken: "sgds/component/padding/lg", figmaVariableId: "VariableID:32826:1001" },
  { sgdsUtility: "sgds:p-component-xl", cssVar: "--sgds-component-padding-xl", figmaToken: "sgds/component/padding/xl", figmaVariableId: "VariableID:32826:998" },

  // ─── Gap ────────────────────────────────────────────────────────────────────
  { sgdsUtility: "sgds:gap-none", cssVar: "--sgds-gap-none", figmaToken: "sgds/gap/none", figmaVariableId: "VariableID:29937:84894" },
  { sgdsUtility: "sgds:gap-2-xs", cssVar: "--sgds-gap-2-xs", figmaToken: "sgds/gap/2-xs", figmaVariableId: "VariableID:29937:84892" },
  { sgdsUtility: "sgds:gap-xs", cssVar: "--sgds-gap-xs", figmaToken: "sgds/gap/xs", figmaVariableId: "VariableID:29937:84893" },
  { sgdsUtility: "sgds:gap-sm", cssVar: "--sgds-gap-sm", figmaToken: "sgds/gap/sm", figmaVariableId: "VariableID:29937:84891" },
  { sgdsUtility: "sgds:gap-md", cssVar: "--sgds-gap-md", figmaToken: "sgds/gap/md", figmaVariableId: "VariableID:29937:84890" },
  { sgdsUtility: "sgds:gap-lg", cssVar: "--sgds-gap-lg", figmaToken: "sgds/gap/lg", figmaVariableId: "VariableID:29937:84889" },
  { sgdsUtility: "sgds:gap-xl", cssVar: "--sgds-gap-xl", figmaToken: "sgds/gap/xl", figmaVariableId: "VariableID:29937:84888" },
  { sgdsUtility: "sgds:gap-2-xl", cssVar: "--sgds-gap-2-xl", figmaToken: "sgds/gap/2-xl", figmaVariableId: "VariableID:29937:84887" },
  { sgdsUtility: "sgds:gap-3-xl", cssVar: "--sgds-gap-3-xl", figmaToken: "sgds/gap/3-xl", figmaVariableId: "VariableID:29937:84886" },

  // ─── Text Gap ───────────────────────────────────────────────────────────────
  { sgdsUtility: "sgds:gap-text-2-xs", cssVar: "--sgds-text-gap-2-xs", figmaToken: "sgds/text-gap/2-xs", figmaVariableId: "VariableID:32826:910" },
  { sgdsUtility: "sgds:gap-text-xs", cssVar: "--sgds-text-gap-xs", figmaToken: "sgds/text-gap/xs", figmaVariableId: "VariableID:32826:908" },
  { sgdsUtility: "sgds:gap-text-sm", cssVar: "--sgds-text-gap-sm", figmaToken: "sgds/text-gap/sm", figmaVariableId: "VariableID:32826:906" },
  { sgdsUtility: "sgds:gap-text-md", cssVar: "--sgds-text-gap-md", figmaToken: "sgds/text-gap/md", figmaVariableId: "VariableID:32826:907" },
  { sgdsUtility: "sgds:gap-text-lg", cssVar: "--sgds-text-gap-lg", figmaToken: "sgds/text-gap/lg", figmaVariableId: "VariableID:32826:905" },
  { sgdsUtility: "sgds:gap-text-xl", cssVar: "--sgds-text-gap-xl", figmaToken: "sgds/text-gap/xl", figmaVariableId: "VariableID:32826:909" },
  { sgdsUtility: "sgds:gap-text-2-xl", cssVar: "--sgds-text-gap-2-xl", figmaToken: "sgds/text-gap/2-xl", figmaVariableId: "VariableID:32826:904" },

  // ─── Layout Gap ─────────────────────────────────────────────────────────────
  { sgdsUtility: "sgds:gap-layout-2-xs", cssVar: "--sgds-layout-gap-2-xs", figmaToken: "sgds/layout/gap/2-xs", figmaVariableId: "VariableID:32878:3555" },
  { sgdsUtility: "sgds:gap-layout-xs", cssVar: "--sgds-layout-gap-xs", figmaToken: "sgds/layout/gap/xs", figmaVariableId: "VariableID:32826:967" },
  { sgdsUtility: "sgds:gap-layout-sm", cssVar: "--sgds-layout-gap-sm", figmaToken: "sgds/layout/gap/sm", figmaVariableId: "VariableID:32826:965" },
  { sgdsUtility: "sgds:gap-layout-md", cssVar: "--sgds-layout-gap-md", figmaToken: "sgds/layout/gap/md", figmaVariableId: "VariableID:32826:964" },
  { sgdsUtility: "sgds:gap-layout-lg", cssVar: "--sgds-layout-gap-lg", figmaToken: "sgds/layout/gap/lg", figmaVariableId: "VariableID:32826:966" },
  { sgdsUtility: "sgds:gap-layout-xl", cssVar: "--sgds-layout-gap-xl", figmaToken: "sgds/layout/gap/xl", figmaVariableId: "VariableID:32826:963" },

  // ─── Component Gap ──────────────────────────────────────────────────────────
  { sgdsUtility: "sgds:gap-component-xs", cssVar: "--sgds-component-gap-xs", figmaToken: "sgds/component/gap/xs", figmaVariableId: "VariableID:32826:1019" },
  { sgdsUtility: "sgds:gap-component-sm", cssVar: "--sgds-component-gap-sm", figmaToken: "sgds/component/gap/sm", figmaVariableId: "VariableID:32826:1018" },
  { sgdsUtility: "sgds:gap-component-md", cssVar: "--sgds-component-gap-md", figmaToken: "sgds/component/gap/md", figmaVariableId: "VariableID:32826:1016" },
  { sgdsUtility: "sgds:gap-component-lg", cssVar: "--sgds-component-gap-lg", figmaToken: "sgds/component/gap/lg", figmaVariableId: "VariableID:32826:1015" },
  { sgdsUtility: "sgds:gap-component-xl", cssVar: "--sgds-component-gap-xl", figmaToken: "sgds/component/gap/xl", figmaVariableId: "VariableID:32826:1017" },

  // ─── Form Gap ───────────────────────────────────────────────────────────────
  // Note: Figma has sgds/form/gap (single token), CSS has sgds-form-gap-{sm,md,lg,xl,2-xl}
  // These may not have 1:1 Figma variable matches for each size

  // ─── Background Colors (Base) ──────────────────────────────────────────────
  { sgdsUtility: "sgds:bg-default", cssVar: "--sgds-bg-default", figmaToken: "sgds/bg-default", figmaVariableId: "VariableID:15472:16952" },
  { sgdsUtility: "sgds:bg-alternate", cssVar: "--sgds-bg-alternate", figmaToken: "sgds/bg-alternate", figmaVariableId: "VariableID:15745:1580" },
  { sgdsUtility: "sgds:bg-fixed-light", cssVar: "--sgds-bg-fixed-light", figmaToken: "sgds/bg-fixed-light", figmaVariableId: "VariableID:23073:24" },
  { sgdsUtility: "sgds:bg-fixed-dark", cssVar: "--sgds-bg-fixed-dark", figmaToken: "sgds/bg-fixed-dark", figmaVariableId: "VariableID:23073:23" },
  { sgdsUtility: "sgds:bg-overlay", cssVar: "--sgds-bg-overlay", figmaToken: "sgds/bg-overlay", figmaVariableId: "VariableID:18670:4168" },
  { sgdsUtility: "sgds:bg-translucent", cssVar: "--sgds-bg-translucent", figmaToken: "sgds/bg-translucent", figmaVariableId: "VariableID:15953:3767" },
  { sgdsUtility: "sgds:bg-translucent-subtle", cssVar: "--sgds-bg-translucent-subtle", figmaToken: "sgds/bg-translucent-subtle", figmaVariableId: "VariableID:16578:9746" },
  { sgdsUtility: "sgds:bg-transparent", cssVar: "--sgds-bg-transparent", figmaToken: "sgds/bg-transparent", figmaVariableId: "VariableID:15679:11646" },
  { sgdsUtility: "sgds:bg-translucent-inverse", cssVar: "--sgds-bg-translucent-inverse", figmaToken: "sgds/bg-translucent-inverse", figmaVariableId: "VariableID:31378:15472" },
  { sgdsUtility: "sgds:bg-translucent-fixed-dark", cssVar: "--sgds-bg-translucent-fixed-dark", figmaToken: "sgds/bg-translucent-fixed-dark", figmaVariableId: "VariableID:30948:4175" },
  { sgdsUtility: "sgds:bg-translucent-fixed-light", cssVar: "--sgds-bg-translucent-fixed-light", figmaToken: "sgds/bg-translucent-fixed-light", figmaVariableId: "VariableID:31378:15501" },

  // ─── Background Colors (Surface) ───────────────────────────────────────────
  { sgdsUtility: "sgds:bg-surface-default", cssVar: "--sgds-surface-default", figmaToken: "sgds/surface-default", figmaVariableId: "VariableID:23073:10776" },
  { sgdsUtility: "sgds:bg-surface-raised", cssVar: "--sgds-surface-raised", figmaToken: "sgds/surface-raised", figmaVariableId: "VariableID:23073:10777" },
  { sgdsUtility: "sgds:bg-surface-inverse", cssVar: "--sgds-surface-inverse", figmaToken: "sgds/surface-inverse", figmaVariableId: "VariableID:24691:33495" },
  { sgdsUtility: "sgds:bg-surface-fixed-light", cssVar: "--sgds-surface-fixed-light", figmaToken: "sgds/surface-fixed-light", figmaVariableId: "VariableID:24691:33724" },
  { sgdsUtility: "sgds:bg-surface-fixed-dark", cssVar: "--sgds-surface-fixed-dark", figmaToken: "sgds/surface-fixed-dark", figmaVariableId: "VariableID:24691:33725" },

  // ─── Background Colors (Primary) ───────────────────────────────────────────
  { sgdsUtility: "sgds:bg-primary-default", cssVar: "--sgds-primary-bg-default", figmaToken: "sgds/primary/bg-default", figmaVariableId: "VariableID:13041:1749" },
  { sgdsUtility: "sgds:bg-primary-muted", cssVar: "--sgds-primary-bg-muted", figmaToken: "sgds/primary/bg-muted", figmaVariableId: "VariableID:13049:40280" },
  { sgdsUtility: "sgds:bg-primary-translucent", cssVar: "--sgds-primary-bg-translucent", figmaToken: "sgds/primary/bg-translucent", figmaVariableId: "VariableID:15842:10379" },
  { sgdsUtility: "sgds:bg-primary-surface-default", cssVar: "--sgds-primary-surface-default", figmaToken: "sgds/primary/surface-default", figmaVariableId: "VariableID:24694:62719" },
  { sgdsUtility: "sgds:bg-primary-surface-emphasis", cssVar: "--sgds-primary-surface-emphasis", figmaToken: "sgds/primary/surface-emphasis", figmaVariableId: "VariableID:24694:62720" },
  { sgdsUtility: "sgds:bg-primary-surface-muted", cssVar: "--sgds-primary-surface-muted", figmaToken: "sgds/primary/surface-muted", figmaVariableId: "VariableID:24694:62721" },
  { sgdsUtility: "sgds:bg-primary-surface-translucent", cssVar: "--sgds-primary-surface-translucent", figmaToken: "sgds/primary/surface-translucent", figmaVariableId: "VariableID:24711:81969" },

  // ─── Background Colors (Accent) ────────────────────────────────────────────
  { sgdsUtility: "sgds:bg-accent-default", cssVar: "--sgds-accent-bg-default", figmaToken: "sgds/accent/bg-default", figmaVariableId: "VariableID:28816:19990" },
  { sgdsUtility: "sgds:bg-accent-muted", cssVar: "--sgds-accent-bg-muted", figmaToken: "sgds/accent/bg-muted", figmaVariableId: "VariableID:28816:19991" },
  { sgdsUtility: "sgds:bg-accent-surface-default", cssVar: "--sgds-accent-surface-default", figmaToken: "sgds/accent/surface-default", figmaVariableId: "VariableID:28816:19993" },
  { sgdsUtility: "sgds:bg-accent-surface-emphasis", cssVar: "--sgds-accent-surface-emphasis", figmaToken: "sgds/accent/surface-emphasis", figmaVariableId: "VariableID:28816:19994" },
  { sgdsUtility: "sgds:bg-accent-surface-muted", cssVar: "--sgds-accent-surface-muted", figmaToken: "sgds/accent/surface-muted", figmaVariableId: "VariableID:28816:19995" },

  // ─── Background Colors (Success) ───────────────────────────────────────────
  { sgdsUtility: "sgds:bg-success-default", cssVar: "--sgds-success-bg-default", figmaToken: "sgds/success/bg-default", figmaVariableId: "VariableID:13032:39768" },
  { sgdsUtility: "sgds:bg-success-muted", cssVar: "--sgds-success-bg-muted", figmaToken: "sgds/success/bg-muted", figmaVariableId: "VariableID:13049:40282" },
  { sgdsUtility: "sgds:bg-success-surface-default", cssVar: "--sgds-success-surface-default", figmaToken: "sgds/success/surface-default", figmaVariableId: "VariableID:24694:63660" },
  { sgdsUtility: "sgds:bg-success-surface-emphasis", cssVar: "--sgds-success-surface-emphasis", figmaToken: "sgds/success/surface-emphasis", figmaVariableId: "VariableID:24694:63661" },
  { sgdsUtility: "sgds:bg-success-surface-muted", cssVar: "--sgds-success-surface-muted", figmaToken: "sgds/success/surface-muted", figmaVariableId: "VariableID:24694:63662" },

  // ─── Background Colors (Danger) ────────────────────────────────────────────
  { sgdsUtility: "sgds:bg-danger-default", cssVar: "--sgds-danger-bg-default", figmaToken: "sgds/danger/bg-default", figmaVariableId: "VariableID:13032:39769" },
  { sgdsUtility: "sgds:bg-danger-muted", cssVar: "--sgds-danger-bg-muted", figmaToken: "sgds/danger/bg-muted", figmaVariableId: "VariableID:13049:40283" },
  { sgdsUtility: "sgds:bg-danger-surface-default", cssVar: "--sgds-danger-surface-default", figmaToken: "sgds/danger/surface-default", figmaVariableId: "VariableID:24694:65226" },
  { sgdsUtility: "sgds:bg-danger-surface-emphasis", cssVar: "--sgds-danger-surface-emphasis", figmaToken: "sgds/danger/surface-emphasis", figmaVariableId: "VariableID:24694:65227" },
  { sgdsUtility: "sgds:bg-danger-surface-muted", cssVar: "--sgds-danger-surface-muted", figmaToken: "sgds/danger/surface-muted", figmaVariableId: "VariableID:24694:65228" },
  { sgdsUtility: "sgds:bg-danger-surface-translucent", cssVar: "--sgds-danger-surface-translucent", figmaToken: "sgds/danger/surface-translucent", figmaVariableId: "VariableID:26540:30569" },

  // ─── Background Colors (Warning) ───────────────────────────────────────────
  { sgdsUtility: "sgds:bg-warning-default", cssVar: "--sgds-warning-bg-default", figmaToken: "sgds/warning/bg-default", figmaVariableId: "VariableID:15953:9730" },
  { sgdsUtility: "sgds:bg-warning-muted", cssVar: "--sgds-warning-bg-muted", figmaToken: "sgds/warning/bg-muted", figmaVariableId: "VariableID:15953:9731" },
  { sgdsUtility: "sgds:bg-warning-surface-default", cssVar: "--sgds-warning-surface-default", figmaToken: "sgds/warning/surface-default", figmaVariableId: "VariableID:24694:65340" },
  { sgdsUtility: "sgds:bg-warning-surface-emphasis", cssVar: "--sgds-warning-surface-emphasis", figmaToken: "sgds/warning/surface-emphasis", figmaVariableId: "VariableID:24694:65341" },
  { sgdsUtility: "sgds:bg-warning-surface-muted", cssVar: "--sgds-warning-surface-muted", figmaToken: "sgds/warning/surface-muted", figmaVariableId: "VariableID:24694:65342" },

  // ─── Background Colors (Purple) ────────────────────────────────────────────
  { sgdsUtility: "sgds:bg-purple-default", cssVar: "--sgds-purple-bg-default", figmaToken: "sgds/purple/bg-default", figmaVariableId: "VariableID:28816:20010" },
  { sgdsUtility: "sgds:bg-purple-muted", cssVar: "--sgds-purple-bg-muted", figmaToken: "sgds/purple/bg-muted", figmaVariableId: "VariableID:28816:20011" },
  { sgdsUtility: "sgds:bg-purple-surface-default", cssVar: "--sgds-purple-surface-default", figmaToken: "sgds/purple/surface-default", figmaVariableId: "VariableID:28816:20012" },
  { sgdsUtility: "sgds:bg-purple-surface-emphasis", cssVar: "--sgds-purple-surface-emphasis", figmaToken: "sgds/purple/surface-emphasis", figmaVariableId: "VariableID:28816:20013" },
  { sgdsUtility: "sgds:bg-purple-surface-muted", cssVar: "--sgds-purple-surface-muted", figmaToken: "sgds/purple/surface-muted", figmaVariableId: "VariableID:28816:20014" },

  // ─── Background Colors (Cyan) ──────────────────────────────────────────────
  { sgdsUtility: "sgds:bg-cyan-default", cssVar: "--sgds-cyan-bg-default", figmaToken: "sgds/cyan/bg-default", figmaVariableId: "VariableID:28816:20022" },
  { sgdsUtility: "sgds:bg-cyan-muted", cssVar: "--sgds-cyan-bg-muted", figmaToken: "sgds/cyan/bg-muted", figmaVariableId: "VariableID:28816:20023" },
  { sgdsUtility: "sgds:bg-cyan-surface-default", cssVar: "--sgds-cyan-surface-default", figmaToken: "sgds/cyan/surface-default", figmaVariableId: "VariableID:28816:20024" },
  { sgdsUtility: "sgds:bg-cyan-surface-emphasis", cssVar: "--sgds-cyan-surface-emphasis", figmaToken: "sgds/cyan/surface-emphasis", figmaVariableId: "VariableID:28816:20025" },
  { sgdsUtility: "sgds:bg-cyan-surface-muted", cssVar: "--sgds-cyan-surface-muted", figmaToken: "sgds/cyan/surface-muted", figmaVariableId: "VariableID:28816:20026" },

  // ─── Background Colors (Neutral) ───────────────────────────────────────────
  { sgdsUtility: "sgds:bg-neutral-default", cssVar: "--sgds-neutral-bg-default", figmaToken: "sgds/neutral/bg-default", figmaVariableId: "VariableID:15786:48802" },
  { sgdsUtility: "sgds:bg-neutral-muted", cssVar: "--sgds-neutral-bg-muted", figmaToken: "sgds/neutral/bg-muted", figmaVariableId: "VariableID:15786:48803" },
  { sgdsUtility: "sgds:bg-neutral-surface-default", cssVar: "--sgds-neutral-surface-default", figmaToken: "sgds/neutral/surface-default", figmaVariableId: "VariableID:24757:67307" },
  { sgdsUtility: "sgds:bg-neutral-surface-emphasis", cssVar: "--sgds-neutral-surface-emphasis", figmaToken: "sgds/neutral/surface-emphasis", figmaVariableId: "VariableID:24757:67308" },
  { sgdsUtility: "sgds:bg-neutral-surface-muted", cssVar: "--sgds-neutral-surface-muted", figmaToken: "sgds/neutral/surface-muted", figmaVariableId: "VariableID:24757:67309" },

  // ─── Background Colors (Form) ──────────────────────────────────────────────
  { sgdsUtility: "sgds:bg-form-surface-default", cssVar: "--sgds-form-surface-default", figmaToken: "sgds/form/surface-default", figmaVariableId: "VariableID:29838:66195" },
  { sgdsUtility: "sgds:bg-form-surface-raised", cssVar: "--sgds-form-surface-raised", figmaToken: "sgds/form/surface-raised", figmaVariableId: "VariableID:29838:66187" },
  { sgdsUtility: "sgds:bg-form-surface-emphasis", cssVar: "--sgds-form-surface-emphasis", figmaToken: "sgds/form/surface-emphasis", figmaVariableId: "VariableID:29838:66188" },
  { sgdsUtility: "sgds:bg-form-surface-subtle", cssVar: "--sgds-form-surface-subtle", figmaToken: "sgds/form/surface-subtle", figmaVariableId: "VariableID:29838:66185" },
  { sgdsUtility: "sgds:bg-form-surface-muted", cssVar: "--sgds-form-surface-muted", figmaToken: "sgds/form/surface-muted", figmaVariableId: "VariableID:29838:66184" },
  { sgdsUtility: "sgds:bg-form-surface-inverse", cssVar: "--sgds-form-surface-inverse", figmaToken: "sgds/form/surface-inverse", figmaVariableId: "VariableID:29838:66183" },
  { sgdsUtility: "sgds:bg-form-surface-fixed-light", cssVar: "--sgds-form-surface-fixed-light", figmaToken: "sgds/form/surface-fixed-light", figmaVariableId: "VariableID:29838:66182" },
  { sgdsUtility: "sgds:bg-form-surface-fixed-dark", cssVar: "--sgds-form-surface-fixed-dark", figmaToken: "sgds/form/surface-fixed-dark", figmaVariableId: "VariableID:29838:66186" },
  { sgdsUtility: "sgds:bg-form-primary-surface-default", cssVar: "--sgds-form-primary-surface-default", figmaToken: "sgds/form/primary/surface-default", figmaVariableId: "VariableID:29838:66205" },
  { sgdsUtility: "sgds:bg-form-primary-surface-emphasis", cssVar: "--sgds-form-primary-surface-emphasis", figmaToken: "sgds/form/primary/surface-emphasis", figmaVariableId: "VariableID:29838:66204" },
  { sgdsUtility: "sgds:bg-form-success-surface-default", cssVar: "--sgds-form-success-surface-default", figmaToken: "sgds/form/success/surface-default", figmaVariableId: "VariableID:29838:66215" },
  { sgdsUtility: "sgds:bg-form-danger-surface-default", cssVar: "--sgds-form-danger-surface-default", figmaToken: "sgds/form/danger/surface-default", figmaVariableId: "VariableID:29838:66228" },

  // ─── Text Colors (Base) ────────────────────────────────────────────────────
  { sgdsUtility: "sgds:text-default", cssVar: "--sgds-color-default", figmaToken: "sgds/color-default", figmaVariableId: "VariableID:15274:2680" },
  { sgdsUtility: "sgds:text-subtle", cssVar: "--sgds-color-subtle", figmaToken: "sgds/color-subtle", figmaVariableId: "VariableID:16129:5695" },
  { sgdsUtility: "sgds:text-muted", cssVar: "--sgds-color-muted", figmaToken: "sgds/color-muted", figmaVariableId: "VariableID:15760:11158" },
  { sgdsUtility: "sgds:text-inverse", cssVar: "--sgds-color-inverse", figmaToken: "sgds/color-inverse", figmaVariableId: "VariableID:15748:4610" },
  { sgdsUtility: "sgds:text-fixed-light", cssVar: "--sgds-color-fixed-light", figmaToken: "sgds/color-fixed-light", figmaVariableId: "VariableID:24691:62708" },
  { sgdsUtility: "sgds:text-fixed-dark", cssVar: "--sgds-color-fixed-dark", figmaToken: "sgds/color-fixed-dark", figmaVariableId: "VariableID:24691:62709" },
  { sgdsUtility: "sgds:text-transparent", cssVar: "--sgds-color-transparent", figmaToken: "sgds/color-transparent", figmaVariableId: "VariableID:15760:15194" },

  // ─── Text Colors (Typography Roles) ────────────────────────────────────────
  { sgdsUtility: "sgds:text-display-default", cssVar: "--sgds-display-color-default", figmaToken: "sgds/display/color-default", figmaVariableId: "VariableID:8105:8607" },
  { sgdsUtility: "sgds:text-display-subtle", cssVar: "--sgds-display-color-subtle", figmaToken: "sgds/display/color-subtle", figmaVariableId: "VariableID:8810:3966" },
  { sgdsUtility: "sgds:text-heading-default", cssVar: "--sgds-heading-color-default", figmaToken: "sgds/heading/color-default", figmaVariableId: "VariableID:15760:46540" },
  { sgdsUtility: "sgds:text-heading-subtle", cssVar: "--sgds-heading-color-subtle", figmaToken: "sgds/heading/color-subtle", figmaVariableId: "VariableID:15760:46541" },
  { sgdsUtility: "sgds:text-body-default", cssVar: "--sgds-body-color-default", figmaToken: "sgds/body/color-default", figmaVariableId: "VariableID:15760:46628" },
  { sgdsUtility: "sgds:text-body-subtle", cssVar: "--sgds-body-color-subtle", figmaToken: "sgds/body/color-subtle", figmaVariableId: "VariableID:15760:46629" },
  { sgdsUtility: "sgds:text-label-default", cssVar: "--sgds-label-color-default", figmaToken: "sgds/label/color-default", figmaVariableId: "VariableID:15760:46655" },
  { sgdsUtility: "sgds:text-label-subtle", cssVar: "--sgds-label-color-subtle", figmaToken: "sgds/label/color-subtle", figmaVariableId: "VariableID:15760:46656" },
  { sgdsUtility: "sgds:text-link-default", cssVar: "--sgds-link-color-default", figmaToken: "sgds/link/color-default", figmaVariableId: "VariableID:15760:41734" },
  { sgdsUtility: "sgds:text-link-emphasis", cssVar: "--sgds-link-color-emphasis", figmaToken: "sgds/link/color-emphasis", figmaVariableId: "VariableID:15760:41735" },

  // ─── Text Colors (Semantic Tones) ──────────────────────────────────────────
  { sgdsUtility: "sgds:text-primary-default", cssVar: "--sgds-primary-color-default", figmaToken: "sgds/primary/color-default", figmaVariableId: "VariableID:15679:27013" },
  { sgdsUtility: "sgds:text-primary-emphasis", cssVar: "--sgds-primary-color-emphasis", figmaToken: "sgds/primary/color-emphasis", figmaVariableId: "VariableID:13049:40293" },
  { sgdsUtility: "sgds:text-primary-fixed-light", cssVar: "--sgds-primary-color-fixed-light", figmaToken: "sgds/primary/color-fixed-light", figmaVariableId: "VariableID:24694:62724" },
  { sgdsUtility: "sgds:text-primary-fixed-dark", cssVar: "--sgds-primary-color-fixed-dark", figmaToken: "sgds/primary/color-fixed-dark", figmaVariableId: "VariableID:24694:62725" },
  { sgdsUtility: "sgds:text-accent-default", cssVar: "--sgds-accent-color-default", figmaToken: "sgds/accent/color-default", figmaVariableId: "VariableID:28816:19997" },
  { sgdsUtility: "sgds:text-accent-emphasis", cssVar: "--sgds-accent-color-emphasis", figmaToken: "sgds/accent/color-emphasis", figmaVariableId: "VariableID:28816:19998" },
  { sgdsUtility: "sgds:text-accent-fixed-light", cssVar: "--sgds-accent-color-fixed-light", figmaToken: "sgds/accent/color-fixed-light", figmaVariableId: "VariableID:28816:19999" },
  { sgdsUtility: "sgds:text-accent-fixed-dark", cssVar: "--sgds-accent-color-fixed-dark", figmaToken: "sgds/accent/color-fixed-dark", figmaVariableId: "VariableID:28816:20000" },
  { sgdsUtility: "sgds:text-success-default", cssVar: "--sgds-success-color-default", figmaToken: "sgds/success/color-default", figmaVariableId: "VariableID:13049:40296" },
  { sgdsUtility: "sgds:text-success-emphasis", cssVar: "--sgds-success-color-emphasis", figmaToken: "sgds/success/color-emphasis", figmaVariableId: "VariableID:15748:8788" },
  { sgdsUtility: "sgds:text-success-fixed-light", cssVar: "--sgds-success-color-fixed-light", figmaToken: "sgds/success/color-fixed-light", figmaVariableId: "VariableID:24694:63665" },
  { sgdsUtility: "sgds:text-success-fixed-dark", cssVar: "--sgds-success-color-fixed-dark", figmaToken: "sgds/success/color-fixed-dark", figmaVariableId: "VariableID:24694:63666" },
  { sgdsUtility: "sgds:text-danger-default", cssVar: "--sgds-danger-color-default", figmaToken: "sgds/danger/color-default", figmaVariableId: "VariableID:13049:40298" },
  { sgdsUtility: "sgds:text-danger-emphasis", cssVar: "--sgds-danger-color-emphasis", figmaToken: "sgds/danger/color-emphasis", figmaVariableId: "VariableID:15760:9110" },
  { sgdsUtility: "sgds:text-danger-fixed-light", cssVar: "--sgds-danger-color-fixed-light", figmaToken: "sgds/danger/color-fixed-light", figmaVariableId: "VariableID:24694:65231" },
  { sgdsUtility: "sgds:text-danger-fixed-dark", cssVar: "--sgds-danger-color-fixed-dark", figmaToken: "sgds/danger/color-fixed-dark", figmaVariableId: "VariableID:24694:65232" },
  { sgdsUtility: "sgds:text-warning-default", cssVar: "--sgds-warning-color-default", figmaToken: "sgds/warning/color-default", figmaVariableId: "VariableID:15953:9733" },
  { sgdsUtility: "sgds:text-warning-emphasis", cssVar: "--sgds-warning-color-emphasis", figmaToken: "sgds/warning/color-emphasis", figmaVariableId: "VariableID:15953:9734" },
  { sgdsUtility: "sgds:text-warning-fixed-light", cssVar: "--sgds-warning-color-fixed-light", figmaToken: "sgds/warning/color-fixed-light", figmaVariableId: "VariableID:24694:65634" },
  { sgdsUtility: "sgds:text-warning-fixed-dark", cssVar: "--sgds-warning-color-fixed-dark", figmaToken: "sgds/warning/color-fixed-dark", figmaVariableId: "VariableID:24694:65635" },
  { sgdsUtility: "sgds:text-purple-default", cssVar: "--sgds-purple-color-default", figmaToken: "sgds/purple/color-default", figmaVariableId: "VariableID:28816:20015" },
  { sgdsUtility: "sgds:text-purple-emphasis", cssVar: "--sgds-purple-color-emphasis", figmaToken: "sgds/purple/color-emphasis", figmaVariableId: "VariableID:28816:20016" },
  { sgdsUtility: "sgds:text-purple-fixed-light", cssVar: "--sgds-purple-color-fixed-light", figmaToken: "sgds/purple/color-fixed-light", figmaVariableId: "VariableID:28816:20017" },
  { sgdsUtility: "sgds:text-purple-fixed-dark", cssVar: "--sgds-purple-color-fixed-dark", figmaToken: "sgds/purple/color-fixed-dark", figmaVariableId: "VariableID:28816:20018" },
  { sgdsUtility: "sgds:text-cyan-default", cssVar: "--sgds-cyan-color-default", figmaToken: "sgds/cyan/color-default", figmaVariableId: "VariableID:28816:20027" },
  { sgdsUtility: "sgds:text-cyan-emphasis", cssVar: "--sgds-cyan-color-emphasis", figmaToken: "sgds/cyan/color-emphasis", figmaVariableId: "VariableID:28816:20028" },
  { sgdsUtility: "sgds:text-cyan-fixed-light", cssVar: "--sgds-cyan-color-fixed-light", figmaToken: "sgds/cyan/color-fixed-light", figmaVariableId: "VariableID:28816:20029" },
  { sgdsUtility: "sgds:text-cyan-fixed-dark", cssVar: "--sgds-cyan-color-fixed-dark", figmaToken: "sgds/cyan/color-fixed-dark", figmaVariableId: "VariableID:28816:20030" },
  { sgdsUtility: "sgds:text-neutral-default", cssVar: "--sgds-neutral-color-default", figmaToken: "sgds/neutral/color-default", figmaVariableId: "VariableID:15786:48805" },
  { sgdsUtility: "sgds:text-neutral-emphasis", cssVar: "--sgds-neutral-color-emphasis", figmaToken: "sgds/neutral/color-emphasis", figmaVariableId: "VariableID:24757:67310" },
  { sgdsUtility: "sgds:text-neutral-fixed-light", cssVar: "--sgds-neutral-color-fixed-light", figmaToken: "sgds/neutral/color-fixed-light", figmaVariableId: "VariableID:24757:67313" },
  { sgdsUtility: "sgds:text-neutral-fixed-dark", cssVar: "--sgds-neutral-color-fixed-dark", figmaToken: "sgds/neutral/color-fixed-dark", figmaVariableId: "VariableID:24757:67314" },

  // ─── Text Colors (Form) ────────────────────────────────────────────────────
  { sgdsUtility: "sgds:text-form-default", cssVar: "--sgds-form-color-default", figmaToken: "sgds/form/color-default", figmaVariableId: "VariableID:29838:66193" },
  { sgdsUtility: "sgds:text-form-subtle", cssVar: "--sgds-form-color-subtle", figmaToken: "sgds/form/color-subtle", figmaVariableId: "VariableID:29838:66194" },
  { sgdsUtility: "sgds:text-form-muted", cssVar: "--sgds-form-color-muted", figmaToken: "sgds/form/color-muted", figmaVariableId: "VariableID:29838:66190" },
  { sgdsUtility: "sgds:text-form-inverse", cssVar: "--sgds-form-color-inverse", figmaToken: "sgds/form/color-inverse", figmaVariableId: "VariableID:29838:66189" },
  { sgdsUtility: "sgds:text-form-fixed-light", cssVar: "--sgds-form-color-fixed-light", figmaToken: "sgds/form/color-fixed-light", figmaVariableId: "VariableID:29838:66191" },
  { sgdsUtility: "sgds:text-form-fixed-dark", cssVar: "--sgds-form-color-fixed-dark", figmaToken: "sgds/form/color-fixed-dark", figmaVariableId: "VariableID:29838:66192" },
  { sgdsUtility: "sgds:text-form-primary-default", cssVar: "--sgds-form-primary-color-default", figmaToken: "sgds/form/primary/color-default", figmaVariableId: "VariableID:29838:66203" },
  { sgdsUtility: "sgds:text-form-success-default", cssVar: "--sgds-form-success-color-default", figmaToken: "sgds/form/success/color-default", figmaVariableId: "VariableID:29838:66214" },
  { sgdsUtility: "sgds:text-form-danger-default", cssVar: "--sgds-form-danger-color-default", figmaToken: "sgds/form/danger/color-default", figmaVariableId: "VariableID:29838:66226" },

  // ─── Border Colors (Base) ──────────────────────────────────────────────────
  { sgdsUtility: "sgds:border-default", cssVar: "--sgds-border-color-default", figmaToken: "sgds/border-color-default", figmaVariableId: "VariableID:15274:2679" },
  { sgdsUtility: "sgds:border-emphasis", cssVar: "--sgds-border-color-emphasis", figmaToken: "sgds/border-color-emphasis", figmaVariableId: "VariableID:16740:4626" },
  { sgdsUtility: "sgds:border-muted", cssVar: "--sgds-border-color-muted", figmaToken: "sgds/border-color-muted", figmaVariableId: "VariableID:15760:11159" },
  { sgdsUtility: "sgds:border-fixed-light", cssVar: "--sgds-border-color-fixed-light", figmaToken: "sgds/border-color-fixed-light", figmaVariableId: "VariableID:24757:54941" },
  { sgdsUtility: "sgds:border-fixed-dark", cssVar: "--sgds-border-color-fixed-dark", figmaToken: "sgds/border-color-fixed-dark", figmaVariableId: "VariableID:24757:54942" },
  { sgdsUtility: "sgds:border-translucent", cssVar: "--sgds-border-color-translucent", figmaToken: "sgds/border-color-translucent", figmaVariableId: "VariableID:18478:6594" },
  { sgdsUtility: "sgds:border-transparent", cssVar: "--sgds-border-color-transparent", figmaToken: "sgds/border-color-transparent", figmaVariableId: "VariableID:15760:15195" },

  // ─── Border Colors (Semantic Tones) ────────────────────────────────────────
  { sgdsUtility: "sgds:border-primary-default", cssVar: "--sgds-primary-border-color-default", figmaToken: "sgds/primary/border-color-default", figmaVariableId: "VariableID:13049:40286" },
  { sgdsUtility: "sgds:border-primary-emphasis", cssVar: "--sgds-primary-border-color-emphasis", figmaToken: "sgds/primary/border-color-emphasis", figmaVariableId: "VariableID:15748:3841" },
  { sgdsUtility: "sgds:border-primary-muted", cssVar: "--sgds-primary-border-color-muted", figmaToken: "sgds/primary/border-color-muted", figmaVariableId: "VariableID:24694:62768" },
  { sgdsUtility: "sgds:border-accent-default", cssVar: "--sgds-accent-border-color-default", figmaToken: "sgds/accent/border-color-default", figmaVariableId: "VariableID:28816:20001" },
  { sgdsUtility: "sgds:border-accent-emphasis", cssVar: "--sgds-accent-border-color-emphasis", figmaToken: "sgds/accent/border-color-emphasis", figmaVariableId: "VariableID:28816:20002" },
  { sgdsUtility: "sgds:border-accent-muted", cssVar: "--sgds-accent-border-color-muted", figmaToken: "sgds/accent/border-color-muted", figmaVariableId: "VariableID:28816:20003" },
  { sgdsUtility: "sgds:border-success-default", cssVar: "--sgds-success-border-color-default", figmaToken: "sgds/success/border-color-default", figmaVariableId: "VariableID:13049:40295" },
  { sgdsUtility: "sgds:border-success-emphasis", cssVar: "--sgds-success-border-color-emphasis", figmaToken: "sgds/success/border-color-emphasis", figmaVariableId: "VariableID:15748:8790" },
  { sgdsUtility: "sgds:border-success-muted", cssVar: "--sgds-success-border-color-muted", figmaToken: "sgds/success/border-color-muted", figmaVariableId: "VariableID:24694:63693" },
  { sgdsUtility: "sgds:border-danger-default", cssVar: "--sgds-danger-border-color-default", figmaToken: "sgds/danger/border-color-default", figmaVariableId: "VariableID:13049:40297" },
  { sgdsUtility: "sgds:border-danger-emphasis", cssVar: "--sgds-danger-border-color-emphasis", figmaToken: "sgds/danger/border-color-emphasis", figmaVariableId: "VariableID:15760:9109" },
  { sgdsUtility: "sgds:border-danger-muted", cssVar: "--sgds-danger-border-color-muted", figmaToken: "sgds/danger/border-color-muted", figmaVariableId: "VariableID:24694:65233" },
  { sgdsUtility: "sgds:border-warning-default", cssVar: "--sgds-warning-border-color-default", figmaToken: "sgds/warning/border-color-default", figmaVariableId: "VariableID:15953:9735" },
  { sgdsUtility: "sgds:border-warning-emphasis", cssVar: "--sgds-warning-border-color-emphasis", figmaToken: "sgds/warning/border-color-emphasis", figmaVariableId: "VariableID:15953:9737" },
  { sgdsUtility: "sgds:border-warning-muted", cssVar: "--sgds-warning-border-color-muted", figmaToken: "sgds/warning/border-color-muted", figmaVariableId: "VariableID:24694:65636" },
  { sgdsUtility: "sgds:border-purple-default", cssVar: "--sgds-purple-border-color-default", figmaToken: "sgds/purple/border-color-default", figmaVariableId: "VariableID:28816:20019" },
  { sgdsUtility: "sgds:border-purple-emphasis", cssVar: "--sgds-purple-border-color-emphasis", figmaToken: "sgds/purple/border-color-emphasis", figmaVariableId: "VariableID:28816:20020" },
  { sgdsUtility: "sgds:border-purple-muted", cssVar: "--sgds-purple-border-color-muted", figmaToken: "sgds/purple/border-color-muted", figmaVariableId: "VariableID:28816:20021" },
  { sgdsUtility: "sgds:border-cyan-default", cssVar: "--sgds-cyan-border-color-default", figmaToken: "sgds/cyan/border-color-default", figmaVariableId: "VariableID:28816:20031" },
  { sgdsUtility: "sgds:border-cyan-emphasis", cssVar: "--sgds-cyan-border-color-emphasis", figmaToken: "sgds/cyan/border-color-emphasis", figmaVariableId: "VariableID:28816:20032" },
  { sgdsUtility: "sgds:border-cyan-muted", cssVar: "--sgds-cyan-border-color-muted", figmaToken: "sgds/cyan/border-color-muted", figmaVariableId: "VariableID:28816:20033" },
  { sgdsUtility: "sgds:border-neutral-default", cssVar: "--sgds-neutral-border-color-default", figmaToken: "sgds/neutral/border-color-default", figmaVariableId: "VariableID:15786:48807" },
  { sgdsUtility: "sgds:border-neutral-emphasis", cssVar: "--sgds-neutral-border-color-emphasis", figmaToken: "sgds/neutral/border-color-emphasis", figmaVariableId: "VariableID:15786:48809" },
  { sgdsUtility: "sgds:border-neutral-muted", cssVar: "--sgds-neutral-border-color-muted", figmaToken: "sgds/neutral/border-color-muted", figmaVariableId: "VariableID:15786:48808" },

  // ─── Border Colors (Form) ──────────────────────────────────────────────────
  { sgdsUtility: "sgds:border-form-success-default", cssVar: "--sgds-form-success-border-color-default", figmaToken: "sgds/form/success/border-color-default", figmaVariableId: "VariableID:29838:66213" },
  { sgdsUtility: "sgds:border-form-danger-default", cssVar: "--sgds-form-danger-border-color-default", figmaToken: "sgds/form/danger/border-color-default", figmaVariableId: "VariableID:29838:66227" },

  // ─── Border Width ───────────────────────────────────────────────────────────
  { sgdsUtility: "sgds:border-0", cssVar: "--sgds-border-width-0", figmaToken: "sgds/border-width/0", figmaVariableId: "VariableID:15627:8430" },
  { sgdsUtility: "sgds:border-1", cssVar: "--sgds-border-width-1", figmaToken: "sgds/border-width/1", figmaVariableId: "VariableID:8983:311" },
  { sgdsUtility: "sgds:border-2", cssVar: "--sgds-border-width-2", figmaToken: "sgds/border-width/2", figmaVariableId: "VariableID:15627:8431" },
  { sgdsUtility: "sgds:border-3", cssVar: "--sgds-border-width-3", figmaToken: "sgds/border-width/3", figmaVariableId: "VariableID:15627:8432" },
  { sgdsUtility: "sgds:border-4", cssVar: "--sgds-border-width-4", figmaToken: "sgds/border-width/4", figmaVariableId: "VariableID:15722:7468" },
  { sgdsUtility: "sgds:border-form-default", cssVar: "--sgds-form-border-width-default", figmaToken: "sgds/form/border-width/default", figmaVariableId: "VariableID:29838:66124" },
  { sgdsUtility: "sgds:border-form-thick", cssVar: "--sgds-form-border-width-thick", figmaToken: "sgds/form/border-width/emphasis", figmaVariableId: "VariableID:29838:66123" },

  // ─── Border Radius ──────────────────────────────────────────────────────────
  { sgdsUtility: "sgds:rounded-none", cssVar: "--sgds-border-radius-none", figmaToken: "sgds/border-radius/none", figmaVariableId: "VariableID:15627:7994" },
  { sgdsUtility: "sgds:rounded-xs", cssVar: "--sgds-border-radius-xs", figmaToken: "sgds/border-radius/xs", figmaVariableId: "VariableID:16029:13382" },
  { sgdsUtility: "sgds:rounded-sm", cssVar: "--sgds-border-radius-sm", figmaToken: "sgds/border-radius/sm", figmaVariableId: "VariableID:8865:8675" },
  { sgdsUtility: "sgds:rounded-md", cssVar: "--sgds-border-radius-md", figmaToken: "sgds/border-radius/md", figmaVariableId: "VariableID:15627:7995" },
  { sgdsUtility: "sgds:rounded-lg", cssVar: "--sgds-border-radius-lg", figmaToken: "sgds/border-radius/lg", figmaVariableId: "VariableID:16671:9962" },
  { sgdsUtility: "sgds:rounded-xl", cssVar: "--sgds-border-radius-xl", figmaToken: "sgds/border-radius/xl", figmaVariableId: "VariableID:15627:7996" },
  { sgdsUtility: "sgds:rounded-2-xl", cssVar: "--sgds-border-radius-2-xl", figmaToken: "sgds/border-radius/2-xl", figmaVariableId: "VariableID:15627:7997" },
  { sgdsUtility: "sgds:rounded-3-xl", cssVar: "--sgds-border-radius-3-xl", figmaToken: "sgds/border-radius/3-xl", figmaVariableId: "VariableID:32358:80366" },
  { sgdsUtility: "sgds:rounded-full", cssVar: "--sgds-border-radius-full", figmaToken: "sgds/border-radius/full", figmaVariableId: "VariableID:15627:7998" },
  // Form border radius (single token in Figma)
  { sgdsUtility: "sgds:rounded-form-none", cssVar: "--sgds-form-border-radius-none", figmaToken: "sgds/form/border-radius", figmaVariableId: "VariableID:29838:66122" },
  { sgdsUtility: "sgds:rounded-form-xs", cssVar: "--sgds-form-border-radius-xs", figmaToken: "sgds/form/border-radius", figmaVariableId: "VariableID:29838:66122" },
  { sgdsUtility: "sgds:rounded-form-sm", cssVar: "--sgds-form-border-radius-sm", figmaToken: "sgds/form/border-radius", figmaVariableId: "VariableID:29838:66122" },
  { sgdsUtility: "sgds:rounded-form-md", cssVar: "--sgds-form-border-radius-md", figmaToken: "sgds/form/border-radius", figmaVariableId: "VariableID:29838:66122" },
  { sgdsUtility: "sgds:rounded-form-full", cssVar: "--sgds-form-border-radius-full", figmaToken: "sgds/form/border-radius", figmaVariableId: "VariableID:29838:66122" },

  // ─── Typography — Font Size ─────────────────────────────────────────────────
  { sgdsUtility: "sgds:text-display-sm", cssVar: "--sgds-font-size-display-sm", figmaToken: "sgds/font-size/display/sm", figmaVariableId: "VariableID:32818:970" },
  { sgdsUtility: "sgds:text-display-md", cssVar: "--sgds-font-size-display-md", figmaToken: "sgds/font-size/display/md", figmaVariableId: "VariableID:32818:969" },
  { sgdsUtility: "sgds:text-display-lg", cssVar: "--sgds-font-size-display-lg", figmaToken: "sgds/font-size/display/lg", figmaVariableId: "VariableID:32818:968" },
  { sgdsUtility: "sgds:text-heading-sm", cssVar: "--sgds-font-size-heading-sm", figmaToken: "sgds/font-size/heading/sm", figmaVariableId: "VariableID:32818:971" },
  { sgdsUtility: "sgds:text-heading-md", cssVar: "--sgds-font-size-heading-md", figmaToken: "sgds/font-size/heading/md", figmaVariableId: "VariableID:32818:972" },
  { sgdsUtility: "sgds:text-heading-lg", cssVar: "--sgds-font-size-heading-lg", figmaToken: "sgds/font-size/heading/lg", figmaVariableId: "VariableID:32818:973" },
  { sgdsUtility: "sgds:text-heading-xl", cssVar: "--sgds-font-size-heading-xl", figmaToken: "sgds/font-size/heading/xl", figmaVariableId: "VariableID:32818:998" },
  { sgdsUtility: "sgds:text-subtitle-sm", cssVar: "--sgds-font-size-subtitle-sm", figmaToken: "sgds/font-size/subtitle/sm", figmaVariableId: "VariableID:32818:1000" },
  { sgdsUtility: "sgds:text-subtitle-md", cssVar: "--sgds-font-size-subtitle-md", figmaToken: "sgds/font-size/subtitle/md", figmaVariableId: "VariableID:32818:999" },
  { sgdsUtility: "sgds:text-body-sm", cssVar: "--sgds-font-size-body-sm", figmaToken: "sgds/font-size/body/sm", figmaVariableId: "VariableID:32818:1001" },
  { sgdsUtility: "sgds:text-body-md", cssVar: "--sgds-font-size-body-md", figmaToken: "sgds/font-size/body/md", figmaVariableId: "VariableID:32818:1002" },
  { sgdsUtility: "sgds:text-body-lg", cssVar: "--sgds-font-size-body-lg", figmaToken: "sgds/font-size/body/lg", figmaVariableId: "VariableID:32818:1003" },
  { sgdsUtility: "sgds:text-label-xs", cssVar: "--sgds-font-size-label-xs", figmaToken: "sgds/font-size/label/xs", figmaVariableId: "VariableID:32818:1004" },
  { sgdsUtility: "sgds:text-label-sm", cssVar: "--sgds-font-size-label-sm", figmaToken: "sgds/font-size/label/sm", figmaVariableId: "VariableID:32818:1005" },
  { sgdsUtility: "sgds:text-label-md", cssVar: "--sgds-font-size-label-md", figmaToken: "sgds/font-size/label/md", figmaVariableId: "VariableID:32818:1006" },
  { sgdsUtility: "sgds:text-label-lg", cssVar: "--sgds-font-size-label-lg", figmaToken: "sgds/font-size/label/lg", figmaVariableId: "VariableID:32818:1007" },
  { sgdsUtility: "sgds:text-caption-md", cssVar: "--sgds-font-size-caption-md", figmaToken: "sgds/font-size/caption/md", figmaVariableId: "VariableID:32818:1008" },
  { sgdsUtility: "sgds:text-overline-md", cssVar: "--sgds-font-size-overline-md", figmaToken: "sgds/font-size/overline/md", figmaVariableId: "VariableID:32818:1009" },
  { sgdsUtility: "sgds:text-link-xs", cssVar: "--sgds-font-size-link-xs", figmaToken: "sgds/font-size/link/xs", figmaVariableId: "VariableID:33070:83625" },
  { sgdsUtility: "sgds:text-link-sm", cssVar: "--sgds-font-size-link-sm", figmaToken: "sgds/font-size/link/sm", figmaVariableId: "VariableID:33070:83623" },
  { sgdsUtility: "sgds:text-link-md", cssVar: "--sgds-font-size-link-md", figmaToken: "sgds/font-size/link/md", figmaVariableId: "VariableID:33070:83622" },
  { sgdsUtility: "sgds:text-link-lg", cssVar: "--sgds-font-size-link-lg", figmaToken: "sgds/font-size/link/lg", figmaVariableId: "VariableID:33070:83624" },

  // ─── Typography — Font Weight ───────────────────────────────────────────────
  { sgdsUtility: "sgds:font-light", cssVar: "--sgds-font-weight-light", figmaToken: "sgds/font-weight/light", figmaVariableId: "VariableID:15627:8434" },
  { sgdsUtility: "sgds:font-regular", cssVar: "--sgds-font-weight-regular", figmaToken: "sgds/font-weight/regular", figmaVariableId: "VariableID:15627:8435" },
  { sgdsUtility: "sgds:font-semibold", cssVar: "--sgds-font-weight-semibold", figmaToken: "sgds/font-weight/semibold", figmaVariableId: "VariableID:15627:8436" },
  { sgdsUtility: "sgds:font-bold", cssVar: "--sgds-font-weight-bold", figmaToken: "sgds/font-weight/bold", figmaVariableId: "VariableID:15627:8437" },

  // ─── Typography — Line Height ───────────────────────────────────────────────
  { sgdsUtility: "sgds:leading-3-xs", cssVar: "--sgds-line-height-3-xs", figmaToken: "sgds/line-height/3-xs", figmaVariableId: "VariableID:32818:1059" },
  { sgdsUtility: "sgds:leading-2-xs", cssVar: "--sgds-line-height-2-xs", figmaToken: "sgds/line-height/2-xs", figmaVariableId: "VariableID:32818:1058" },
  { sgdsUtility: "sgds:leading-xs", cssVar: "--sgds-line-height-xs", figmaToken: "sgds/line-height/xs", figmaVariableId: "VariableID:32818:1057" },
  { sgdsUtility: "sgds:leading-sm", cssVar: "--sgds-line-height-sm", figmaToken: "sgds/line-height/sm", figmaVariableId: "VariableID:32818:1053" },
  { sgdsUtility: "sgds:leading-md", cssVar: "--sgds-line-height-md", figmaToken: "sgds/line-height/md", figmaVariableId: "VariableID:32818:1056" },
  { sgdsUtility: "sgds:leading-lg", cssVar: "--sgds-line-height-lg", figmaToken: "sgds/line-height/lg", figmaVariableId: "VariableID:32818:1055" },
  { sgdsUtility: "sgds:leading-xl", cssVar: "--sgds-line-height-xl", figmaToken: "sgds/line-height/xl", figmaVariableId: "VariableID:32818:1052" },
  { sgdsUtility: "sgds:leading-2-xl", cssVar: "--sgds-line-height-2-xl", figmaToken: "sgds/line-height/2-xl", figmaVariableId: "VariableID:32818:1051" },
  { sgdsUtility: "sgds:leading-3-xl", cssVar: "--sgds-line-height-3-xl", figmaToken: "sgds/line-height/3-xl", figmaVariableId: "VariableID:32818:1054" },

  // ─── Typography — Letter Spacing ────────────────────────────────────────────
  { sgdsUtility: "sgds:tracking-tighter", cssVar: "--sgds-letter-spacing-tighter", figmaToken: "sgds/letter-spacing/tighter", figmaVariableId: "VariableID:15627:8439" },
  { sgdsUtility: "sgds:tracking-tight", cssVar: "--sgds-letter-spacing-tight", figmaToken: "sgds/letter-spacing/tight", figmaVariableId: "VariableID:15627:8442" },
  { sgdsUtility: "sgds:tracking-normal", cssVar: "--sgds-letter-spacing-normal", figmaToken: "sgds/letter-spacing/normal", figmaVariableId: "VariableID:15627:8443" },
  { sgdsUtility: "sgds:tracking-wide", cssVar: "--sgds-letter-spacing-wide", figmaToken: "sgds/letter-spacing/wide", figmaVariableId: "VariableID:15627:8444" },
  { sgdsUtility: "sgds:tracking-wider", cssVar: "--sgds-letter-spacing-wider", figmaToken: "sgds/letter-spacing/wider", figmaVariableId: "VariableID:15722:7469" },

  // ─── Opacity ────────────────────────────────────────────────────────────────
  { sgdsUtility: "sgds:opacity-0", cssVar: "--sgds-opacity-0", figmaToken: "sgds/opacity/0", figmaVariableId: "VariableID:15722:10365" },
  { sgdsUtility: "sgds:opacity-3", cssVar: "--sgds-opacity-3", figmaToken: "sgds/opacity/3", figmaVariableId: "VariableID:29284:18642" },
  { sgdsUtility: "sgds:opacity-5", cssVar: "--sgds-opacity-5", figmaToken: "sgds/opacity/5", figmaVariableId: "VariableID:16471:1966" },
  { sgdsUtility: "sgds:opacity-10", cssVar: "--sgds-opacity-10", figmaToken: "sgds/opacity/10", figmaVariableId: "VariableID:15722:10367" },
  { sgdsUtility: "sgds:opacity-20", cssVar: "--sgds-opacity-20", figmaToken: "sgds/opacity/20", figmaVariableId: "VariableID:15722:10366" },
  { sgdsUtility: "sgds:opacity-30", cssVar: "--sgds-opacity-30", figmaToken: "sgds/opacity/30", figmaVariableId: "VariableID:15722:10368" },
  { sgdsUtility: "sgds:opacity-40", cssVar: "--sgds-opacity-40", figmaToken: "sgds/opacity/40", figmaVariableId: "VariableID:15722:10369" },
  { sgdsUtility: "sgds:opacity-50", cssVar: "--sgds-opacity-50", figmaToken: "sgds/opacity/50", figmaVariableId: "VariableID:8865:9174" },
  { sgdsUtility: "sgds:opacity-60", cssVar: "--sgds-opacity-60", figmaToken: "sgds/opacity/60", figmaVariableId: "VariableID:15722:10370" },
  { sgdsUtility: "sgds:opacity-70", cssVar: "--sgds-opacity-70", figmaToken: "sgds/opacity/70", figmaVariableId: "VariableID:15722:10371" },
  { sgdsUtility: "sgds:opacity-80", cssVar: "--sgds-opacity-80", figmaToken: "sgds/opacity/80", figmaVariableId: "VariableID:15722:10372" },
  { sgdsUtility: "sgds:opacity-90", cssVar: "--sgds-opacity-90", figmaToken: "sgds/opacity/90", figmaVariableId: "VariableID:15722:10373" },
  { sgdsUtility: "sgds:opacity-100", cssVar: "--sgds-opacity-100", figmaToken: "sgds/opacity/100", figmaVariableId: "VariableID:15722:10374" },

  // ─── Container ──────────────────────────────────────────────────────────────
  { sgdsUtility: "sgds:w-container", cssVar: "--sgds-container-width", figmaToken: "sgds/container/width", figmaVariableId: "VariableID:32837:12197" },
  { sgdsUtility: "sgds:max-w-container-md", cssVar: "--sgds-container-max-width-md", figmaToken: "sgds/container/max-width/md", figmaVariableId: "VariableID:30108:24615" },
  { sgdsUtility: "sgds:max-w-container-lg", cssVar: "--sgds-container-max-width-lg", figmaToken: "sgds/container/max-width/lg", figmaVariableId: "VariableID:28535:22042" },
  { sgdsUtility: "sgds:max-w-container-xl", cssVar: "--sgds-container-max-width-xl", figmaToken: "sgds/container/max-width/xl", figmaVariableId: "VariableID:28535:22041" },
  { sgdsUtility: "sgds:max-w-container-2-xl", cssVar: "--sgds-container-max-width-2-xl", figmaToken: "sgds/container/max-width/2-xl", figmaVariableId: "VariableID:28535:22040" },
  { sgdsUtility: "sgds:max-w-container-3-xl", cssVar: "--sgds-container-max-width-3-xl", figmaToken: "sgds/container/max-width/3-xl", figmaVariableId: "VariableID:30011:13828" },
];

// ─── Lookup Helpers ─────────────────────────────────────────────────────────────

/** Map keyed by Figma token name → entry */
export const byFigmaToken = new Map(tokenMap.map(e => [e.figmaToken, e]));

/** Map keyed by Figma VariableID → entry */
export const byFigmaVariableId = new Map(tokenMap.map(e => [e.figmaVariableId, e]));

/** Map keyed by CSS variable → entry */
export const byCssVar = new Map(tokenMap.map(e => [e.cssVar, e]));

/** Map keyed by SGDS utility class → entry */
export const bySgdsUtility = new Map(tokenMap.map(e => [e.sgdsUtility, e]));

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
 * Find mapping entry by SGDS utility class.
 * @param {string} sgdsUtilityClass - e.g. "sgds:bg-primary-default"
 */
export function findBySgdsUtility(sgdsUtilityClass) {
  return bySgdsUtility.get(sgdsUtilityClass) || null;
}
