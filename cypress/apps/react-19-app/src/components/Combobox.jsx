
export const Combobox = () => {
  const inputHandler = (e) => {
   console.log(e.detail)
  }
    return (
      <sgds-combo-box onsgds-input={inputHandler} placeholder="Single select combo box with default filter">
      <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
      <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
      <sgds-combo-box-option value="carrot">Carrot</sgds-combo-box-option>
      <sgds-combo-box-option value="durian">Durian</sgds-combo-box-option>
      <sgds-combo-box-option value="eggplant">Eggplant</sgds-combo-box-option>
    </sgds-combo-box>
    )
}