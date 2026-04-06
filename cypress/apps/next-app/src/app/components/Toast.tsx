export const Toast = () => {
  return (
    <sgds-toast-container position="bottom-start" suppressHydrationWarning>
      <sgds-toast show dismissible variant="warning" suppressHydrationWarning>
        <sgds-icon slot="icon" name="exclamation-triangle-fill" suppressHydrationWarning></sgds-icon>
        <sgds-link slot="action" href="#" target="_blank" suppressHydrationWarning>Action</sgds-link>
        This is a toast notification
      </sgds-toast>
    </sgds-toast-container>
  );
};
