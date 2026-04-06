export const Radio = () => {
  return (
    <sgds-radio-group suppressHydrationWarning>
      <span slot="label">Select an option</span>
      <sgds-radio suppressHydrationWarning>Option 1</sgds-radio>
      <sgds-radio value="2" suppressHydrationWarning>Option 2</sgds-radio>
      <sgds-radio value="3" suppressHydrationWarning>Option 3</sgds-radio>
    </sgds-radio-group>
  );
};
