<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/IconButton/index.js";

defineOptions({ inheritAttrs: false });
</script>

<template>
  <sgds-icon-button v-bind="$attrs">
    <slot />
  </sgds-icon-button>
</template>
