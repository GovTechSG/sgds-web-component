<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Stepper/index.js";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Stepper
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-stepper active-step="0" orientation="horizontal">
        <sgds-step step-header="Personal Details">Provide your personal information.</sgds-step>
        <sgds-step step-header="Address">Enter your address and contact details.</sgds-step>
        <sgds-step step-header="Review">Review all details before submitting.</sgds-step>
      </sgds-stepper>
    </div>
  </div>
</template>
