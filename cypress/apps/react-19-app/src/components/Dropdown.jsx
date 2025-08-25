
export const Dropdown = () => {
    return (
      <sgds-dropdown variant="secondary">
      <sgds-button slot="toggler" role="button">
        Dropdown
        <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
      </sgds-button>
      <sgds-dropdown-item>
        <a href="#">item #1 (argsTable controlled) </a>
      </sgds-dropdown-item>
      <sgds-dropdown-item><a href="https://google.com">item #2</a></sgds-dropdown-item>
      <sgds-dropdown-item disabled="">item #3</sgds-dropdown-item>
      <sgds-dropdown-item>item #4</sgds-dropdown-item>
      <sgds-dropdown-item>item #5</sgds-dropdown-item>
      <sgds-dropdown-item>item #6</sgds-dropdown-item>
      <sgds-dropdown-item>item #7</sgds-dropdown-item>
      <sgds-dropdown-item>item #8</sgds-dropdown-item>
      <sgds-dropdown-item>item #9</sgds-dropdown-item>
      <sgds-dropdown-item>item #10</sgds-dropdown-item>
      <sgds-dropdown-item>item #11</sgds-dropdown-item>
    </sgds-dropdown>
    )
}