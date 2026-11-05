<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      RadioGroup
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-radio-group name="gender" label="Gender">
        <sgds-radio value="male">Male</sgds-radio>
        <sgds-radio value="female">Female</sgds-radio>
      </sgds-radio-group>
    </div>
  </div>
</template>
