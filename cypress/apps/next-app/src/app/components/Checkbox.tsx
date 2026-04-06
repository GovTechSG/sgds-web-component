export const Checkbox = () => {
  return (
    <sgds-checkbox-group label="Select Your Preferences" hintText="Please choose one or more options:" suppressHydrationWarning>
      <sgds-checkbox value="option1" suppressHydrationWarning>Option 1</sgds-checkbox>
      <sgds-checkbox indeterminate value="option2" suppressHydrationWarning>Option 2 indeterminate</sgds-checkbox>
      <sgds-checkbox disabled value="option3" suppressHydrationWarning>Option 3</sgds-checkbox>
    </sgds-checkbox-group>
  );
};
