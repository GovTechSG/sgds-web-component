<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Mainnav/index.js";

defineOptions({ inheritAttrs: false });
</script>

<template>
  <sgds-mainnav v-bind="$attrs">
    <div slot="brand">
      <slot name="brand" />
    </div>
    <slot />
    <div slot="end">
      <slot name="end" />
    </div>
    <div slot="profile">
      <slot name="profile" />
    </div>
    <div slot="non-collapsible">
      <slot name="non-collapsible" />
    </div>
  </sgds-mainnav>
</template>
