/**
 * Auto-generates Next.js component wrapper files matching the cypress pattern.
 * Each component gets a 'use client' wrapper that imports from @govtechsg/sgds-web-component/react.
 * Components use proper API: correct slots, required props, and children per the SGDS component docs.
 *
 * Run from root: tsx e2e/utils/generate-next-components.ts
 */
import { writeFileSync, mkdirSync, rmSync, readdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  reactComponentNames, childOnlyComponents, generateJsxTemplate,
} from "./component-templates.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "../apps/next-app/src/app/components");

function main() {
  // Clean stale files from previous runs
  const appDir = resolve(outDir, "..");
  rmSync(outDir, { recursive: true, force: true });
  // Remove old route directories (lowercase dirs with page.tsx)
  if (existsSync(appDir)) {
    for (const entry of readdirSync(appDir, { withFileTypes: true })) {
      if (entry.isDirectory() && entry.name === entry.name.toLowerCase() && existsSync(resolve(appDir, entry.name, "page.tsx"))) {
        rmSync(resolve(appDir, entry.name), { recursive: true, force: true });
      }
    }
  }
  mkdirSync(outDir, { recursive: true });

  const generated: string[] = [];

  for (const name of reactComponentNames) {
    if (childOnlyComponents.has(name)) continue;

    const dirName = name.replace(/^Sgds/, "");
    const tag = "sgds-" + dirName.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
    const result = generateJsxTemplate(tag);

    const importLine = `import { ${result.imports.join(", ")} } from '@govtechsg/sgds-web-component/react/ssr';`;

    const fileContent = `'use client';

${importLine}

export const ${dirName} = () => {
  return (
    <>
${result.jsx}
    </>
  );
};
`;

    writeFileSync(resolve(outDir, `${dirName}.tsx`), fileContent);
    generated.push(dirName);
  }

  // Generate individual route pages: /[component]/page.tsx
  for (const name of generated) {
    const slug = name.toLowerCase();
    const routeDir = resolve(appDir, slug);
    mkdirSync(routeDir, { recursive: true });

    const routeContent = `import { ${name} } from "../components/${name}";

export default function ${name}Page() {
  return (
    <div className="sgds-container-sidebar sgds:py-layout-md">
      <h1 className="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">${name}</h1>
      <div className="sgds:mt-gap-text-md">
        <${name} />
      </div>
    </div>
  );
}
`;
    writeFileSync(resolve(routeDir, "page.tsx"), routeContent);
  }

  // Generate sidebar layout that wraps all routes
  const sidebarItems = generated
    .map(name => `          <SgdsSidebarItem name="${name.toLowerCase()}" title="${name}">
            <Link href="/${name.toLowerCase()}"></Link>
          </SgdsSidebarItem>`)
    .join("\n");

  const sidebarLayoutContent = `'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SgdsSidebar, SgdsSidebarItem, SgdsSidebarSection } from "@govtechsg/sgds-web-component/react/ssr";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname.replace("/", "") || "accordion";

  return (
    <div className="sgds:flex sgds:min-h-screen">
      <SgdsSidebar active={active} variant="persistent" className="sgds:h-screen sgds:sticky sgds:top-0">
        <div slot="upper" className="sgds:text-subtitle-sm sgds:font-semibold">SGDS E2E NextJS</div>
        <SgdsSidebarSection name="components" title="Components">
${sidebarItems}
        </SgdsSidebarSection>
      </SgdsSidebar>
      <div className="sgds:flex sgds:flex-col sgds:w-full">
        {children}
      </div>
    </div>
  );
}
`;
  writeFileSync(resolve(appDir, "sidebar-layout.tsx"), sidebarLayoutContent);

  // Generate root page.tsx (landing — redirects to first component)
  const pageContent = `import { redirect } from "next/navigation";

export default function Home() {
  redirect("/${generated[0].toLowerCase()}");
}
`;
  writeFileSync(resolve(appDir, "page.tsx"), pageContent);

  console.log(`Generated ${generated.length} component wrappers, ${generated.length} route pages, sidebar layout, and page.tsx for Next.js`);
}

try {
  main();
} catch (err) {
  console.error("Fatal error:", err);
  process.exit(1);
}
