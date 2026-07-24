<script lang="ts" setup>
import "@govtechsg/sgds-web-component/components/Button/index.js";
import { toast } from "@govtechsg/sgds-web-component/components/Toast/index.js";

const variant = "primary";
let count = 0;

const showToast = () => {
  count++;
  toast({
    title: `Top Toast #${count}`,
    message: "This toast slides down from the top.",
    variant: "info",
    position: "top-center",
    delay: 5000
  });
};
</script>

<template>
  <sgds-button :variant @click="showToast">
    <span class="testing">Show Toast</span>
  </sgds-button>
</template>
