declare module "@webcomponents/scoped-custom-element-registry";

import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "sgds-thumbnail-card": any;
    }
  }
}
