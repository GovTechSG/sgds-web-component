<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      ComboBox
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-combo-box label="Select a country" placeholder="Search...">
        <sgds-combo-box-option value="sg">Singapore</sgds-combo-box-option>
        <sgds-combo-box-option value="my">Malaysia</sgds-combo-box-option>
        <sgds-combo-box-option value="id">Indonesia</sgds-combo-box-option>
      </sgds-combo-box>
    </div>
  </div>
</template>
