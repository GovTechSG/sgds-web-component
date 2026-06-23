import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "sgds",
  taskQueue: "async",
  outputTargets: [
    {
      type: "dist-custom-elements",
      customElementsExportBehavior: "auto-define-custom-elements",
      generateTypeDeclarations: true,
      isPrimaryPackageOutputTarget: true
    },
    {
      type: "dist-hydrate-script",
      dir: "hydrate"
    },
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "www",
      serviceWorker: null
    }
  ],
  hydratedFlag: {
    selector: "attribute",
    name: "hydrated"
  }
};
