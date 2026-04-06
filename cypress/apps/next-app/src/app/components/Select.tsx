'use client';

export const Select = () => {
  return (
    <div>
      <sgds-select label="Fruits" hintText="single select" name="select" placeholder="Select a fruit" value="1" suppressHydrationWarning>
        <sgds-select-option value="1" suppressHydrationWarning>One</sgds-select-option>
        <sgds-select-option value="2" suppressHydrationWarning>Two</sgds-select-option>
        <sgds-select-option value="3" suppressHydrationWarning>Three</sgds-select-option>
      </sgds-select>
    </div>
  );
};
