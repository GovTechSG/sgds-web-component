'use client';

export const Badge = () => {
  return (
    <>
      <sgds-badge suppressHydrationWarning>primary</sgds-badge>
      <sgds-badge suppressHydrationWarning>
        <i slot="leftIcon" className="bi bi-credit-card-fill"></i>
        leftIcon slot
      </sgds-badge>
      <sgds-badge suppressHydrationWarning>
        <i slot="rightIcon" className="bi bi-credit-card-fill"></i>
        rightIcon slot
      </sgds-badge>
    </>
  );
};
