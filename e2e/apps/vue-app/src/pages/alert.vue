<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Alert
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-alert show variant="info">
        <sgds-icon slot="icon" name="placeholder" size="md"></sgds-icon>
        Alert
      </sgds-alert>
    </div>
  </div>
</template>
