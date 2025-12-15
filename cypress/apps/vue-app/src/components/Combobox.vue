<script setup lang="ts">
import type { ISgdsComboBoxInputEventDetail } from '@govtechsg/sgds-web-component/components/ComboBox/sgds-combo-box';


const inputHandler = (e: CustomEvent<ISgdsComboBoxInputEventDetail>) => {
  const detail = e.detail
}

</script>
<template>
      <sgds-combo-box placeholder="Single select combo box with default filter" id="default-filter-combobox-example" @sgds-input="inputHandler">
      <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
      <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
      <sgds-combo-box-option value="carrot">Carrot</sgds-combo-box-option>
      <sgds-combo-box-option value="durian">Durian</sgds-combo-box-option>
      <sgds-combo-box-option value="eggplant">Eggplant</sgds-combo-box-option>
    </sgds-combo-box>

    <sgds-combo-box value="1;2;3;4;5;6;7;8" .menuList='[
      { "label": "John Smith", "value": "1" },
      { "label": "Jack Adams", "value": "2" },
      { "label": "Regina Bride", "value": "3" },
      { "label": "Christian Dior", "value": "4" },
      { "label": "Prada Low", "value": "5" },
      { "label": "Chloe Delight", "value": "6" },
      { "label": "Jade Apheremal", "value": "7" },
      { "label": "Louis Vuitton", "value": "8" }
      ]' multiSelect label="label" hintText="multiple" hasFeedback="true" invalidFeedback="test"
    >
    </sgds-combo-box>
</template>
