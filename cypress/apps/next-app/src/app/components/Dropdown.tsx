'use client';

export const Dropdown = () => {
  return (
    <div>
      <sgds-dropdown drop="down" menuVariant="default" suppressHydrationWarning>
        <sgds-button slot="toggler" suppressHydrationWarning>Dropdown</sgds-button>
        <sgds-dropdown-item suppressHydrationWarning>item #1 (argsTable controlled)</sgds-dropdown-item>
        <sgds-dropdown-item suppressHydrationWarning>item #2</sgds-dropdown-item>
        <sgds-dropdown-item disabled suppressHydrationWarning>item #3</sgds-dropdown-item>
      </sgds-dropdown>
    </div>
  );
};
