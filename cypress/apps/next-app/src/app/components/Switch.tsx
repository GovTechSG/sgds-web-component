'use client';

export const Switch = () => {
  return (
    <>
      <sgds-switch suppressHydrationWarning>Switch</sgds-switch>
      <sgds-switch icon suppressHydrationWarning>Switch with icon</sgds-switch>
      <sgds-switch icon size="sm" suppressHydrationWarning>Switch with icon</sgds-switch>
      <sgds-switch icon size="lg" suppressHydrationWarning>Switch with icon</sgds-switch>
      <sgds-switch disabled suppressHydrationWarning>Switch</sgds-switch>
      <sgds-switch size="sm" suppressHydrationWarning>Switch</sgds-switch>
      <sgds-switch size="lg" suppressHydrationWarning>Switch</sgds-switch>
      <sgds-switch size="lg" suppressHydrationWarning>
        <span slot="leftLabel">Switch</span>
      </sgds-switch>
    </>
  );
};
