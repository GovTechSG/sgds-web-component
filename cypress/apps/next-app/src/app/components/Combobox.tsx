'use client';

export const Combobox = () => {
  return (
    <div>
      <sgds-combo-box label="Fruits" hintText="single select" name="combobox-single" placeholder="Select a fruit" suppressHydrationWarning>
        <sgds-combo-box-option value="apple" suppressHydrationWarning>Apple</sgds-combo-box-option>
        <sgds-combo-box-option value="orange" suppressHydrationWarning>Orange</sgds-combo-box-option>
        <sgds-combo-box-option value="pear" suppressHydrationWarning>Pear</sgds-combo-box-option>
      </sgds-combo-box>
      <sgds-combo-box label="Fruits" hintText="multi select" name="combobox-multi" placeholder="Select fruits" multiselect suppressHydrationWarning>
        <sgds-combo-box-option value="apple" suppressHydrationWarning>Apple</sgds-combo-box-option>
        <sgds-combo-box-option value="orange" suppressHydrationWarning>Orange</sgds-combo-box-option>
        <sgds-combo-box-option value="pear" suppressHydrationWarning>Pear</sgds-combo-box-option>
      </sgds-combo-box>
    </div>
  );
};
