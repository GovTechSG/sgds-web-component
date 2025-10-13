<script lang="ts" setup>
import "@govtechsg/sgds-web-component/components/ComboBox/index.js";

const open = false;
</script>

<template>
    <sgds-combo-box
        label="Fruits" 
        hintText="single select" 
        name="combobox" 
        placeholder="ComboBox" 
        value="1"
        multiselect
        >
            <sgds-combo-box-option value="1">One</sgds-combo-box-option>
            <sgds-combo-box-option value="2">Two</sgds-combo-box-option>
      </sgds-combo-box>
</template>
