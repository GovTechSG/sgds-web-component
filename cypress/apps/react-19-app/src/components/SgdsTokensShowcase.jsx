export const SgdsTokensShowcase = () => {
  return (
    <div className="sgds:p-2-xl sgds:bg-surface-raised sgds:rounded-md">
      {/* Header with text tokens */}
      <div className="sgds:mb-2-xl">
        <h1 className="sgds:text-2 sgds:font-semibold sgds:text-primary-default sgds:mb-xs sgds:leading-48">
          SGDS Tailwind Tokens Showcase
        </h1>
        <p className="sgds:text-0 sgds:text-subtle sgds:leading-24">
          This component demonstrates font sizes, colors, spacing, and other utility tokens
        </p>
      </div>

      {/* Content with gap and padding */}
      <div className="sgds:flex sgds:flex-col sgds:gap-lg">
        {/* Card example with typography tokens */}
        <div className="sgds:bg-default sgds:p-lg sgds:border sgds:border-surface-border sgds:rounded-sm">
          <h2 className="sgds:text-1 sgds:font-semibold sgds:text-heading-default sgds:mb-md sgds:leading-32">
            Card Title
          </h2>
          <p className="sgds:text-body-default sgds:leading-28 sgds:mb-md">
            This paragraph uses body text color with adjusted line height for readability.
          </p>
          <p className="sgds:text-form-subtle sgds:leading-24 sgds:letter-spacing-normal sgds:mb-md">
            Secondary text with subtle form color and normal letter spacing.
          </p>

          {/* Status indicators with semantic colors */}
          <div className="sgds:flex sgds:gap-md sgds:flex-wrap sgds:mb-lg">
            <span className="sgds:px-md sgds:py-sm sgds:bg-success-surface-default sgds:text-success-emphasis sgds:rounded-sm sgds:font-semibold sgds:text-label-default">
              Success
            </span>
            <span className="sgds:px-md sgds:py-sm sgds:bg-warning-surface-default sgds:text-warning-emphasis sgds:rounded-sm sgds:font-semibold sgds:text-label-default">
              Warning
            </span>
            <span className="sgds:px-md sgds:py-sm sgds:bg-danger-surface-default sgds:text-danger-emphasis sgds:rounded-sm sgds:font-semibold sgds:text-label-default">
              Danger
            </span>
            <span className="sgds:px-md sgds:py-sm sgds:bg-primary-surface-default sgds:text-primary-emphasis sgds:rounded-sm sgds:font-semibold sgds:text-label-default">
              Info
            </span>
          </div>
        </div>

        {/* Text hierarchy example */}
        <div className="sgds:space-y-md">
          <div>
            <p className="sgds:text-label-default sgds:font-semibold sgds:text-muted sgds:mb-2-xs sgds:letter-spacing-tight">
              LABEL
            </p>
            <h3 className="sgds:text-display-default sgds:font-semibold sgds:text-heading-default sgds:leading-48">
              Display Heading
            </h3>
          </div>

          <div>
            <p className="sgds:text-label-subtle sgds:font-regular sgds:text-muted sgds:mb-2-xs sgds:letter-spacing-wide">
              DESCRIPTION
            </p>
            <p className="sgds:text-body-default sgds:leading-32 sgds:text-subtle">
              Body text with wide letter spacing for emphasis on secondary content with adequate line height.
            </p>
          </div>
        </div>

        {/* Opacity example */}
        <div className="sgds:flex sgds:gap-md sgds:items-center">
          <div className="sgds:w-16 sgds:h-16 sgds:bg-primary-default sgds:opacity-100 sgds:rounded-sm"></div>
          <div className="sgds:w-16 sgds:h-16 sgds:bg-primary-default sgds:opacity-60 sgds:rounded-sm"></div>
          <div className="sgds:w-16 sgds:h-16 sgds:bg-primary-default sgds:opacity-30 sgds:rounded-sm"></div>
          <div className="sgds:w-16 sgds:h-16 sgds:bg-primary-default sgds:opacity-5 sgds:rounded-sm"></div>
          <p className="sgds:text-muted sgds:text-0 sgds:leading-20">Varying opacity levels</p>
        </div>

        {/* Grid with gap tokens showcase */}
        <div>
          <p className="sgds:text-label-default sgds:font-semibold sgds:text-muted sgds:mb-md sgds:letter-spacing-tight">
            SPACING TOKENS
          </p>
          <div className="sgds:grid sgds:grid-cols-4 sgds:gap-lg">
            <div className="sgds:bg-accent-surface-default sgds:h-20 sgds:rounded-sm sgds:flex sgds:items-center sgds:justify-center sgds:text-accent-emphasis sgds:font-semibold sgds:text-0">
              gap-lg
            </div>
            <div className="sgds:bg-cyan-surface-default sgds:h-20 sgds:rounded-sm sgds:flex sgds:items-center sgds:justify-center sgds:text-cyan-emphasis sgds:font-semibold sgds:text-0">
              gap-lg
            </div>
            <div className="sgds:bg-purple-surface-default sgds:h-20 sgds:rounded-sm sgds:flex sgds:items-center sgds:justify-center sgds:text-purple-emphasis sgds:font-semibold sgds:text-0">
              gap-lg
            </div>
            <div className="sgds:bg-neutral-surface-default sgds:h-20 sgds:rounded-sm sgds:flex sgds:items-center sgds:justify-center sgds:text-neutral-emphasis sgds:font-semibold sgds:text-0">
              gap-lg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
