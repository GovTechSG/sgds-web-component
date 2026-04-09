'use client';

export const ProgressBar = () => {
  return (
    <sgds-progress-bar
      label="50%"
      variant="secondary"
      value="50"
      aria-label="Loading in progress"
      suppressHydrationWarning
    ></sgds-progress-bar>
  );
};
