<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      CheckboxGroup
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-checkbox-group label="CheckboxGroup">
        <sgds-checkbox aria-label="Checkbox" label="Checkbox">
          Checkbox content
        </sgds-checkbox>
      </sgds-checkbox-group>
    </div>
  </div>
</template>
