/**
 * Auto-generates React (Vite) component wrappers, per-component route pages,
 * a sidebar layout, and App.jsx with react-router-dom routing.
 *
 * Run from root: tsx e2e/utils/generate-react-components.ts
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  reactComponentNames, loadArgs, childOnlyComponents,
  jsxTemplates, simpleJsxTemplate, type JsxTemplateResult,
} from "./component-templates.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, "../apps/react-app/src");

async function main() {
  const componentsDir = resolve(srcDir, "components");
  const pagesDir = resolve(srcDir, "pages");
  mkdirSync(componentsDir, { recursive: true });
  mkdirSync(pagesDir, { recursive: true });

  const generated: string[] = [];

  // Generate component wrappers
  for (const name of reactComponentNames) {
    if (childOnlyComponents.has(name)) continue;

    const dirName = name.replace(/^Sgds/, "");
    const args = await loadArgs(dirName);

    const templateFn = jsxTemplates[dirName];
    const result: JsxTemplateResult = templateFn ? templateFn(args) : simpleJsxTemplate(name, args);

    const importLine = `import { ${[...new Set(result.imports)].join(", ")} } from '@govtechsg/sgds-web-component/react';`;

    const fileContent = `${importLine}

export const ${dirName} = () => {
  return (
    <>
${result.jsx}
    </>
  );
};
`;
    writeFileSync(resolve(componentsDir, `${dirName}.jsx`), fileContent);
    generated.push(dirName);
  }

  // Generate per-component route pages
  for (const name of generated) {
    const pageContent = `import { ${name} } from "../components/${name}";

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
    writeFileSync(resolve(pagesDir, `${name.toLowerCase()}.jsx`), pageContent);
  }

  // Generate sidebar layout
  const sidebarItems = generated
    .map(name => `          <SgdsSidebarItem name="${name.toLowerCase()}" title="${name}">
            <Link to="/${name.toLowerCase()}"></Link>
          </SgdsSidebarItem>`)
    .join("\n");

  const sidebarLayoutContent = `import { Outlet, useLocation, Link } from "react-router-dom";
import { SgdsSidebar, SgdsSidebarItem, SgdsSidebarSection } from "@govtechsg/sgds-web-component/react";

export default function SidebarLayout() {
  const location = useLocation();
  const active = location.pathname.replace("/", "") || "accordion";

  return (
    <div className="sgds:flex sgds:min-h-screen">
      <SgdsSidebar active={active} variant="persistent" className="sgds:h-screen sgds:sticky sgds:top-0">
        <div slot="upper" className="sgds:text-subtitle-sm sgds:font-semibold">SGDS E2E React</div>
        <SgdsSidebarSection name="components" title="Components">
${sidebarItems}
        </SgdsSidebarSection>
      </SgdsSidebar>
      <div className="sgds:flex sgds:flex-col sgds:w-full">
        <Outlet />
      </div>
    </div>
  );
}
`;
  writeFileSync(resolve(srcDir, "SidebarLayout.jsx"), sidebarLayoutContent);

  // Generate App.jsx with BrowserRouter
  const routeImports = generated
    .map(name => `import ${name}Page from "./pages/${name.toLowerCase()}";`)
    .join("\n");

  const routeElements = generated
    .map(name => `          <Route path="/${name.toLowerCase()}" element={<${name}Page />} />`)
    .join("\n");

  const appContent = `import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component";
import "./index.css";
import SidebarLayout from "./SidebarLayout";
${routeImports}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SidebarLayout />}>
          <Route index element={<Navigate to="/${generated[0].toLowerCase()}" replace />} />
${routeElements}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
`;
  writeFileSync(resolve(srcDir, "App.jsx"), appContent);

  console.log(`Generated ${generated.length} component wrappers, ${generated.length} route pages, sidebar layout, and App.jsx for React`);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
