import type { Browser } from "playwright";
import type oobeeA11yInit from "@govtechsg/oobee";
import { VITE_BASE_URL } from "./config.js";

declare const runA11yScan: (elementsToScan?: string[]) => Promise<any>;

export interface RuleViolation {
  rule: string;
  description: string;
  impact: string;
  count: number;
  helpUrl: string;
  nodes: ViolationNode[];
}

export interface ScanPageResult {
  page: string;
  mustFix: number;
  goodToFix: number;
  passed: number;
  mustFixRules: RuleViolation[];
  goodToFixRules: RuleViolation[];
  error?: string;
}

export interface ViolationNode {
  target: string;
  html: string;
  failureSummary: string;
}

// axe-core impact levels mapped to Oobee categories
const MUST_FIX_IMPACTS = new Set(["critical", "serious"]);

export async function scanPage(
  browser: Browser,
  pagePath: string,
  oobeeA11y: Awaited<ReturnType<typeof oobeeA11yInit>>
): Promise<ScanPageResult> {
  const context = await browser.newContext();
  const page = await context.newPage();
  const url = `${VITE_BASE_URL}/${pagePath}`;

  try {
    await page.goto(url, { waitUntil: "networkidle" });

    // Wait for custom elements to be defined (best-effort, some pages may have external deps)
    await page
      .waitForFunction(
        () => {
          const undefinedEls = document.querySelectorAll(":not(:defined)");
          return undefinedEls.length === 0;
        },
        { timeout: 10000 }
      )
      .catch(() => {
        // Continue scanning even if some elements don't resolve
      });

    // Wait for all sgds-* Lit components to finish their render cycle (shadow DOM, slots, reactive updates)
    await page
      .waitForFunction(
        async () => {
          const allEls = document.querySelectorAll("*");
          const promises: Promise<unknown>[] = [];
          for (const el of allEls) {
            if (el.tagName.toLowerCase().startsWith("sgds-") && "updateComplete" in el) {
              promises.push((el as any).updateComplete);
            }
          }
          await Promise.all(promises);
          return true;
        },
        { timeout: 15000 }
      )
      .catch(() => {
        // Continue scanning even if some components don't resolve
      });

    // Inject axe-core and Oobee scan functions
    await page.evaluate(oobeeA11y.getAxeScript());
    await page.evaluate(oobeeA11y.getOobeeFunctions());

    // Discover all sgds-* element selectors on the page
    const sgdsSelectors = await page.evaluate(() => {
      const allEls = document.querySelectorAll("*");
      const tags = new Set<string>();
      for (const el of allEls) {
        const tag = el.tagName.toLowerCase();
        if (tag.startsWith("sgds-")) {
          tags.add(tag);
        }
      }
      return [...tags];
    });

    // Run the accessibility scan scoped to sgds-* elements only
    const scanRes = await page.evaluate(async elements => await runA11yScan(elements), sgdsSelectors);

    // Push results to Oobee aggregator (pass page for screenshot reuse)
    await oobeeA11y.pushScanResults(scanRes, undefined, undefined, page);

    // Extract per-page results from axe-core violations
    const axeResults = scanRes.axeScanResults;
    const violations = axeResults?.violations ?? [];
    const passes = axeResults?.passes ?? [];

    const mustFixRules: RuleViolation[] = [];
    const goodToFixRules: RuleViolation[] = [];

    for (const v of violations) {
      const nodes: ViolationNode[] = (v.nodes ?? []).map((n: any) => ({
        target: Array.isArray(n.target) ? n.target.join(" > ") : String(n.target ?? ""),
        html: n.html ?? "",
        failureSummary: n.failureSummary ?? ""
      }));
      const rule: RuleViolation = {
        rule: v.id,
        description: v.description ?? v.help ?? "",
        impact: v.impact ?? "unknown",
        count: v.nodes?.length ?? 1,
        helpUrl: v.helpUrl ?? "",
        nodes
      };
      if (MUST_FIX_IMPACTS.has(v.impact)) {
        mustFixRules.push(rule);
      } else {
        goodToFixRules.push(rule);
      }
    }

    const mustFixCount = mustFixRules.reduce((sum, r) => sum + r.count, 0);
    const goodToFixCount = goodToFixRules.reduce((sum, r) => sum + r.count, 0);

    return {
      page: pagePath,
      mustFix: mustFixCount,
      goodToFix: goodToFixCount,
      passed: passes.length,
      mustFixRules,
      goodToFixRules
    };
  } finally {
    await context.close();
  }
}
