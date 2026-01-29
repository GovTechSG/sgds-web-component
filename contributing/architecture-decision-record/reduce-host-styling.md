# Reduce Host Styling

## Status

Accepted

## Context

Web components apply styling to the `:host` pseudo-element to define default appearance and layout behavior. However, excessive `:host` styling can limit the flexibility of consuming applications and products who wish to customize component appearance. Since `:host` styles can easily be overridden by application-level CSS, we should minimize unnecessary `:host` styling to promote better composability and make customization easier for consumers.

### Example

The `sgds-table` component had `:host` padding and margin styles defined. When a consuming application applied a global CSS reset rule (`* { margin: 0; padding: 0; }`), the component's intended spacing was lost due to CSS cascade conflicts. The application had to override or work around the component's `:host` styles, creating unnecessary complexity. By keeping `:host` styles minimal, the component would have worked seamlessly with the application's reset styles without conflicts.

## Decision

In future development, we will reduce the amount of styling applied directly to the `:host` pseudo-element in new components. Only essential styling necessary for core functionality and accessibility should be included. Application-specific styling, layout, spacing, and visual customizations should be delegated to the consuming application, which can easily override `:host` styles with their own CSS.

This approach includes:
- Keeping `:host` styles minimal and functional (e.g., display properties, essential layout)
- Removing decorative or layout-specific `:host` styles (margins, padding, sizing preferences)
- Documenting which `:host` styles are essential and which can be customized
- Using CSS custom properties and CSS parts to provide customization hooks for consumers

## Consequences

**Positive:**
- Consuming applications have greater flexibility to customize component appearance without fighting against component styles
- Components integrate more seamlessly into different design systems and products
- Reduced CSS specificity conflicts
- Easier for applications to adapt components to their brand guidelines

**Negative:**
- Applications may need to apply more styling themselves if they want specific appearance
- Less out-of-box styling could require applications to define more custom CSS
- Components may appear less polished in isolation if viewed without application-level styling

## Components Affected

Future components and components requiring updates:
- Sidebar (in development)
- Other new components going forward

## Date of proposal 

29/01/2026
