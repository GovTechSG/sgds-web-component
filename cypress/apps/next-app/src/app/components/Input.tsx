'use client';

export const Input = () => {
  return (
    <sgds-input
      type="text"
      label="Label"
      hintText="This is a hint text"
      name="email"
      placeholder="Placeholder"
      suppressHydrationWarning
    ></sgds-input>
  );
};
