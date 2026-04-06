declare module "@webcomponents/scoped-custom-element-registry";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      [key: `sgds-${string}`]: { [key: string]: any };
    }
  }
}
