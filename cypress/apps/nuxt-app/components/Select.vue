<script lang="ts" setup>
import "@govtechsg/sgds-web-component/components/Select/index.js";

const open = false;
</script>

<template>
  <sgds-select value="1" id="select-example" label="Select label" hinttext="Select an option" placeholder="Select an option">
    <sgds-select-option value="1">Afghanistan</sgds-select-option>
    <sgds-select-option value="2">Albania</sgds-select-option>
    <sgds-select-option value="3" disabled="">Algeria</sgds-select-option>
  </sgds-select>
</template>
