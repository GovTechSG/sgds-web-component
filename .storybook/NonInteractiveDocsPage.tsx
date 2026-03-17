import { Description, Stories, Subtitle, Title } from "@storybook/blocks";
import React from "react";

/**
 * Docs page for non-interactive stories (foundation, grid, form-validation, etc.).
 * Omits the Primary story block to avoid duplicating the first story on the docs page.
 *
 * Usage in a stories file:
 *   import NonInteractiveDocsPage from "../../../.storybook/NonInteractiveDocsPage";
 *
 *   export default {
 *     title: "Foundation/Typography/Headings",
 *     parameters: {
 *       docs: { page: NonInteractiveDocsPage },
 *     },
 *   };
 */
const NonInteractiveDocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Stories />
  </>
);

export default NonInteractiveDocsPage;
