<script lang="ts" setup>
import "@govtechsg/sgds-web-component/components/Button/index.js"

const variant = 'primary';
</script>

<template>
  <sgds-button :variant hasRightIconSlot>
    <span class="testing">Hello</span>
    <sgds-icon slot="rightIcon" name="arrow-bar-up"></sgds-icon>
  </sgds-button>
</template>
