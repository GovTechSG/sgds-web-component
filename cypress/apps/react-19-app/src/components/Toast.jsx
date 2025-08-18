

export const Toast = () => {
    return (
            <sgds-toast-container>
        <sgds-toast show="">
          <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
          This is a toast notifications
          <sgds-link slot="action"><a href="#" target="_blank">Action</a></sgds-link>
        </sgds-toast>
      </sgds-toast-container>
    )
}
